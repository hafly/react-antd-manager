import React from 'react';
import {Layout, Breadcrumb} from 'antd';
import LayoutMenu from './components/LayoutMenu';
import LayoutHeader from './components/LayoutHeader';
import LayoutFooter from './components/LayoutFooter';
import {connect} from 'react-redux';
import './styles/admin.less';

const {Content} = Layout;

/**
 * admin页面
 */
class Admin extends React.Component {
    render() {
        return (
            <Layout>
                {/*目录*/}
                <LayoutMenu history={this.props.history}/>

                <Layout style={{minHeight: '100vh', overflowY: 'auto'}}>
                    {/*头部*/}
                    <LayoutHeader/>

                    {/*面包屑*/}
                    <Breadcrumb className="ant-breadcrumb">
                        {
                            this.props.breadcrumbList.map((item) => <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>)
                        }
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

const mapStateToProps = (state) => {
    return {
        breadcrumbList: state.breadcrumbList
    }
}

export default connect(mapStateToProps)(Admin);