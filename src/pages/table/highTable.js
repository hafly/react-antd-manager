import React from 'react';
import {Card, Spin, Table, Badge, Button, Modal, message} from 'antd';
import axios from '../../utils/axios';
import utils from "../../utils/utils";

export default class BasicTable extends React.Component {
    state = {
        loading: true,
        dataSource: [],
        sortOrder: ''
    }

    params = {
        page: 1
    }

    componentDidMount() {
        this.request();
    }

    request = () => {
        this.setState({
            loading: true
        });
        axios.ajax({
            url: '/table/list',
            data: {
                page: this.params.page
            }
        }).then((data) => {
            let self = this;
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

    handleChange = (pagination, filters, sorter) => {
        this.setState({
            sortOrder: sorter.order
        })
    }

    // 删除操作
    handleDelete = (item) => {
        console.log(item);
        Modal.confirm({
            title: '确认',
            content: '你确认要删除此条数据吗？',
            onOk: () => {
                message.success('删除成功');
                this.request();
            }
        })
    }

    render() {
        const columns = [
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
                    let config = {
                        '1': '咸鱼一条',
                        '2': '风华浪子',
                        '3': '北大才子',
                        '4': '百度FE',
                        '5': '创业者'
                    }
                    return config[state];
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                width: 80,
                render(interest) {
                    let config = {
                        '1': '游泳',
                        '2': '打篮球',
                        '3': '踢足球',
                        '4': '跑步',
                        '5': '爬山',
                        '6': '骑行',
                        '7': '桌球',
                        '8': '麦霸',
                    }
                    return config[interest];
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
        const columns2 = [
            {
                title: 'id',
                dataIndex: 'id',
                width: 80,
                fixed: 'left'
            },
            {
                title: '用户名',
                dataIndex: 'userName',
                width: 80,
                fixed: 'left'
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
                width: 100,
                render(state) {
                    let config = {
                        '1': '咸鱼一条',
                        '2': '风华浪子',
                        '3': '北大才子',
                        '4': '百度FE',
                        '5': '创业者'
                    }
                    return config[state];
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                width: 80,
                render(interest) {
                    let config = {
                        '1': '游泳',
                        '2': '打篮球',
                        '3': '踢足球',
                        '4': '跑步',
                        '5': '爬山',
                        '6': '骑行',
                        '7': '桌球',
                        '8': '麦霸',
                    }
                    return config[interest];
                }
            },
            {
                title: '生日',
                width: 120,
                dataIndex: 'birthday'
            },
            {
                title: '生日',
                width: 120,
                render() {
                    return '2000-01-01'
                }
            },
            {
                title: '生日',
                width: 120,
                render() {
                    return '2000-01-01'
                }
            },
            {
                title: '生日',
                width: 120,
                render() {
                    return '2000-01-01'
                }
            },
            {
                title: '生日',
                width: 120,
                render() {
                    return '2000-01-01'
                }
            },
            {
                title: '地址',
                width: 120,
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                dataIndex: 'time',
                width: 80,
                fixed: 'right'
            }
        ]
        const columns3 = [
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
                title: '年龄',
                dataIndex: 'age',
                width: 80,
                sorter(a, b){
                    return a.age - b.age;
                },
                sortOrder: this.state.sortOrder
            },
            {
                title: '状态',
                dataIndex: 'state',
                width: 80,
                render(state) {
                    let config = {
                        '1': '咸鱼一条',
                        '2': '风华浪子',
                        '3': '北大才子',
                        '4': '百度FE',
                        '5': '创业者'
                    }
                    return config[state];
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                width: 80,
                render(interest) {
                    let config = {
                        '1': '游泳',
                        '2': '打篮球',
                        '3': '踢足球',
                        '4': '跑步',
                        '5': '爬山',
                        '6': '骑行',
                        '7': '桌球',
                        '8': '麦霸',
                    }
                    return config[interest];
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
        const columns4 = [
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
                width: 100,
                render(state) {
                    let config = {
                        '1': <Badge status="suceess" text="咸鱼一条"/>,
                        '2': <Badge status="error" text="风华浪子"/>,
                        '3': <Badge status="default" text="北大才子"/>,
                        '4': <Badge status="processing" text="百度FE"/>,
                        '5': <Badge status="warning" text="创业者"/>
                    }
                    return config[state];
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                width: 80,
                render(interest) {
                    let config = {
                        '1': '游泳',
                        '2': '打篮球',
                        '3': '踢足球',
                        '4': '跑步',
                        '5': '爬山',
                        '6': '骑行',
                        '7': '桌球',
                        '8': '麦霸',
                    }
                    return config[interest];
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
            },
            {
                title: '操作',
                width: 80,
                render: (item) => {
                    return <Button onClick={() => {
                        this.handleDelete(item)
                    }}>删除</Button>
                }
            }
        ]
        return (
            <Spin spinning={this.state.loading}>
                <Card title="头部固定">

                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        scroll={{y: 360}}
                    />

                </Card>
                <Card title="左侧固定" style={{marginTop: 10}}>
                    <Table
                        bordered
                        columns={columns2}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        scroll={{x: 1220}}
                    />
                </Card>
                <Card title="表格排序" style={{marginTop: 10}}>
                    <Table
                        bordered
                        columns={columns3}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        onChange={this.handleChange}
                    />
                </Card>
                <Card title="操作按钮" style={{marginTop: 10}}>
                    <Table
                        bordered
                        columns={columns4}
                        dataSource={this.state.dataSource}
                        pagination={false}
                    />
                </Card>
            </Spin>
        )
    }
}