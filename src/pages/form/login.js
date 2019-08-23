import React from 'react';
import {Card, Form, Input, Button, Checkbox, Icon, message} from 'antd';
import './form.less';

const FormItem = Form.Item;

class pageLogin extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        let userInf = this.props.form.getFieldsValue();
        this.props.form.validateFields((err, value) => {
            if (!err) {
                message.success(`${userInf.userName}恭喜你，您通过本次表单组件学习，当前密码为：${userInf.userPwd}`);
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <div>
                <Card title="登陆行内表单" className="card-wrap">
                    <Form layout="inline">
                        <FormItem>
                            <Input placeholder="请输入用户名"/>
                        </FormItem>
                        <FormItem>
                            <Input placeholder="请输入密码"/>
                        </FormItem>
                        <FormItem>
                            <Button type="primary">登陆</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card title="登陆水平表单" className="card-wrap">
                    <Form onSubmit={this.handleSubmit} style={{width: 300}}>
                        <FormItem>
                            {
                                getFieldDecorator('userName', {
                                    initialValue: 'Jack',
                                    rules: [
                                        {required: true, message: '用户名不能为空'},
                                        {min: 5, max: 10, message: '用户名长度为5-10'},
                                        {pattern: /^\w+$/g, message: '用户名必须为字母或数字'}
                                    ]
                                })(
                                    <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                           placeholder="请输入用户名"/>
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('userPwd', {
                                    initialValue: '',
                                    rules: [
                                        {required: true, message: '密码不能为空'}
                                    ]
                                })(
                                    <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                           placeholder="请输入密码"/>
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true
                                })(
                                    <Checkbox>记住密码</Checkbox>
                                )
                            }
                            <a href="#/admin/home" style={{float: 'right'}}>忘记密码</a>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit">登陆</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default Form.create()(pageLogin);