import React from 'react';
import {Card, Form, Button, Table, Input, Radio, Select, DatePicker, Spin, Modal, message} from 'antd';
import BaseForm from '../../components/BaseForm';
import BaseTable from '../../components/BaseTable';
import axios from '../../utils/axios';
import utils from '../../utils/utils';
import dictionary from '../../config/dictionary';

const FormItem = Form.Item;
const Option = Select.Option;

export default class City extends React.Component {
    state = {
        loading: true,
        dataSource: [],
        isVisibleModal: false
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

    componentDidMount() {
        this.requestList();
    }

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

    handleFormSubmit = (params) => {
        this.params = params;
        this.params.page = 1;
        this.requestList();
    }

    handleOperate = (type) => {
        if (type === 'add') {
            this.setState({
                type,
                isVisibleModal: true,
                title: '创建员工'
            })
        }
    }

    onRadioSelect = (selectedRows) => {
        console.log(selectedRows)
    }

    render() {
        return (
            <Spin spinning={this.state.loading}>
                <Card>
                    <BaseForm formList={this.formList} formSubmit={this.handleFormSubmit}/>
                </Card>
                <Card className="opertate-wrap" style={{marginTop: 10, borderBottom: 0}}>
                    <Button type="primary" icon="plus" onClick={() => this.handleOperate('add')}>创建员工</Button>
                    <Button type="primary" icon="edit" onClick={() => this.handleOperate('edit')}>编辑员工</Button>
                    <Button type="primary" onClick={() => this.handleOperate('detail')}>员工详情</Button>
                    <Button type="primary" icon="delete" onClick={() => this.handleOperate('delete')}>删除员工</Button>
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
                    onOk={this.handleSubmit}
                >
                    <OpenCityForm wrappedComponentRef={(inst) => {
                        this.cityForm = inst
                    }}/>
                </Modal>

            </Spin>
        )
    }
}

class OpenCityForm extends React.Component {
    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 19}
        }
        return (
            <Form layout="horizontal">
                <FormItem label="选择城市" {...formItemLayout}>
                    {
                        getFieldDecorator('city_id', {
                            initialValue: '1'
                        })(
                            <Select>
                                <Option value="">全部</Option>
                                <Option value="1">北京市</Option>
                                <Option value="2">天津市</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="运营模式" {...formItemLayout}>
                    {
                        getFieldDecorator('op_mode', {
                            initialValue: '1'
                        })(
                            <Select>
                                <Option value="1">自营</Option>
                                <Option value="2">加盟</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="用车模式" {...formItemLayout}>
                    {
                        getFieldDecorator('use_mode', {
                            initialValue: '1'
                        })(
                            <Select>
                                <Option value="1">指定停车点</Option>
                                <Option value="2">禁停区</Option>
                            </Select>
                        )
                    }
                </FormItem>
            </Form>
        )
    }
}

OpenCityForm = Form.create()(OpenCityForm);