import React from 'react';
import {Card, Spin, Icon, Alert, Switch} from 'antd';
import './ui.less';

export default class pageLoading extends React.Component {
    state = {loading: false}

    toggle = (value) => {
        console.log(value)
        this.setState({loading: value});
    }

    render() {
        const icon = <Icon type="loading" style={{fontSize: 24}}/>
        return (
            <div>
                <Card title="Spin用法" className="card-wrap">
                    <Spin size="small"/>
                    <Spin style={{margin: '0 10px'}}/>
                    <Spin size="large"/>
                    <Spin indicator={icon} style={{marginLeft: 10}}/>
                </Card>
                <Card title="内容遮罩" className="card-wrap">
                    <Alert message="React"
                           description="欢迎来到React高级实战课程"
                           type="info"/>
                    <Spin>
                        <Alert message="React"
                               description="欢迎来到React高级实战课程"
                               type="warning"/>
                    </Spin>
                    <Spin tip="加载中…">
                        <Alert message="React"
                               description="欢迎来到React高级实战课程"
                               type="warning"/>
                    </Spin>
                    <Spin indicator={icon} spinning={this.state.loading}>
                        <Alert message="React"
                               description="欢迎来到React高级实战课程"
                               type="warning"/>
                    </Spin>
                    <div style={{marginTop: 16}}>
                        Loading state：
                        <Switch checked={this.state.loading} onChange={this.toggle}/>
                    </div>
                </Card>
            </div>
        )
    }
}