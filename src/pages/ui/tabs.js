import React from 'react';
import {Card, Tabs, message, Icon} from 'antd';
import './ui.less';

const {TabPane} = Tabs;
export default class myTabs extends React.Component {
    newTabIndex = 0;

    componentWillMount() {
        const panes = [{
            title: 'Tab 1',
            content: '欢迎学习React课程1',
            key: '1'
        }, {
            title: 'Tab 2',
            content: '欢迎学习React课程2',
            key: '2'
        }, {
            title: 'Tab 3',
            content: '欢迎学习React课程3',
            key: '3'
        }];
        this.setState({
            activeKey: panes[0].key,
            panes
        });
    }

    callback = (key) => {
        message.info('你点击了标签key：' + key);
    }

    onChange = (activeKey) => {
        this.setState({
            activeKey
        })
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    add = () => {
        const {panes} = this.state;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({title: 'New Tab', content: 'Content of new Tab', key: activeKey});
        this.setState({panes, activeKey});
    };

    remove = (targetKey) => {
        let {activeKey} = this.state;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = panes[lastIndex].key;
            } else {
                activeKey = panes[0].key;
            }
        }
        this.setState({panes, activeKey});
    };

    render() {
        return (
            <div>
                <Card title="Tabs标签页" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab="Tab 1" key="1">欢迎学习React课程1</TabPane>
                        <TabPane tab="Tab 2" key="2">欢迎学习React课程2</TabPane>
                        <TabPane tab="Tab 3" key="3">欢迎学习React课程3</TabPane>
                    </Tabs>
                </Card>
                <Card title="有图标的标签页" className="card-wrap">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab={<span><Icon type="plus"/>Tab 1</span>} key="1">欢迎学习React课程1</TabPane>
                        <TabPane tab={<span><Icon type="edit"/>Tab 2</span>} key="2" disabled>欢迎学习React课程2</TabPane>
                        <TabPane tab={<span><Icon type="delete"/>Tab 3</span>} key="3">欢迎学习React课程3</TabPane>
                    </Tabs>
                </Card>
                <Card title="新增和关闭页签" className="card-wrap">
                    <Tabs activeKey={this.state.activeKey}
                          type="editable-card"
                          onChange={this.onChange}
                          onEdit={this.onEdit}
                    >
                        {
                            this.state.panes.map((item) => {
                                return <TabPane tab={item.title} key={item.key}>{item.content}</TabPane>
                            })
                        }
                    </Tabs>
                </Card>
            </div>
        )
    }
}