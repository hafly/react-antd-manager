import React from 'react';
import {Card, Form, Table, Button, Spin, Modal, message} from 'antd';
import BaseForm from '../../components/BaseForm';
import moment from 'moment';
import axios from '../../utils/axios';
import utils from '../../utils/utils';

export default class User extends React.Component {
    formList = [
        {
            type: 'Input',
            label: '用户名',
            field: 'user_name',
            width: 100,
            placeholder: '请输入用户名',
            initialValue: ''
        },
        {
            type: 'Input',
            label: '用户手机号',
            field: 'user_mobile',
            width: 100,
            placeholder: '请输入用户手机号',
            initialValue: ''
        },
        {
            type: 'DatePicker',
            label: '请选择入职日期',
            field: 'user_date',
            width: 100,
            placeholder: '请输入日期',
            initialValue: ''
        }
    ]

    handleFormSubmit = () => {

    }

    render() {
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} formSubmit={this.handleFormSubmit}></BaseForm>
                </Card>
            </div>
        )
    }
}