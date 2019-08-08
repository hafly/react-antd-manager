import React from 'react';
import Child from './Child';
import { Button } from 'antd';
import './index.less';

export default class Life extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }

  handAdd() {
    this.setState({
      count: this.state.count + 1
    })
  }

  render() {
    return (
      <div className="content">
        <h3>React生命周期介绍</h3>
        <Button onClick={this.handAdd.bind(this)}>点击一下</Button>
        <p>{this.state.count}</p>
        <Child name="Jack" num={this.state.count}/>
      </div>
    )
  }
}