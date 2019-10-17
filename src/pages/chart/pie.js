import React from 'react';
import {Card} from 'antd';
// import echarts from 'echarts';
// 按需加载
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import ReactEachrts from 'echarts-for-react';
import themeLight from './themeLight';

export default class Bar extends React.Component {
    componentWillMount() {
        echarts.registerTheme('theme', themeLight);
    }

    getOption() {
        let option = {
            title: {
                text: '用户骑行订单',
                x: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    data: [
                        {
                            name: '周一',
                            value: 1000
                        },
                        {
                            name: '周二',
                            value: 1000
                        },
                        {
                            name: '周三',
                            value: 2000
                        },
                        {
                            name: '周四',
                            value: 1500
                        },
                        {
                            name: '周五',
                            value: 3000
                        },
                        {
                            name: '周六',
                            value: 2000
                        },
                        {
                            name: '周日',
                            value: 1200
                        }
                    ]
                }
            ]
        }
        return option;
    }

    getOption2() {
        let option = {
            title: {
                text: '用户骑行订单',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a}<br/>{b}:{c}({d}%)'
            },
            legend: {
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    radius: ['50%', '65%'],
                    center: ['50%', '60%'],
                    data: [
                        {
                            name: '周一',
                            value: 1000
                        },
                        {
                            name: '周二',
                            value: 1000
                        },
                        {
                            name: '周三',
                            value: 2000
                        },
                        {
                            name: '周四',
                            value: 1500
                        },
                        {
                            name: '周五',
                            value: 3000
                        },
                        {
                            name: '周六',
                            value: 2000
                        },
                        {
                            name: '周日',
                            value: 1200
                        }
                    ]
                }
            ]
        }
        return option;
    }

    getOption3() {
        let option = {
            title: {
                text: '用户骑行订单',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a}<br/>{b}:{c}({d}%)'
            },
            legend: {
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    roseType: 'radius',
                    radius: ['50%', '65%'],
                    center: ['50%', '60%'],
                    data: [
                        {
                            name: '周一',
                            value: 1000
                        },
                        {
                            name: '周二',
                            value: 1000
                        },
                        {
                            name: '周三',
                            value: 2000
                        },
                        {
                            name: '周四',
                            value: 1500
                        },
                        {
                            name: '周五',
                            value: 3000
                        },
                        {
                            name: '周六',
                            value: 2000
                        },
                        {
                            name: '周日',
                            value: 1200
                        }
                    ].sort((a, b) => {
                        return a.value - b.value
                    })
                }
            ]
        }
        return option;
    }

    render() {
        return (
            <div>
                <Card title="饼图一">
                    <ReactEachrts option={this.getOption()} theme="theme" style={{height: 350}}/>
                </Card>
                <Card title="饼图二" style={{marginTop: 10}}>
                    <ReactEachrts option={this.getOption2()} theme="theme" style={{height: 350}}/>
                </Card>
                <Card title="饼图三" style={{marginTop: 10}}>
                    <ReactEachrts option={this.getOption3()} theme="theme" style={{height: 350}}/>
                </Card>
            </div>
        )
    }
}