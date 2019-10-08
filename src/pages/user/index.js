import React from 'react';
import {Card, Form, Table, Button, Input, Spin, Modal, message} from 'antd';
import BaseForm from '../../components/BaseForm';
// import moment from 'moment';
import axios from '../../utils/axios';
import utils from '../../utils/utils';
import dictionary from '../../config/dictionary';

const FormItem = Form.FormItem;

export default class User extends React.Component {
    state = {
        loading: true,
        dataSource: [],
        type: '',
        title: '',
        isModalVisible: false
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
            placeholder: '请输入用户名',
            initialValue: ''
        },
        {
            type: 'Input',
            label: '用户手机号',
            field: 'user_mobile',
            width: 100,
            placeholder: '请输入用户手机号',
            initialValue: ''
        },
        {
            type: 'DatePicker',
            label: '请选择入职日期',
            field: 'user_date',
            width: 100,
            placeholder: '请输入日期',
            initialValue: ''
        }
    ];

    componentDidMount() {
        this.requestList();
    }

    requestList() {
        let self = this;
        this.setState({
            loading: true
        });

        axios.ajax({
            url: '/user/list',
            data: this.params,
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

    // 表单提交
    handleFormSubmit = (params) => {
        this.params = params;
        this.params.page = 1;
        this.requestList();
    }

    // 操作
    handleOperate = (type) => {
        if (type === 'add') {
            this.setState({
                type,
                isModalVisible: true,
                title: '创建员工'
            })
        }
    }

    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id'
            },
            {
                title: '用户名',
                dataIndex: 'userName'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render(sex) {
                    return sex === 1 ? '男' : '女'
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
                render(state) {
                    return dictionary.state[state];
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',

                render(interest) {
                    return dictionary.interest[interest];
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '练习地址',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                dataIndex: 'time'
            }
        ];

        return (
            <Spin spinning={this.state.loading}>
                <Card>
                    <BaseForm formList={this.formList} formSubmit={this.handleFormSubmit}></BaseForm>
                </Card>
                <Card className="opertate-wrap" style={{marginTop: 10, borderBottom: 0}}>
                    <Button icon="plus" onClick={() => this.handleOperate('add')}>创建员工</Button>
                    <Button icon="edit" onClick={() => this.handleOperate()}>编辑员工</Button>
                    <Button icon="code" onClick={() => this.handleOperate()}>员工详情</Button>
                    <Button icon="delete" style={{marginLeft: 10}} onClick={() => this.handleOperate()}>删除员工</Button>
                </Card>
                <Card>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={this.state.pagination}
                    />
                </Card>

                <Modal
                    title={this.state.title}
                    visible={this.state.isModalVisible}
                    onOk={this.handleFormSubmit}
                    onCancel={() => {
                        this.setState({
                            isModalVisible: false
                        })
                    }}
                    width={600}
                >
                </Modal>
            </Spin>
        )
    }
}

class UserForm extends React.Component {
    render() {
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 19}
        }

        return (
            <Form layout="horizontal">
                <FormItem label="用户名" {...formItemLayout}>
                    {
                        getFieldDecorator('userName', {
                            initialValue: ''
                        })(
                            <Input type="text" placeholder="请输入用户名"/>
                        )
                    }
                </FormItem>
            </Form>
        )
    }
}

