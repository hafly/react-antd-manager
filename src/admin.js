import React from 'react';
import {Layout,Breadcrumb} from 'antd';
import LayoutMenu from './components/LayoutMenu';
import LayoutHeader from './components/LayoutHeader';
import './admin.less';

const {Content} = Layout;

export default class Admin extends React.Component {

    render() {
        return (
            <Layout>
                {/*目录*/}
                <LayoutMenu/>

                <Layout>
                    {/*头部*/}
                    <LayoutHeader/>

                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>

                    {/*主要内容*/}
                    <Content className="ant-layout-content">
                        Content
                    </Content>
                </Layout>

            </Layout>
        );
    }
}