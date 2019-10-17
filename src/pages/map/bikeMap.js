import React from 'react';
import {Card, Spin} from 'antd';
import BaseForm from '../../components/BaseForm';
import BMap from 'BMap';
import axios from "../../utils/axios";

export default class BikeMap extends React.Component {
    state = {
        loading: true,
        total_count: 0
    }

    params = {}

    formList = [
        {
            type: 'Select',
            label: '城市',
            field: 'city',
            width: 100,
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
            initialValue: null
        },
        {
            type: 'Select',
            label: '订单状态',
            field: 'order_state',
            width: 100,
            initialValue: '0',
            list: [
                {id: '0', name: '全部'},
                {id: '1', name: '进行中'},
                {id: '2', name: '已完成'}
            ]
        },
    ]

    componentDidMount() {
        this.getData();
    }

    getData() {
        let self = this;
        this.setState({
            loading: true
        });
        axios.ajax({
            url: '/map/bike',
            data: this.params
        }).then((res) => {
            let data = res.data;
            self.setState({
                loading: false,
                total_count: data.total_count
            });
            self.renderMap(data);
        });
    }

    // 渲染地图数据
    renderMap(data) {
        let map = new BMap.Map('container');
        map.enableScrollWheelZoom(true);

        let list = data.route_list;
        let gps1 = list[0].split(',');
        let gps2 = list[list.length - 1].split(',');
        let startPoint = new BMap.Point(gps1[0], gps1[1]);
        let endPoint = new BMap.Point(gps2[0], gps2[1]);
        map.centerAndZoom(endPoint, 11);

        // 绘制起点和终点
        let startPointIcon = new BMap.Icon('/assets/start_point.png', new BMap.Size(36, 42), {
            imageSize: new BMap.Size(36, 42),
            anchor: BMap.Size(18, 42)
        });
        let endPointIcon = new BMap.Icon('/assets/end_point.png', new BMap.Size(36, 42), {
            imageSize: new BMap.Size(36, 42),
            anchor: BMap.Size(18, 42)
        });
        let startMaker = new BMap.Marker(startPoint, {icon: startPointIcon});
        let endMaker = new BMap.Marker(endPoint, {icon: endPointIcon});
        map.addOverlay(startMaker);
        map.addOverlay(endMaker);

        // 绘制车辆行驶路线
        let routeList = [];
        list.forEach((item) => {
            let p = item.split(',');
            routeList.push(new BMap.Point(p[0], p[1]));
        });
        let polyline = new BMap.Polyline(routeList, {
            strokeColor: '#ef4136',
            strokeWeight: 2,
            strokeOpacity: 1
        });
        map.addOverlay(polyline);

        // 绘制车辆服务区
        let serviceList = data.service_list;
        let servicePointList = [];
        serviceList.forEach((item) => {
            servicePointList.push(new BMap.Point(item.lon, item.lat));
        });
        let polygon = new BMap.Polygon(servicePointList, {
            strokeColor: '#CE0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#ff8605',
            fillOpacity: 0.1
        })
        map.addOverlay(polygon);

        // 添加地图中的自行车图标
        let bikeList = data.bike_list;
        let bikeIcon = new BMap.Icon('/assets/bike.jpg', new BMap.Size(36, 42), {
            imageSize: new BMap.Size(36, 42),
            anchor: BMap.Size(18, 42)
        });
        bikeList.forEach((item) => {
            let p = item.split(',');
            let point = new BMap.Point(p[0], p[1]);
            let marker = new BMap.Marker(point, {icon: bikeIcon});
            map.addOverlay(marker);
        });
    }

    // 表单查询
    handleFormSubmit = (params) => {
        this.params = params;
        this.getData();
    }

    render() {
        return (
            <Spin spinning={this.state.loading}>
                <Card>
                    <BaseForm formList={this.formList} formSubmit={this.handleFormSubmit}/>
                </Card>
                <Card className="content-wrap">
                    <div>共{this.state.total_count}辆车</div>
                    <div id="container" style={{height: 500}}></div>
                </Card>
            </Spin>
        )
    }
}