import React from 'react';
import {Layout, Breadcrumb} from 'antd';
import LayoutMenu from './components/LayoutMenu';
import LayoutHeader from './components/LayoutHeader';
import LayoutFooter from './components/LayoutFooter';
import './styles/admin.less';

const {Content} = Layout;

export default class Admin extends React.Component {
    render() {
        return (
            <Layout>
                {/*目录*/}
                <LayoutMenu/>

                <Layout style={{minHeight: '100vh', overflowY: 'auto'}}>
                    {/*头部*/}
                    <LayoutHeader/>

                    {/*面包屑*/}
                    <Breadcrumb className="ant-breadcrumb">
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>

                    {/*主要内容*/}
                    <Content className="ant-layout-content">
                        {this.props.children}
                    </Content>

                    {/*底部*/}
                    <LayoutFooter/>
                </Layout>
            </Layout>
        );
    }
}