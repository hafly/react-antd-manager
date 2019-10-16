import React from 'react';
import {Card, Form, Button, Input, Radio, Select, DatePicker, Spin, Modal, message} from 'antd';
import BaseForm from '../../components/BaseForm';
import BaseTable from '../../components/BaseTable';
import moment from 'moment';
import axios from '../../utils/axios';
import utils from '../../utils/utils';
import dictionary from '../../config/dictionary';

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const RadioGroup = Radio.Group;
const Option = Select.Option;

export default class User extends React.Component {
    state = {
        loading: true,
        dataSource: [],
        isVisibleModal: false,
        userInfo: {}
    }

    params = {
        page: 1
    }

    formList = [
        {
            type: 'Input',
            label: '用户名',
            field: 'user_name',
            width: 100,
            placeholder: '请输入用户名称',
            initialValue: ''
        },
        {
            type: 'Input',
            label: '用户手机号',
            field: 'user_mobile',
            placeholder: '请输入用户手机号',
            initialValue: ''
        },
        {
            type: 'DatePicker',
            label: '入职日期',
            field: 'user_date',
            width: 100,
            placeholder: '请选择入职日期',
            initialValue: null
        }]

    columns = [
        {
            title: 'id',
            dataIndex: 'id',
            width: 80
        },
        {
            title: '用户名',
            dataIndex: 'userName',
            width: 80
        },
        {
            title: '性别',
            dataIndex: 'sex',
            width: 80,
            render(sex) {
                return sex === 1 ? '男' : '女'
            }
        },
        {
            title: '状态',
            dataIndex: 'state',
            width: 80,
            render(state) {
                return dictionary['state'][state];
            }
        },
        {
            title: '爱好',
            dataIndex: 'interest',
            width: 80,
            render(interest) {
                return dictionary['interest'][interest];
            }
        },
        {
            title: '生日',
            width: 100,
            dataIndex: 'birthday'
        },
        {
            title: '地址',
            width: 120,
            dataIndex: 'address'
        },
        {
            title: '早起时间',
            dataIndex: 'time',
            width: 80
        }
    ]

    selectedRow = undefined;

    componentDidMount() {
        this.requestList();
    }

    // 请求表格数据
    requestList() {
        let self = this;
        this.setState({
            loading: true,
            dataSource: []
        });

        axios.ajax({
            url: '/table/list',
            data: this.params
        }).then((res) => {
            let data = res.data;
            data.rows.map((item, index) => {
                return item.key = index;
            });
            self.setState({
                loading: false,
                dataSource: data.rows,
                pagination: utils.pagination(data, (current) => {
                    self.params.page = current;
                    self.requestList();
                })
            })
        });
    }

    // 表单查询
    handleFormSubmit = (params) => {
        this.params = params;
        this.params.page = 1;
        this.requestList();
    }

    // 员工操作
    showModalOperate = (type) => {
        if (type === 'add') {
            this.setState({
                type,
                isVisibleModal: true,
                title: '添加员工'
            })
        }
        else if (type === 'edit') {
            let userInfo = this.selectedRow;
            if (!userInfo) {
                Modal.warn({
                    title: '信息',
                    content: '请选择一个员工进行操作'
                });
                return
            }
            this.setState({
                type,
                isVisibleModal: true,
                title: '编辑员工',
                userInfo
            })
        }
        else if (type === 'detail') {
            let userInfo = this.selectedRow;
            if (!userInfo) {
                Modal.warn({
                    title: '信息',
                    content: '请选择一个员工进行操作'
                });
                return
            }
            this.setState({
                type,
                isVisibleModal: true,
                title: '员工详情',
                userInfo
            })
        }
        else if (type === 'delete') {
            let userInfo = this.selectedRow;
            if (!userInfo) {
                Modal.warn({
                    title: '信息',
                    content: '请选择一个员工进行操作'
                });
                return
            }
            Modal.confirm({
                title: '确认删除',
                content: '是否要删除当前选中的员工',
                onOk: () => {
                    axios.ajax({
                        url: '/user/delete',
                        data: this.selectedRow
                    }).then((res) => {
                        message.success(res.message);
                        this.setState({
                            isVisibleModal: false
                        });
                        this.requestList();
                    });
                }
            })
        }
    }

