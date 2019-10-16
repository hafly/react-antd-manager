import React from 'react';
import {Table} from 'antd';

/**
 * 基础表格
 * 将selectedRowKeys封装在内部
 */
export default class BaseTable extends React.Component {
    state = {
        selectedRowKeys: []
    }

    onRadioSelect = (selectedRowKeys) => {
        this.setState({
            selectedRowKeys
        })
    }

    onCheckboxChange = (selectedRowKeys) => {
        this.setState({
            selectedRowKeys
        })
    }

    render() {
        let rowSelection = null;
        if (this.props.type === 'radio') {
            rowSelection = {
                type: 'radio',
                selectedRowKeys: this.state.selectedRowKeys,
                onSelect: (selectedRows) => {
                    this.onRadioSelect([selectedRows.key]);
                    this.props.onSelect(selectedRows);
                }
            }
        }
        else if (this.props.type === 'checkbox') {
            rowSelection = {
                type: 'checkbox',
                selectedRowKeys: this.state.selectedRowKeys,
                onChange: (selectedRowKeys, selectedRows) => {
                    this.onCheckboxChange(selectedRowKeys);
                    this.props.onChange(selectedRows);
                }
            }
        }

        return (
            <Table
                {...this.props}
                rowSelection={rowSelection}
            />
        )
    }
}