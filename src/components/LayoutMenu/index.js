import React from 'react';
import {Layout, Menu} from 'antd';
import MenuConfig from '../../config/menuConfig';
import './index.less';

const Sider = Layout.Sider;
const SubMenu = Menu.SubMenu;
export default class LayoutMenu extends React.Component {
    state = {
        menuTreeNode: []
    };

    componentWillMount() {
        const menuTreeNode = this.renderMenu(MenuConfig);
        this.setState({
            menuTreeNode
        });
    }

    // 构造目录
    renderMenu(data) {
        return data.map((item) => {
            if (item.children) {
                return (
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return <Menu.Item title={item.title} key={item.key}>{item.title}</Menu.Item>
        });
    }

    render() {
        return (
            <Sider className="ant-layout-menu-sider" width={256}>
                <div className="ant-layout-logo">
                    <img src="/assets/logo-ant.svg" alt=""/>
                    <h1>Ant Design</h1>
                </div>
                <Menu theme="light" mode="inline">
                    {this.state.menuTreeNode}
                </Menu>
            </Sider>
        )
    }
}