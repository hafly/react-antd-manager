import React from 'react';
import {Card, Button, Modal} from 'antd';
import './ui.less';

export default class Modals extends React.Component {
    state = {
        showModal1: false,
        showModal2: false,
        showModal3: false,
        showModal4: false
    }

    handleModal = (type, open = true) => {
        this.setState({
            [type]: open
        })
    }

    handleConfirm = (type) => {
        Modal[type]({
            title: '确认',
            content: '你确定学会了React了吗？',
            onOk() {
                console.log('Ok')
            },
            onCancel() {
                console.log('Cancel')
            }
        });
    }

    render() {
        return (
            <div>
                <Card title="基础模态框" className="card-wrap">
                    <Button type="primary" onClick={() => this.handleModal('showModal1', true)}>Open</Button>
                    <Button type="primary" onClick={() => this.handleModal('showModal2', true)}>自定义页脚</Button>
                    <Button type="primary" onClick={() => this.handleModal('showModal3', true)}>顶部20px弹框</Button>
                    <Button type="primary" onClick={() => this.handleModal('showModal4', true)}>水平垂直居中</Button>
                </Card>
                <Modal title="Open"
                       visible={this.state.showModal1}
                       onCancel={() => this.handleModal('showModal1', false)}>
                    <p>欢迎学习React课程</p>
                </Modal>
                <Modal title="自定义页脚"
                       visible={this.state.showModal2}
                       okText="下一步"
                       cancelText="算了"
                       onCancel={() => this.handleModal('showModal2', false)}>
                    <p>欢迎学习React课程</p>
                </Modal>
                <Modal title="顶部20px弹框"
                       visible={this.state.showModal3}
                       onCancel={() => this.handleModal('showModal3', false)}
                       style={{top: 20}}
                >
                    <p>欢迎学习React课程</p>
                </Modal>
                <Modal title="水平垂直居中"
                       visible={this.state.showModal4}
                       onCancel={() => this.handleModal('showModal4', false)}
                       wrapClassName="vertical-center-modal"
                >
                    <p>欢迎学习React课程</p>
                </Modal>

                <Card title="信息确认框" className="card-wrap">
                    <Button type="primary" onClick={() => this.handleConfirm('confirm')}>Confirm</Button>
                    <Button type="primary" onClick={() => this.handleConfirm('info')}>Info</Button>
                    <Button type="primary" onClick={() => this.handleConfirm('success')}>Success</Button>
                    <Button type="primary" onClick={() => this.handleConfirm('error')}>Error</Button>
                    <Button type="primary" onClick={() => this.handleConfirm('warning')}>Warning</Button>
                </Card>
            </div>
        )
    }
}