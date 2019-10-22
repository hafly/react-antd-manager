import React from 'react';
import {Card, Form, Button, Input, Select, Tree, Transfer, Modal} from 'antd';
import BaseTable from '../../components/BaseTable';
import axios from '../../utils/axios';
import utils from '../../utils/utils';
import menuConfig from '../../config/menuConfig';

const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;

export default class Permission extends React.Component {
    state = {
        dataSource: [],
        menuInfo: [],
        userList: [],
        targetKeys: [],
        isVisibleRoleAdd: false,
        isVisibleRoleEdit: false,
        isVisibleUserAuth: false,
    }

    params = {}
    selectedRow = undefined

    columns = [
        {
            title: '角色ID',
            dataIndex: 'id'
        },
        {
            title: '角色名称',
            dataIndex: 'role_name'
        },
        {
            title: '创建时间',
            dataIndex: 'create_time'
        },
        {
            title: '使用状态',
            dataIndex: 'status',
            render: function (value) {
                return value === 0 ? '停用' : '启用'
            }
        },
        {
            title: '授权时间',
            dataIndex: 'authorize_time'
        },
        {
            title: '授权人',
            dataIndex: 'authorize_user_name'
        }
    ]

    componentDidMount() {
        this.requestList();
    }

    requestList() {
        let self = this;
        axios.ajax({
            url: '/role/list',
            data: this.params
        }).then((res) => {
            let data = res.data;
            data.rows.map((item, index) => {
                return item.key = index;
            });
            self.setState({
                dataSource: data.rows,
                pagination: utils.pagination(data, (current) => {
                    self.params.page = current;
                    self.requestList();
                })
            })
        });
    }

    onRadioSelect = (selectedRow) => {
        this.selectedRow = selectedRow;
    }

    // 新建角色
    handleRoleAdd = () => {
        this.setState({
            isVisibleRoleAdd: true
        })
    }

    handleRoleAddSubmit = () => {
        this.roleAddForm.props.form.validateFields((err, fieldsValue) => {
            if (!err) {
                axios.ajax({
                    url: '/user/add',
                    data: fieldsValue
                }).then(() => {
                    this.setState({
                        isVisibleRoleAdd: false
                    });
                    this.roleAddForm.props.form.resetFields();
                    this.requestList();
                })
            }
        });
    }

    // 角色权限设置
    handleRoleEdit = () => {
        let item = this.selectedRow;
        if (!item) {
            Modal.warn({
                title: '信息',
                content: '请选择一个角色'
            });
            return
        }
        this.setState({
            menuInfo: item.menus,
            isVisibleRoleEdit: true
        })
    }

    // 修改角色权限提交
    handleRoleEditSubmit = () => {
        let data = this.permForm.props.form.getFieldsValue();
        data.role_id = this.selectedRow.id;
        data.menus = this.state.menuInfo;
        axios.ajax({
            url: '/permission/edit',
            data: data
        }).then((res) => {
            this.setState({
                isVisibleRoleEdit: false
            });
            this.requestList();
        });
    }

    // 用户授权
    hanldeUserAuth = () => {
        let item = this.selectedRow;
        if (!item) {
            Modal.warn({
                title: '信息',
                content: '请选择一个角色'
            });
            return
        }
        this.setState({
            detailInfo: item,
            isVisibleUserAuth: true
        })
        this.getRoleUserList(item.id);
    }

    getRoleUserList(id) {
        axios.ajax({
            url: '/role/user_list',
            data: {id: id}
        }).then((res) => {
            let dataSource = res.data.rows;
            const userList = [];
            const targetKeys = [];
            if (dataSource && dataSource.length > 0) {
                for (let i = 0; i < dataSource.length; i++) {
                    const data = {
                        key: dataSource[i].user_id,
                        name: dataSource[i].user_name,
                        status: dataSource[i].status
                    }
                    if (data.status === 1) {
                        targetKeys.push(data.key);
                    }
                    userList.push(data);
                }

                this.setState({
                    userList,
                    targetKeys
                })
            }
        })
    }

    // 用户授权提交
    handleUserAuthSubmit = () => {
        let data = {}
        data.user_ids = this.state.targetKeys;
        data.role_id = this.selectedRow.id;
        axios.ajax({
            url: '/role/user_role_edit',
            data: data
        }).then(() => {
            this.setState({
                isVisibleUserAuth: false
            });
            this.requestList();
        })
    }

    render() {
        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.handleRoleAdd}>创建角色</Button>
                    <Button type="primary" onClick={this.handleRoleEdit} style={{marginLeft: 10, marginRight: 10}}>设置权限</Button>
                    <Button type="primary" onClick={this.hanldeUserAuth}>用户授权</Button>
                </Card>
                <div className="content-wrap" style={{borderTop: 0}}>
                    <BaseTable
                        type="radio"
                        columns={this.columns}
                        dataSource={this.state.dataSource}
                        onSelect={this.onRadioSelect}
                        pagination={this.state.pagination}
                    />
                </div>

