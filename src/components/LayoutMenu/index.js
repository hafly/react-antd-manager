import React from 'react';
import {Layout, Menu} from 'antd';
import {NavLink} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {updateBreadcrumb} from "@/redux/action/baseAction";
import MenuConfig from '@/config/menuConfig';
import './index.less';

const Sider = Layout.Sider;
const SubMenu = Menu.SubMenu;

/**
 * 菜单组件
 */
@connect(
    () => ({}), // 第一个参数是state
    (dispatch) => bindActionCreators({updateBreadcrumb}, dispatch)
)
class LayoutMenu extends React.Component {
    state = {
        menuTreeNode: []
    };

    breadcrumbList = [];
    openKeys = [];

    componentWillMount() {
        const menuTreeNode = this.renderMenu(MenuConfig);
        this.setState({
            menuTreeNode
        });
        this.props.updateBreadcrumb(this.breadcrumbList);

        // 等同于
        // const {dispatch} = this.props;
        // dispatch(updateBreadcrumb(this.breadcrumbList));
        // dispatch({
        //     type: 'base/updateBreadcrumb',
        //     breadcrumbList: this.breadcrumbList
        // })
    }

    handleClick = ({item}) => {
        this.breadcrumbList = [];
        this.breadcrumbList.push(item.props.title);
        this.getParentName(item.props);
        this.props.updateBreadcrumb(this.breadcrumbList);
    }

    getParentName(item) {
        if (item.parentMenu.isRootMenu === false) {
            this.breadcrumbList.unshift(item.parentMenu.props.title);
            this.getParentName(item.parentMenu.props);
        }
    }

    // 构造目录
    renderMenu(data) {
        return data.map((item) => {
            if (this.props.history.location.pathname.indexOf(item.url) !== -1) {
                this.breadcrumbList.push(item.title);
                this.openKeys.push(item.url);
            }
            if (item.children) {
                return (
                    <SubMenu title={item.title} key={item.url}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return <Menu.Item title={item.title} key={item.url}>
                <NavLink to={item.url}>{item.title}</NavLink>
            </Menu.Item>
        });
    }

    render() {
        return (
            <Sider className="ant-layout-menu-sider" width={256}>
                <div className="ant-layout-logo">
                    <img src="/assets/logo-ant.svg" alt=""/>
                    <h1>Ant Design</h1>
                </div>
                <Menu theme="light"
                      mode="inline"
                      defaultSelectedKeys={this.props.history.location.pathname}
                      defaultOpenKeys={this.openKeys}
                      onClick={this.handleClick}>
                    {this.state.menuTreeNode}
                </Menu>
            </Sider>
        )
    }
}

export default LayoutMenu;