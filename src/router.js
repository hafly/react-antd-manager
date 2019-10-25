import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import {ConfigProvider} from 'antd';
import Loadable from './components/Loadable';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import App from './App';
import Admin from './admin';
import Common from './common';

const Login = Loadable(() => import('./pages/login'));
const Home = Loadable(() => import('./pages/home'));
const Buttons = Loadable(() => import('./pages/ui/buttons'));
const Modals = Loadable(() => import('./pages/ui/modals'));
const Loadings = Loadable(() => import('./pages/ui/loading'));
const Notice = Loadable(() => import('./pages/ui/notice'));
const Messages = Loadable(() => import('./pages/ui/message'));
const Tabs = Loadable(() => import('./pages/ui/tabs'));
const Gallery = Loadable(() => import('./pages/ui/gallery'));
const Carousel = Loadable(() => import('./pages/ui/carousel'));
const FormLogin = Loadable(() => import('./pages/form/login'));
const FormRegister = Loadable(() => import('./pages/form/register'));
const BasicTable = Loadable(() => import('./pages/table/basicTable'));
const HighTable = Loadable(() => import('./pages/table/highTable'));
const City = Loadable(() => import('./pages/city'));
const Order = Loadable(() => import('./pages/order'));
const OrderDetail = Loadable(() => import('./pages/order/detail'));
const User = Loadable(() => import('./pages/user'));
const BikeMap = Loadable(() => import('./pages/map/bikeMap'));
const ChartBar = Loadable(() => import('./pages/chart/bar'));
const ChartLine = Loadable(() => import('./pages/chart/line'));
const ChartPie = Loadable(() => import('./pages/chart/pie'));
const Rich = Loadable(() => import('./pages/rich'));
const Permission = Loadable(() => import('./pages/permission'));
const NoMatch = Loadable(() => import('./pages/nomatch'));

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