    // 员工操作确认
    showModalOperateOk = () => {
        this.userForm.props.form.validateFields((err, fieldsValue) => {
            if (!err) {
                axios.ajax({
                    url: '/user/add',
                    data: fieldsValue
                }).then((res) => {
                    message.success(res.message);
                    this.setState({
                        isVisibleModal: false
                    });
                    this.requestList();
                });
            }
        });
    }

    onRadioSelect = (selectedRow) => {
        this.selectedRow = selectedRow;
    }

    render() {
        let footer = {};
        if (this.state.type === 'detail') {
            footer = {
                footer: null
            }
        }

        return (
            <Spin spinning={this.state.loading}>
                <Card>
                    <BaseForm formList={this.formList} formSubmit={this.handleFormSubmit}/>
                </Card>
                <Card className="opertate-wrap" style={{marginTop: 10, borderBottom: 0}}>
                    <Button type="primary" icon="plus" onClick={() => this.showModalOperate('add')}>添加员工</Button>
                    <Button type="primary" icon="edit" onClick={() => this.showModalOperate('edit')}>编辑员工</Button>
                    <Button type="primary" onClick={() => this.showModalOperate('detail')}>员工详情</Button>
                    <Button type="primary" icon="delete" onClick={() => this.showModalOperate('delete')}>删除员工</Button>
                </Card>
                <div className="content-wrap" style={{borderTop: 0}}>
                    <BaseTable
                        type="radio"
                        bordered
                        columns={this.columns}
                        dataSource={this.state.dataSource}
                        onSelect={this.onRadioSelect}
                        pagination={this.state.pagination}
                    />
                </div>
                <Modal
                    title={this.state.title}
                    width={360}
                    visible={this.state.isVisibleModal}
                    onCancel={() => {
                        this.setState({
                            isVisibleModal: false
                        })
                    }}
                    onOk={this.showModalOperateOk}
                    {...footer}
                >
                    <UserForm type={this.state.type} userInfo={this.state.userInfo} wrappedComponentRef={(inst) => {
                        this.userForm = inst
                    }}/>
                </Modal>
            </Spin>
        )
    }
}

class UserForm extends React.Component {
    getState(state) {
        return dictionary['state'][state];
    }

    render() {
        let userInfo = this.props.userInfo;
        let type = this.props.type;
        if (type === 'add') userInfo = {};

        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 19}
        }
        return (
            <Form layout="horizontal">
                <FormItem label="用户名" {...formItemLayout}>
                    {
                        type === 'detail' ? userInfo.userName :
                            getFieldDecorator('userName', {
                                initialValue: userInfo.userName,
                                rules: [
                                    {required: true, message: '用户名不能为空!'}
                                ]
                            })(
                                <Input type="text" placeholder="请输入用户名" autoComplete="off"/>
                            )
                    }
                </FormItem>
                <FormItem label="性别" {...formItemLayout}>
                    {
                        type === 'detail' ? (userInfo.sex === 1 ? '男' : '女') :
                            getFieldDecorator('sex', {
                                initialValue: userInfo.sex || 1
                            })(
                                <RadioGroup>
                                    <Radio value={1}>男</Radio>
                                    <Radio value={2}>女</Radio>
                                </RadioGroup>
                            )
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        type === 'detail' ? this.getState(userInfo.state) :
                            getFieldDecorator('state', {
                                initialValue: userInfo.state || 0
                            })(
                                <Select>
                                    <Option value={0}>请选择状态</Option>
                                    <Option value={1}>咸鱼一条</Option>
                                    <Option value={2}>风华浪子</Option>
                                    <Option value={3}>北大才子</Option>
                                    <Option value={4}>百度FE</Option>
                                    <Option value={5}>创业者</Option>
                                </Select>
                            )
                    }
                </FormItem>
                <FormItem label="生日" {...formItemLayout}>
                    {
                        type === 'detail' ? userInfo.birthday :
                            getFieldDecorator('birthday', {
                                initialValue: userInfo.birthday ? moment(userInfo.birthday) : null
                            })(
                                <DatePicker/>
                            )
                    }
                </FormItem>
                <FormItem label="联系地址" {...formItemLayout}>
                    {
                        type === 'detail' ? userInfo.address :
                            getFieldDecorator('address', {
                                initialValue: userInfo.address
                            })(
                                <TextArea rows={3} placeholder="请输入联系地址"/>
                            )
                    }
                </FormItem>
            </Form>
        )
    }
}

UserForm = Form.create()(UserForm);