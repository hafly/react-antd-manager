import React from 'react';
import {Card, Form, Table, Button, Modal, message} from 'antd';
import BaseForm from '../../components/BaseForm';
import moment from 'moment';
import axios from '../../utils/axios';
import utils from '../../utils/utils';

const FormItem = Form.Item;

export default class Order extends React.Component {
    state = {
        orderConfirmVisible: false,
        selectedRowKeys: [],    // 单选选中key
        selectedRows: {},       // 单选选中对象
        orderInfo: {}           // 选中订单信息
    }

    params = {
        page: 1,
        city: '',
        order_time: '',
        order_status: ''
    }

    formList = [
        {
            type: 'Select',
            label: '城市',
            field: 'city',
            width: 100,
            placeholder: '全部',
            initialValue: '0',
            list: [
                {id: '0', name: '全部'},
                {id: '1', name: '北京市'},
                {id: '2', name: '天津市'},
                {id: '3', name: '重庆市'}
            ]
        },
        {
            type: 'RangePicker',
            label: '订单时间',
            field: 'order_time',
            initialValue: [moment('2019-09-01', 'YYYY-MM-DD'), moment('2019-09-30', 'YYYY-MM-DD')]
        },
        {
            type: 'Select',
            label: '订单状态',
            field: 'order_status',
            width: 100,
            initialValue: '1',
            list: [
                {id: '0', name: '全部'},
                {id: '1', name: '进行中'},
                {id: '2', name: '结束行程'}]
        }]

    columns = [
        {
            title: '订单编号',
            dataIndex: 'order_sn'
        },
        {
            title: '车辆编号',
            dataIndex: 'bike_sn'
        },
        {
            title: '用户名',
            dataIndex: 'user_name'
        },
        {
            title: '手机号码',
            dataIndex: 'mobile'
        },
        {
            title: '里程',
            dataIndex: 'distance',
            render(distance) {
                return distance / 1000 + 'Km';
            }
        },
        {
            title: '行驶时长',
            dataIndex: 'total_time'
        },
        {
            title: '状态',
            dataIndex: 'status'
        },
        {
            title: '开始时间',
            dataIndex: 'start_time'
        },
        {
            title: '结束时间',
            dataIndex: 'end_time'
        },
        {
            title: '订单金额',
            dataIndex: 'total_fee'
        },
        {
            title: '实付金额',
            dataIndex: 'user_pay'
        }
    ];

    componentDidMount() {
        this.request();
    }

    request() {
        let self = this;
        axios.ajax({
            url: '/order/list',
            data: {
                page: this.params
            }
        }).then((res) => {
            let data = res.data;
            data.rows.map((item, index) => {
                return item.key = index;
            });
            this.setState({
                dataSource: data.rows,
                pagination: utils.pagination(data, (current) => {
                    self.params.page = current;
                    self.request();
                })
            });
        });
    }

    // 结束订单
    handleFinish = () => {
        let id = this.state.selectedRows.id;
        if (!id) {
            Modal.warn({
                title: '信息',
                content: '请选择一条订单进行操作'
            });
            return
        }

        axios.ajax({
            url: '/order/ebike_info',
            data: {
                id: id
            }
        }).then((res) => {
            this.setState({
                orderConfirmVisible: true,
                orderInfo: res.data
            })
        });
    }

    // 结束订单-确认
    handleFinishConfirm = () => {
        axios.ajax({
            url: '/order/finish_order',
            data: {
                id: 1
            }
        }).then(() => {
            message.success('订单结束成功');
            this.setState({
                orderConfirmVisible: false,
                selectedRows: {},
                selectedRowKeys: []
            });
            this.request();
        });
    }

    // 结束订单-单选选中
    onRowSelect = (record) => {
        this.setState({
            selectedRowKeys: [record.key],
            selectedRows: record
        })
    }

    openOrderDetail = () => {
        let item = this.state.selectedRows;
        if (!item.id) {
            Modal.warn({
                title: '信息',
                content: '请选择一条订单进行操作'
            });
            return
        }
        window.open(`/common/order/detail/${item.id}`);
    }

    // 表单提交
    handleFormSubmit = (params) => {
        this.params = params;
        this.params.page = 1;
        this.request();
    }

    render() {
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 19}
        }

        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} formSubmit={this.handleFormSubmit}></BaseForm>
                </Card>
                <Card style={{marginTop: 10, borderBottom: 0}}>
                    <Button onClick={this.openOrderDetail}>订单详情</Button>
                    <Button style={{marginLeft: 10}} onClick={this.handleFinish}>结束订单</Button>
                </Card>
                <Card>
                    <Table
                        bordered
                        columns={this.columns}
                        dataSource={this.state.dataSource}
                        rowSelection={{
                            type: 'radio',
                            selectedRowKeys: this.state.selectedRowKeys,
                            onSelect: (row) => {
                                this.onRowSelect(row)
                            }
                        }}
                        pagination={this.state.pagination}
                    />
                </Card>
                <Modal
                    title="结束订单"
                    visible={this.state.orderConfirmVisible}
                    onCancel={() => {
                        this.setState({
                            orderConfirmVisible: false
                        })
                    }}
                    onOk={this.handleFinishConfirm}
                >
                    <Form layout="horizontal">
                        <FormItem label="车辆信息" {...formItemLayout}>
                            {this.state.orderInfo.bike_sn}
                        </FormItem>
                        <FormItem label="剩余电量" {...formItemLayout}>
                            {this.state.orderInfo.battery + '%'}
                        </FormItem>
                        <FormItem label="行程开始时间" {...formItemLayout}>
                            {this.state.orderInfo.start_time}
                        </FormItem>
                        <FormItem label="当前位置" {...formItemLayout}>
                            {this.state.orderInfo.location}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}

