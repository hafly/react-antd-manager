import React from 'react';
import {Card, Button, Radio, Icon} from 'antd';
import './ui.less';

export default class pageButton extends React.Component {
    state = {
        loading: true,
        size: 'default'
    }

    handleChangeLoading = (loading) => {
        this.setState({
            loading: loading
        })
    }

    handleRadioChange = (e) => {
        this.setState({
            size: e.target.value
        })
    }

    render() {
        return (
            <div>
                <Card title="基础按钮" className="card-wrap">
                    <Button type="primary">Primary</Button>
                    <Button>Default</Button>
                    <Button type="dashed">Dashed</Button>
                    <Button type="danger">Danger</Button>
                    <Button type="link">Link</Button>
                    <Button disabled>Disabled</Button>
                </Card>
                <Card title="图形按钮" className="card-wrap">
                    <Button icon="plus">创建</Button>
                    <Button icon="edit">编辑</Button>
                    <Button icon="delete">删除</Button>
                    <Button shape="circle" icon="search"></Button>
                    <Button type="primary" icon="search">搜索</Button>
                    <Button type="primary" icon="download">下载</Button>
                </Card>
                <Card title="Loading按钮" className="card-wrap">
                    <Button type="primary" loading={this.state.loading}>确定</Button>
                    <Button type="primary" shape="circle" loading={this.state.loading}></Button>
                    <Button loading={this.state.loading} onClick={() => this.handleChangeLoading(true)}>点击加载</Button>
                    <Button type="primary" onClick={() => this.handleChangeLoading(false)}>关闭</Button>
                </Card>
                <Card title="按钮组" style={{marginBottom: 10}}>
                    <Button.Group>
                        <Button type="primary" icon="left">返回</Button>
                        <Button type="primary">前进<Icon type="right"/></Button>
                    </Button.Group>
                </Card>
                <Card title="基础尺寸" className="card-wrap">
                    <Radio.Group value={this.state.size} onChange={this.handleRadioChange}>
                        <Radio value="small">小</Radio>
                        <Radio value="default">中</Radio>
                        <Radio value="large">大</Radio>
                    </Radio.Group>
                    <Button type="primary" size={this.state.size}>Primary</Button>
                    <Button size={this.state.size}>Default</Button>
                    <Button type="dashed" size={this.state.size}>Dashed</Button>
                    <Button type="danger" size={this.state.size}>Danger</Button>
                </Card>
            </div>
        )
    }
}