import React from 'react';
import {Card, Table, Spin, Modal, Button, message} from 'antd';
import BaseTable from '../../components/BaseTable';
import axios from '../../utils/axios';
import utils from "../../utils/utils";

export default class BasicTable extends React.Component {
    state = {
        loading: true,
        dataSource: [],
        dataSource2: [],
        selectedRowKeys: [],    // 单选选中key
        selectedItem: {},       // 单选选中对象
        selectedRowKeys2: [],   // 多选选中keys
        selectedRows: [],       // 多选选中对象数组
    }

    params = {
        page: 1
    }

    componentDidMount() {
        const dataSource = [
            {
                key: '0',
                id: '0',
                userName: 'Jack',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            },
            {
                key: '1',
                id: '1',
                userName: 'Tom',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            },
            {
                key: '2',
                id: '2',
                userName: 'Lily',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            }
        ];
        this.setState({
            dataSource
        });
        this.request();
    }

    request() {
        let self = this;
        this.setState({
            loading: true
        });
        axios.ajax({
            url: '/table/list',
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
                dataSource2: data.rows,
                pagination: utils.pagination(data, (current) => {
                    self.params.page = current;
                    self.request();
                })
            })
        });
    }

    onRadioSelect = (record) => {
        Modal.info({
            title: '信息',
            content: `用户名：${record.userName}`
        })
        let selectKey = [record.key];
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
    }

    onCheckboxChange = (selectedRowKeys, selectedRows) => {
        this.setState({
            selectedRowKeys2: selectedRowKeys,
            selectedRows: selectedRows
        })
    }

    // 多选执行删除
    handleDelete = () => {
        let rows = this.state.selectedRows;
        let ids = [];
        rows.forEach(function (item) {
            ids.push(item.id);
        });
        Modal.confirm({
            title: '删除提示',
            content: `你确定要删除这些数据吗？${ids.join(',')}`,
            onOk: () => {
                message.success('删除成功');
            }
        })
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
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                dataIndex: 'time'
            }
        ];

        return (
            <div>
                <Card title="基础表格">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                    />
                </Card>
                <Card title="动态数据渲染表格" style={{marginTop: 10}}>
                    <Spin spinning={this.state.loading}>
                        <Table
                            columns={columns}
                            dataSource={this.state.dataSource2}
                            pagination={false}
                        />
                    </Spin>
                </Card>
                <Card title="单选" style={{marginTop: 10}}>
                    <Spin spinning={this.state.loading}>
                        <BaseTable
                            type="radio"
                            columns={columns}
                            dataSource={this.state.dataSource2}
                            selectedRowKeys={this.state.selectedRowKeys}
                            onSelect={this.onRadioSelect}
                            pagination={false}
                        />
                    </Spin>
                </Card>
                <Card title="多选" style={{marginTop: 10}}>
                    <Spin spinning={this.state.loading}>
                        <div>
                            <Button onClick={this.handleDelete}>删除</Button>
                        </div>
                        <BaseTable
                            type="checkbox"
                            columns={columns}
                            dataSource={this.state.dataSource2}
                            selectedRowKeys={this.state.selectedRowKeys2}
                            onChange={this.onCheckboxChange}
                            pagination={false}
                        />
                    </Spin>
                </Card>
                <Card title="表格分页" style={{marginTop: 10}}>
                    <Spin spinning={this.state.loading}>
                        <BaseTable
                            columns={columns}
                            dataSource={this.state.dataSource2}
                            pagination={this.state.pagination}
                        />
                    </Spin>
                </Card>
            </div>
        )
    }
}