                <Modal
                    title="创建角色"
                    visible={this.state.isVisibleRoleAdd}
                    onOk={this.handleRoleAddSubmit}
                    onCancel={() => {
                        this.roleAddForm.props.form.resetFields();
                        this.setState({
                            isVisibleRoleAdd: false
                        })
                    }}
                >
                    <RoleAddForm wrappedComponentRef={(inst) => this.roleAddForm = inst}></RoleAddForm>
                </Modal>
                <Modal title="设置角色权限"
                       visible={this.state.isVisibleRoleEdit}
                       width={600}
                       onOk={this.handleRoleEditSubmit}
                       onCancel={() => {
                           this.setState({isVisibleRoleEdit: false})
                       }}>
                    <RoleEditForm
                        wrappedComponentRef={(inst) => this.permForm = inst}
                        detailInfo={this.selectedRow}
                        menuInfo={this.state.menuInfo}
                        patchMenuInfo={(checkedKeys) => {
                            this.setState({
                                menuInfo: checkedKeys
                            })
                        }}

                    />
                </Modal>
                <Modal
                    title="用户授权"
                    visible={this.state.isVisibleUserAuth}
                    width={740}
                    onOk={this.handleUserAuthSubmit}
                    onCancel={() => {
                        this.setState({
                            isVisibleUserAuth: false
                        })
                    }}
                >
                    <UserAuthForm
                        detailInfo={this.state.detailInfo}
                        targetKeys={this.state.targetKeys}
                        dataSource={this.state.userList}
                        patchUserInfo={(targetKeys) => {
                            this.setState({
                                targetKeys
                            })
                        }}
                    />
                </Modal>
            </div>
        )
    }
}

class RoleAddForm extends React.Component {

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 19}
        }
        return (
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    {
                        getFieldDecorator('role_name', {
                            initialValue: '',
                            rules: [
                                {required: true, message: '角色名称不能为空!'}
                            ]
                        })(
                            <Input type="text" placeholder="请输入角色名称"/>
                        )
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        getFieldDecorator('state', {
                            initialValue: 1
                        })(
                            <Select>
                                <Option value={1}>开启</Option>
                                <Option value={0}>关闭</Option>
                            </Select>
                        )
                    }
                </FormItem>
            </Form>
        );
    }
}

RoleAddForm = Form.create({})(RoleAddForm);

class RoleEditForm extends React.Component {
    renderTreeNode(data) {
        return data.map((item) => {
            if (item.children) {
                return <TreeNode title={item.title} key={item.url}>
                    {this.renderTreeNode(item.children)}
                </TreeNode>
            }
            else {
                return <TreeNode title={item.title} key={item.url}/>
            }
        })
    }

    handleOnCheck = (checkedKeys) => {
        this.props.patchMenuInfo(checkedKeys);
    }

    render() {
        let detailInfo = this.props.detailInfo;
        let menuInfo = this.props.menuInfo;

        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 19}
        }

        return (
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    <Input placeholder={detailInfo.role_name} disabled/>
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        getFieldDecorator('status', {
                            initialValue: detailInfo.status
                        })(
                            <Select>
                                <Option value={1}>启用</Option>
                                <Option value={0}>停用</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <Tree
                    checkable
                    defaultExpandAll
                    onCheck={this.handleOnCheck}
                    checkedKeys={menuInfo}>
                    <TreeNode title="平台权限" key="platform_all">
                        {this.renderTreeNode(menuConfig)}
                    </TreeNode>
                </Tree>
            </Form>
        )
    }
}

RoleEditForm = Form.create()(RoleEditForm);

class UserAuthForm extends React.Component {
    handleChange = (targetKeys) => {
        this.props.patchUserInfo(targetKeys);
    };

    filterOption = (inputValue, option) => {
        return option.name.indexOf(inputValue) > -1;
    };

    render() {
        let detailInfo = this.props.detailInfo;

        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 19}
        }

        return (
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    <Input placeholder={detailInfo.role_name} disabled/>
                </FormItem>
                <FormItem label="选择用户" {...formItemLayout}>
                    <Transfer
                        listStyle={{width: 250, height: 400}}
                        dataSource={this.props.dataSource}
                        titles={['待选用户', '已选用户']}
                        showSearch
                        locale={{searchPlaceholder: '输入用户名'}}
                        filterOption={this.filterOption}
                        targetKeys={this.props.targetKeys}
                        render={item => item.name}
                        onChange={this.handleChange}
                    />
                </FormItem>
            </Form>
        )
    }
}

UserAuthForm = Form.create()(UserAuthForm);