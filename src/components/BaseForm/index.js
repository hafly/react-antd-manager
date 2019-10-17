import React from 'react';
import {Form, Input, Select, DatePicker, Button} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const {RangePicker} = DatePicker;

/**
 * 查询表单
 */
class BaseForm extends React.Component {
    // 构建表单
    initFormList() {
        const {getFieldDecorator} = this.props.form;
        const formList = this.props.formList;
        const formItemList = [];

        if (formList && formList.length > 0) {
            formList.forEach((item) => {
                let field = item.field; // 表单元素name（必要）
                let label = item.label || '';
                let initialValue = item.initialValue || '';
                let width = item.width || 'auto';

                // 输入框
                if (item.type === 'Input') {
                    const formItem =
                        <FormItem label={label} key={field}>
                            {
                                getFieldDecorator(field, {
                                    initialValue: initialValue
                                })(
                                    <Input type="text" placeholder={item.placeholder} style={{width: width}}/>
                                )
                            }
                        </FormItem>
                    formItemList.push(formItem);
                }
                // 下拉选项
                else if (item.type === 'Select') {
                    const formItem =
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
                    formItemList.push(formItem);
                }
                // 日期选择
                else if (item.type === 'DatePicker') {
                    const formItem =
                        <FormItem label={label} key={field}>
                            {
                                getFieldDecorator(field, {
                                    initialValue: initialValue || null
                                })(
                                    <DatePicker placeholder={item.placeholder} style={{width: width}}/>
                                )
                            }
                        </FormItem>
                    formItemList.push(formItem);
                }
                // 日期段选择
                else if (item.type === 'RangePicker') {
                    const formItem =
                        <FormItem label={label} key={field}>
                            {
                                getFieldDecorator(field, {
                                    initialValue: initialValue || null
                                })(
                                    <RangePicker style={{width: width}}/>
                                )
                            }
                        </FormItem>
                    formItemList.push(formItem);
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