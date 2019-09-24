import React from 'react';
import {Form, Input, Select, DatePicker, Button} from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const FormItem = Form.Item;
const Option = Select.Option;
const {RangePicker} = DatePicker;

class BaseForm extends React.Component {
    // 构建表单
    initFormList() {
        const {getFieldDecorator} = this.props.form;
        const formList = this.props.formList;
        const formItemList = [];

        if (formList && formList.length > 0) {
            formList.forEach((item) => {
                let label = item.label;
                let field = item.field;
                let initialValue = item.initialValue || '';
                let width = item.width;

                if (item.type === 'input') {
                    const input =
                        <FormItem label={label} key={field}>
                            {
                                getFieldDecorator(field, {
                                    initialValue: initialValue
                                })(
                                    <Input type="text" placeholder={item.placeholder}/>
                                )
                            }
                        </FormItem>
                    formItemList.push(input);
                }
                else if (item.type === 'select') {
                    const select =
                        <FormItem label={label} key={field}>
                            {
                                getFieldDecorator(field, {
                                    initialValue: initialValue
                                })(
                                    <Select placeholder={item.placeholder} style={{width: width}}>
                                        {this.getOptionList(item.list)}
                                    </Select>
                                )
                            }
                        </FormItem>
                    formItemList.push(select);
                }
                else if (item.type === 'doubleDay') {
                    const doubleDay =
                        <FormItem label={label} key='doubleDay'>
                            {
                                getFieldDecorator('defualtTime', {
                                    initialValue: initialValue
                                })(
                                    <RangePicker/>
                                )
                            }
                        </FormItem>
                    formItemList.push(doubleDay);
                }
            })
        }

        return formItemList;
    }

    // 构建下拉选项
    getOptionList(data) {
        return data.map((item) => {
            return <Option value={item.id} key={item.id}>{item.name}</Option>
        });
    }

    // 提交
    handleFormSubmit = () => {
        let fieldsValue = this.props.form.getFieldsValue();
        this.props.formSubmit(fieldsValue);
    }

    // 重置
    reset = () => {
        this.props.form.resetFields();
    }

    render() {
        return (
            <Form layout="inline">
                {this.initFormList()}
                <FormItem>
                    <Button type="primary" style={{margin: '0 20px'}} onClick={this.handleFormSubmit}>查询</Button>
                    <Button onClick={this.reset}>重置</Button>
                </FormItem>
            </Form>
        )
    }
}

export default Form.create()(BaseForm);