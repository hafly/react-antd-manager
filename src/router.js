import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {createBrowserHistory} from 'history';
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
import Rich from './pages/rich';
import Permission from './pages/permission';
import NoMatch from './pages/nomatch';

export default class IRouter extends React.Component {
    render() {
        return (
            <ConfigProvider locale={zh_CN}>
                <BrowserRouter>
                    <App>
                        <Switch>
                            <Route path="/login" component={Login}/>
                            <Route path="/common" render={() =>
                                <Common>
                                    <Switch>
                                        <Route path="/common/order/detail/:orderId" component={OrderDetail}/>
                                    </Switch>
                                </Common>
                            }/>
                            <Route path="/" render={() =>
                                <Admin history={createBrowserHistory()}>
                                    <Switch>
                                        <Route path="/home" component={Home}/>
                                        <Route path="/ui/buttons" component={Buttons}/>
                                        <Route path="/ui/modals" component={Modals}/>
                                        <Route path="/ui/loadings" component={Loadings}/>
                                        <Route path="/ui/notification" component={Notice}/>
                                        <Route path="/ui/messages" component={Messages}/>
                                        <Route path="/ui/tabs" component={Tabs}/>
                                        <Route path="/ui/gallery" component={Gallery}/>
                                        <Route path="/ui/carousel" component={Carousel}/>
                                        <Route path="/form/login" component={FormLogin}/>
                                        <Route path="/form/register" component={FormRegister}/>
                                        <Route path="/table/basic" component={BasicTable}/>
                                        <Route path="/table/high" component={HighTable}/>
                                        <Route path="/city" component={City}/>
                                        <Route path="/order" component={Order}/>
                                        <Route path="/user" component={User}/>
                                        <Route path="/bikeMap" component={BikeMap}/>
                                        <Route path="/chart/bar" component={ChartBar}/>
                                        <Route path="/chart/line" component={ChartLine}/>
                                        <Route path="/chart/pie" component={ChartPie}/>
                                        <Route path="/rich" component={Rich}/>
                                        <Route path="/permission" component={Permission}/>
                                        <Redirect to="/home"/>
                                        <Route component={NoMatch}/>
                                    </Switch>
                                </Admin>
                            }/>
                        </Switch>
                    </App>
                </BrowserRouter>
            </ConfigProvider>
        );
    }
}