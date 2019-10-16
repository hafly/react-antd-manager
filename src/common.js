import React from 'react';
import {Row} from 'antd';
import LayoutHeader from './components/LayoutHeader';
import './styles/common.less';

/**
 * common页面
 */
export default class Common extends React.Component {
    render() {
        return (
            <div className="simple-page">
                <Row>
                    <LayoutHeader menuType="second"/>
                </Row>
                <Row className="ant-layout-content">
                    {this.props.children}
                </Row>
            </div>
        )
    }
}