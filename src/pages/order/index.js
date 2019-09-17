import React from 'react';
import {Card, Form, Select, Button, Table, DatePicker, Spin, Modal, message} from 'antd';
import axios from '../../utils/axios';
import utils from '../../utils/utils';
import locale from 'antd/es/date-picker/locale/zh_CN';

const FormItem = Form.Item;
const Option = Select.Option;
const {RangePicker} = DatePicker;

export default class Order extends React.Component {

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
                page: this.params.page
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
                selectedRowKeys:[]
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
        window.open(`/#/common/order/detail/${item.id}`);
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
                    <FilterForm/>
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

// 查询表单
class FilterForm extends React.Component {
    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form layout="inline">
                <FormItem label="城市">
                    {
                        getFieldDecorator('city_id', {
                            initialValue: ''
                        })(
                            <Select placeholder="全部" style={{width: 100}}>
                                <Option value="">全部</Option>
                                <Option value="1">北京市</Option>
                                <Option value="2">天津市</Option>
                                <Option value="3">重庆市</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="订单时间">
                    <RangePicker
                        locale={locale}
                        dateRender={current => {
                            const style = {};
                            if (current.date() === 1) {
                                style.border = '1px solid #1890ff';
                                style.borderRadius = '50%';
                            }
                            return (
                                <div className="ant-calendar-date" style={style}>
                                    {current.date()}
                                </div>
                            );
                        }}
                    />
                </FormItem>
                <FormItem label="订单状态">
                    {
                        getFieldDecorator('auth_status', {
                            initialValue: ''
                        })(
                            <Select placeholder="全部" style={{width: 100}}>
                                <Option value="">全部</Option>
                                <Option value="1">进行中</Option>
                                <Option value="2">结束行程</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button type="primary" style={{margin: '0 20px'}}>查询</Button>
                    <Button>重置</Button>
                </FormItem>
            </Form>
        )
    }
}

FilterForm = Form.create()(FilterForm);
