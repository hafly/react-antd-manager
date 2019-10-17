import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {ConfigProvider} from 'antd';
import 'moment/locale/zh-cn';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import App from './App';
import Login from './pages/login';
import Admin from './admin';
import Common from './common';
import Home from './pages/home';
import Buttons from './pages/ui/buttons';
import Modals from './pages/ui/modals';
import Loadings from './pages/ui/loading';
import Notice from './pages/ui/notice';
import Messages from './pages/ui/message';
import Tabs from './pages/ui/tabs';
import Gallery from './pages/ui/gallery';
import Carousel from './pages/ui/carousel';
import FormLogin from './pages/form/login';
import FormRegister from './pages/form/register';
import BasicTable from './pages/table/basicTable';
import HighTable from './pages/table/highTable';
import City from './pages/city';
import Order from './pages/order';
import OrderDetail from './pages/order/detail';
import User from './pages/user';
import BikeMap from './pages/map/bikeMap';
import ChartBar from './pages/chart/bar';
import ChartLine from './pages/chart/line';
import ChartPie from './pages/chart/pie';
import Rich from './pages/rich'
import NoMatch from './pages/nomatch';

export default class IRouter extends React.Component {
    render() {
        return (
            <ConfigProvider locale={zh_CN}>
                <BrowserRouter>
                    <App>
                        <Route path="/login" component={Login}/>
                        <Route path="/admin" render={() =>
                            <Admin>
                                <Switch>
                                    <Route path="/admin/home" component={Home}/>
                                    <Route path="/admin/ui/buttons" component={Buttons}/>
                                    <Route path="/admin/ui/modals" component={Modals}/>
                                    <Route path="/admin/ui/loadings" component={Loadings}/>
                                    <Route path="/admin/ui/notification" component={Notice}/>
                                    <Route path="/admin/ui/messages" component={Messages}/>
                                    <Route path="/admin/ui/tabs" component={Tabs}/>
                                    <Route path="/admin/ui/gallery" component={Gallery}/>
                                    <Route path="/admin/ui/carousel" component={Carousel}/>
                                    <Route path="/admin/form/login" component={FormLogin}/>
                                    <Route path="/admin/form/register" component={FormRegister}/>
                                    <Route path="/admin/table/basic" component={BasicTable}/>
                                    <Route path="/admin/table/high" component={HighTable}/>
                                    <Route path="/admin/city" component={City}/>
                                    <Route path="/admin/order" component={Order}/>
                                    <Route path="/admin/user" component={User}/>
                                    <Route path="/admin/bikeMap" component={BikeMap}/>
                                    <Route path="/admin/chart/bar" component={ChartBar}/>
                                    <Route path="/admin/chart/line" component={ChartLine}/>
                                    <Route path="/admin/chart/pie" component={ChartPie}/>
                                    <Route path="/admin/rich" component={Rich}/>
                                    <Route component={NoMatch}/>
                                </Switch>
                            </Admin>
                        }/>
                        <Route path="/common" render={() =>
                            <Common>
                                <Switch>
                                    <Route path="/common/order/detail/:orderId" component={OrderDetail}/>
                                </Switch>
                            </Common>
                        }/>
                    </App>
                </BrowserRouter>
            </ConfigProvider>
        );
    }
}