import React from 'react';
import {Layout} from 'antd';
import utils from '../../utils/utils';
import axios from '../../utils/axios';
import './index.less';

const Header = Layout.Header;
export default class LayoutHeader extends React.Component {
    state = {};

    componentDidMount() {
        let self = this;

        this.setState({
            userName: '栉风沐雨'
        });

        this.setSysTime();
        this.getWeatherAPIData();

        setInterval(() => {
            self.setSysTime();
        }, 1000);
    }

    setSysTime() {
        let sysTime = utils.formatDate(new Date().getTime());
        this.setState({
            sysTime
        });
    }

    getWeatherAPIData() {
        let city = '重庆';
        axios.jsonp({
            url: 'http://api.map.baidu.com/telematics/v3/weather?location=' + encodeURIComponent(city) + '&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
        }).then((res) => {
            if (res.status === 'success') {
                let data = res.results[0].weather_data[0];
                this.setState({
                    dayPictureUrl: data.dayPictureUrl,
                    weather: data.weather
                })
            }
        })
    }

    render() {
        const menuType = this.props.menuType;
        return (
            <Header className="ant-layout-header">
                <div className="header-top">
                    {
                        menuType ?
                            <span className="ant-layout-logo">
                                <img src="/assets/logo-ant.svg" alt=""/>
                                <h1>Ant Design</h1>
                            </span> : ''
                    }
                    <span>
                        <span>
                            {this.state.sysTime}
                        </span>
                        <span style={{marginLeft: '10px'}}>
                            <img src={this.state.dayPictureUrl} alt="" style={{height: 18, paddingBottom: 4}}/>
                        </span>
                        <span>
                            {this.state.weather}
                        </span>
                    </span>
                    <span style={{marginLeft: '20px'}}>
                        <span>欢迎，{this.state.userName}</span>
                        <a href="/" style={{marginLeft: '10px'}}>退出</a>
                    </span>
                </div>
            </Header>
        )
    }
}