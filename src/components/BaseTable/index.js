import React from 'react';
import {Table} from 'antd';

export default class BaseTable extends React.Component {

    render() {
        let rowSelection = null;
        if (this.props.type === 'radio') {
            rowSelection = {
                type: 'radio',
                selectedRowKeys: this.props.selectedRowKeys,
                onSelect: (row) => {
                    this.props.onSelect(row);
                }
            }
        }
        else if (this.props.type === 'checkbox') {
            rowSelection = {
                type: 'checkbox',
                selectedRowKeys: this.props.selectedRowKeys,
                onChange: (selectedRowKeys, selectedRows) => {
                    this.props.onChange(selectedRowKeys, selectedRows);
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