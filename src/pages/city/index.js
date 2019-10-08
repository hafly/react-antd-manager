import React from 'react';
import {Card, Form, Select, Button, Table, Spin, Modal, message} from 'antd';
import axios from '../../utils/axios';
import utils from '../../utils/utils';

const FormItem = Form.Item;
const Option = Select.Option;

export default class City extends React.Component {

    state = {
        loading: true,
        dataSource: [],
        isShowOpenCity: false
    }

    params = {
        page: 1
    }

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
            url: '/open_city',
            data: {
                page: this.params.page
            }
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

    // 开通城市
    handleOpenCity = () => {
        this.setState({
            isShowOpenCity: true
        })
    }

    // 确定开通城市
    handleSubmit = () => {
        let cityInfo = this.cityForm.props.form.getFieldsValue();
        axios.ajax({
            url: '/city/open',
            data: cityInfo
        }).then((res) => {
            message.success(res.message);
            this.setState({
                isShowOpenCity: false
            });
            this.requestList();
        });
    }

    render() {
        const columns = [
            {
                title: '城市ID',
                dataIndex: 'id'
            },
            {
                title: '城市名称',
                dataIndex: 'name'
            },
            {
                title: '用车模式',
                dataIndex: 'mode'
            },
            {
                title: '运营模式',
                dataIndex: 'op_mode'
            },
            {
                title: '授权加盟商',
                dataIndex: 'franchisee_name'
            },
            {
                title: '城市管理员',
                dataIndex: 'city_admins',
                render(arr) {
                    return arr.map((item) => {
                        return item.user_name;
                    }).join(',');
                }
            },
            {
                title: '城市开通时间',
                dataIndex: 'open_time'
            },
            {
                title: '操作时间',
                dataIndex: 'update_time',
                render(item){
                    return utils.formatDate(item);
                }
            },
            {
                title: '操作人',
                dataIndex: 'sys_user_name'
            },
        ]
        return (
            <Spin spinning={this.state.loading}>
                <Card>
                    <FilterForm/>
                </Card>
                <Card style={{marginTop: 10, borderBottom: 0}}>
                    <Button type="primary" onClick={this.handleOpenCity}>开通城市</Button>
                </Card>
                <div className="content-wrap" style={{borderTop: 0}}>
                    <Table
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={this.state.pagination}
                    />
                </div>
                <Modal
                    title="开通城市"
                    width={360}
                    visible={this.state.isShowOpenCity}
                    onCancel={() => {
                        this.setState({
                            isShowOpenCity: false
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
                <FormItem label="用车模式">
                    {
                        getFieldDecorator('defaultTime', {
                            initialValue: '0'
                        })(
                            <Select placeholder="请选择时间" style={{width: 124}}>
                                <Option value="0">无默认时间</Option>
                                <Option value="1">当前天前30天</Option>
                                <Option value="2">当天13日前-当天2日前</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="运营模式">
                    {
                        getFieldDecorator('op_mode', {
                            initialValue: ''
                        })(
                            <Select placeholder="全部" style={{width: 100}}>
                                <Option value="">全部</Option>
                                <Option value="1">自营</Option>
                                <Option value="2">加盟</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="加盟商授权状态">
                    {
                        getFieldDecorator('auth_status', {
                            initialValue: ''
                        })(
                            <Select placeholder="全部" style={{width: 100}}>
                                <Option value="">全部</Option>
                                <Option value="1">已授权</Option>
                                <Option value="2">未授权</Option>
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

class OpenCityForm extends React.Component {
    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            }
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