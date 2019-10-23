import React from 'react';
import {Card} from 'antd';
// import echarts from 'echarts';
// 按需加载
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import ReactEachrts from 'echarts-for-react/lib/core';
import themeLight from "./themeLight";

export default class Bar extends React.Component {
    componentWillMount() {
        echarts.registerTheme('theme', themeLight);
    }

    getOption() {
        let option = {
            title: {
                text: '用户骑行订单'
            },
            legend: {
                data: ['订单量']
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '订单量',
                    type: 'line',
                    data: [1000, 2000, 1500, 3000, 2000, 1200, 800]
                }
            ]
        }
        return option;
    }

    getOption2() {
        let option = {
            title: {
                text: '用户骑行订单'
            },
            legend: {
                data: ['OFO订单量', '摩拜订单量', '小蓝订单量']
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'OFO订单量',
                    type: 'line',
                    data: [2000, 3000, 5500, 7000, 8000, 12000, 20000]
                },
                {
                    name: '摩拜订单量',
                    type: 'line',
                    data: [1500, 3000, 4500, 6000, 8000, 10000, 15000]
                },
                {
                    name: '小蓝订单量',
                    type: 'line',
                    data: [1000, 2000, 2500, 4000, 6000, 7000, 8000]
                }
            ]
        }
        return option;
    }

    getOption3() {
        let option = {
            title: {
                text: '用户骑行订单'
            },
            legend: {
                data: ['订单量']
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '订单量',
                    type: 'line',
                    lineStyle: {
                        color: '#E87C25',
                    },
                    itemStyle:{
                        color: '#E87C25',
                    },
                    areaStyle: {
                        color: '#FCCE10',
                        opacity: 0.6
                    },
                    data: [1000, 2000, 1500, 3000, 2000, 1200, 800]
                }
            ]
        }
        return option;
    }

    render() {
        return (
            <div>
                <Card title="折线图一">
                    <ReactEachrts echarts={echarts} option={this.getOption()} theme="theme" style={{height: 350}}/>
                </Card>
                <Card title="折线图二">
                    <ReactEachrts echarts={echarts} option={this.getOption2()} theme="theme" style={{height: 350}}/>
                </Card>
                <Card title="折线图三">
                    <ReactEachrts echarts={echarts} option={this.getOption3()} theme="theme" style={{height: 350}}/>
                </Card>
            </div>
        )
    }
}