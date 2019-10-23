import React from 'react';
import {Card} from 'antd';
// import echarts from 'echarts';
// 按需加载
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import ReactEachrts from 'echarts-for-react/lib/core';
import themeLight from './themeLight';

export default class Bar extends React.Component {
    componentWillMount() {
        echarts.registerTheme('theme', themeLight);
    }

    getOption() {
        let option = {
            title: {
                text: '用户骑行订单'
            },
            legend:{
                data:['订单量']
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
                    type: 'bar',
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
            legend:{
                data:['OFO','摩拜','小蓝']
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
                    name: 'OFO',
                    type: 'bar',
                    data: [2000, 3000, 5500, 7000, 8000, 12000, 20000]
                },
                {
                    name: '摩拜',
                    type: 'bar',
                    data: [1500, 3000, 4500, 6000, 8000, 10000, 15000]
                },
                {
                    name: '小蓝',
                    type: 'bar',
                    data: [1000, 2000, 2500, 4000, 6000, 7000, 8000]
                }
            ]
        }
        return option;
    }

    render() {
        return (
            <div>
                <Card title="柱形图一">
                    <ReactEachrts echarts={echarts} option={this.getOption()} theme="theme" style={{height: 350}}/>
                </Card>
                <Card title="柱形图二" style={{marginTop: 10}}>
                    <ReactEachrts echarts={echarts} option={this.getOption2()} theme="theme" style={{height: 350}}/>
                </Card>
            </div>
        )
    }
}