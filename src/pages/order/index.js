import React from 'react';
import {Card, Form, Button, Table, Spin, Modal, message} from 'antd';
import BaseForm from '../../components/BaseForm';
import moment from 'moment';
import axios from '../../utils/axios';
import utils from '../../utils/utils';

const FormItem = Form.Item;

export default class Order extends React.PureComponent {

    state = {
        loading: true,
        orderConfirmVisible: false,
        selectedRowKeys: [],    // 单选选中key
        selectedItem: {},       // 单选选中对象
        orderInfo: {}           // 选中订单信息
    }

    params = {
        page: 1
    }

    formList = [{
        type: 'select',
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
    }, {
        type: 'doubleDay',
        label: '订单时间',
        field: 'order_time',
        initialValue: [moment('2019-09-01', 'YYYY-MM-DD'), moment('2019-09-30', 'YYYY-MM-DD')]
    }, {
        type: 'select',
        label: '订单状态',
        field: 'order_status',
        width: 100,
        initialValue: '1',
        list: [
            {id: '0', name: '全部'},
            {id: '1', name: '进行中'},
            {id: '2', name: '结束行程'}]
    }]

    componentDidMount() {
        this.request();
    }

    request() {
        let self = this;
        this.setState({
            loading: true
        });
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
                loading: false,
                dataSource: data.rows,
                pagination: utils.pagination(data, (current) => {
                    self.params.page = current;
                    self.request();
                })
            })
        });
    }

    // 结束订单
    handleFinish = () => {
        let id = this.state.selectedItem.id;
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
                selectedItem: {},
                selectedRowKeys: []
            });
            this.request();
        });
    }

    // 结束订单-单选选中
    onRowClick = (record, index) => {
        let selectKey = [index];
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
    }

    openOrderDetail = () => {
        let item = this.state.selectedItem;
        if (!item.id) {
            Modal.warn({
                title: '信息',
                content: '请选择一条订单进行操作'
            });
            return
        }
        window.open(`/common/order/detail/${item.id}`);
    }

    handleFormSubmit = (params) => {
        this.params = params;
        this.params.page = 1;
        this.request();
    }

    render() {
        const columns = [
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

        const rowSelection = {
            type: 'radio',
            selectedRowKeys: this.state.selectedRowKeys
        }

        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 19}
        }

        return (
            <Spin spinning={this.state.loading}>
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
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={this.state.pagination}
                        rowSelection={rowSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index)
                                }
                            }
                        }}
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
            </Spin>
        )
    }
}
