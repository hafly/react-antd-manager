import React from 'react';
import {Card} from 'antd';
import axios from '../../utils/axios';
import './detail.less';

export default class Detail extends React.Component {
    state = {
        orderInfo: {}
    }

    componentDidMount() {
        let orderId = this.props.match.params.orderId;
        if (orderId) {
            this.getData(orderId);
        }
    }

    getData(orderId) {
        axios.ajax({
            url: '/order/detail',
            data: {
                orderId: orderId
            }
        }).then((res) => {
            this.setState({
                orderInfo: res.data
            });
            this.renderMap(res.data);
        });
    }

    renderMap(data) {
        this.map = new window.BMap.Map("orderDetailMap", {});
        this.map.enableScrollWheelZoom(true);
        this.drawBikeRoute(data.position_list);
        this.drwaServiceArea(data.area);
        this.addMapControl();
    }

    addMapControl() {
        let map = this.map;
        map.addControl(new window.BMap.NavigationControl());
        map.addControl(new window.BMap.ScaleControl());
    }

    // 行驶轨迹
    drawBikeRoute(positionList) {
        let map = this.map;
        let BMap = window.BMap;

        if (positionList.length > 0) {
            let first = positionList[0];
            let last = positionList[positionList.length - 1];

            let startPoint = new window.BMap.Point(first.lon, first.lat);
            let endPoint = new window.BMap.Point(last.lon, last.lat);

            let startIcon = new BMap.Icon('/assets/start_point.png', new BMap.Size(36, 42), {
                imageSize: new BMap.Size(36, 42),
                anchor: BMap.Size(36, 42)
            });
            let endIcon = new BMap.Icon('/assets/end_point.png', new BMap.Size(36, 42), {
                imageSize: new BMap.Size(36, 42),
                anchor: BMap.Size(36, 42)
            });

            let startMaker = new BMap.Marker(startPoint, {icon: startIcon});
            let endMaker = new BMap.Marker(endPoint, {icon: endIcon});
            map.addOverlay(startMaker);
            map.addOverlay(endMaker);

            // 连接路线图
            let trackPoint = [];
            for (let i = 0; i < positionList.length; i++) {
                let point = positionList[i];
                trackPoint.push(new BMap.Point(point.lon, point.lat));
            }

            let polyline = new BMap.Polyline(trackPoint, {
                strokeColor: '#1869AD',
                strokeWeight: 3,
                strokeOpacity: 1
            })
            map.addOverlay(polyline);

            map.centerAndZoom(endPoint, 11);


        }
    }

    // 绘制服务区
    drwaServiceArea(positionList){
        let map = this.map;
        let BMap = window.BMap;

        let trackPoint = [];
        for (let i = 0; i < positionList.length; i++) {
            let point = positionList[i];
            trackPoint.push(new BMap.Point(point.lon, point.lat));
        }
        let polygon = new BMap.Polygon(trackPoint, {
            strokeColor: '#CE0000',
            strokeWeight: 4,
            strokeOpacity: 1,
            fillColor: '#ff8605',
            fillOpacity:0.4
        })
        map.addOverlay(polygon);
    }

    render() {
        const info = this.state.orderInfo;
        return (
            <Card>
                <div id="orderDetailMap" className="order-map"></div>
                <div className="detail-items">
                    <div className="item-title">基础信息</div>
                    <ul className="detail-form">
                        <li>
                            <div className="detail-form-left">用车模式</div>
                            <div className="detail-form-content">{info.mode === 1 ? '服务区' : '停车点'}</div>
                        </li>
                        <li>
                            <div className="detail-form-left">订单编号</div>
                            <div className="detail-form-content">{info.order_sn}</div>
                        </li>
                        <li>
                            <div className="detail-form-left">车辆信息</div>
                            <div className="detail-form-content">{info.bike_sn}</div>
                        </li>
                        <li>
                            <div className="detail-form-left">用户姓名</div>
                            <div className="detail-form-content">{info.user_name}</div>
                        </li>
                        <li>
                            <div className="detail-form-left">手机号码</div>
                            <div className="detail-form-content">{info.mobile}</div>
                        </li>
                    </ul>
                </div>
                <div className="detail-items">
                    <div className="item-title">行驶轨迹</div>
                    <ul className="detail-form">
                        <li>
                            <div className="detail-form-left">行程起点</div>
                            <div className="detail-form-content">{info.start_location}</div>
                        </li>
                        <li>
                            <div className="detail-form-left">行程终点</div>
                            <div className="detail-form-content">{info.end_location}</div>
                        </li>
                        <li>
                            <div className="detail-form-left">行驶里程</div>
                            <div className="detail-form-content">{info.distance / 1000 + '公里'}</div>
                        </li>
                    </ul>
                </div>
            </Card>
        )
    }
}