import React from 'react';
import {Card, Form, Button, Input, Select, Tree, Modal} from 'antd';
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
        isVisibleModal: false
    }

    params = {}
    selectedRow = undefined

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

    onRadioSelect = (selectedRow) => {
        this.selectedRow = selectedRow;
    }

    // 权限设置
    handlePermission = () => {
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
            isVisibleModal: true
        })
    }

    // 修改权限提交
    handleEditSubmit = () => {
        let data = this.permForm.props.form.getFieldsValue();
        data.role_id = this.selectedRow.id;
        data.menus = this.state.menuInfo;
        axios.ajax({
            url: '/permission/edit',
            data: data
        }).then((res) => {
            this.setState({
                isVisibleModal: false
            });
            this.requestList();
        });
    }

    render() {
        return (
            <div>
                <Card>
                    <Button type="primary">创建角色</Button>
                    <Button type="primary" onClick={this.handlePermission} style={{marginLeft: 10, marginRight: 10}}>设置权限</Button>
                    <Button type="primary">用户授权</Button>
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
                <Modal title="设置权限"
                       visible={this.state.isVisibleModal}
                       width={600}
                       onOk={this.handleEditSubmit}
                       onCancel={() => {
                           this.setState({isVisibleModal: false})
                       }}>
                    <EditForm detailInfo={this.selectedRow}
                              menuInfo={this.state.menuInfo}
                              patchMenuInfo={(checkedKeys) => {
                                  this.setState({
                                      menuInfo: checkedKeys
                                  })
                              }}
                              wrappedComponentRef={(inst) => {
                                  this.permForm = inst
                              }}
                    />
                </Modal>
            </div>
        )
    }
}

class EditForm extends React.Component {
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

EditForm = Form.create()(EditForm);