import React, {Suspense, lazy} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import {ConfigProvider} from 'antd';
import 'moment/locale/zh-cn';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import {Spin} from 'antd';
import App from './App';
import Admin from './admin';
import Common from './common';

const Login = lazy(() => import('./pages/login'));
const Home = lazy(() => import('./pages/home'));
const Buttons = lazy(() => import('./pages/ui/buttons'));
const Modals = lazy(() => import('./pages/ui/modals'));
const Loadings = lazy(() => import('./pages/ui/loading'));
const Notice = lazy(() => import('./pages/ui/notice'));
const Messages = lazy(() => import('./pages/ui/message'));
const Tabs = lazy(() => import('./pages/ui/tabs'));
const Gallery = lazy(() => import('./pages/ui/gallery'));
const Carousel = lazy(() => import('./pages/ui/carousel'));
const FormLogin = lazy(() => import('./pages/form/login'));
const FormRegister = lazy(() => import('./pages/form/register'));
const BasicTable = lazy(() => import('./pages/table/basicTable'));
const HighTable = lazy(() => import('./pages/table/highTable'));
const City = lazy(() => import('./pages/city'));
const Order = lazy(() => import('./pages/order'));
const OrderDetail = lazy(() => import('./pages/order/detail'));
const User = lazy(() => import('./pages/user'));
const BikeMap = lazy(() => import('./pages/map/bikeMap'));
const ChartBar = lazy(() => import('./pages/chart/bar'));
const ChartLine = lazy(() => import('./pages/chart/line'));
const ChartPie = lazy(() => import('./pages/chart/pie'));
const Rich = lazy(() => import('./pages/rich'));
const Permission = lazy(() => import('./pages/permission'));
const NoMatch = lazy(() => import('./pages/nomatch'));

export default class IRouter extends React.Component {
    render() {
        return (
            <ConfigProvider locale={zh_CN}>
                <BrowserRouter>
                    <App>
                        <Suspense fallback={<Spin spinning={true} style={{width:'100vw',height:'100vh',lineHeight:'100vh'}}></Spin>}>
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
                        </Suspense>
                    </App>
                </BrowserRouter>
            </ConfigProvider>
        );
    }
}