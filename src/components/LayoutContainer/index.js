import React from 'react';
import {Spin} from 'antd';

export const Container = (mapStateToProps) => WrappedComponent => {
    class Container extends React.Component {
        state = {
            loading: true
        }

        setLoading = (loading) => {
            this.setState({
                loading
            })
        }

        render() {
            let stateProps = mapStateToProps({
                loading: true
            });
            let allProps = {
                ...this.props,
                ...stateProps,
                setLoading:this.setLoading
            }
            return (
                <Spin spinning={this.state.loading}>
                    <WrappedComponent {...allProps}/>
                </Spin>
            )
        }
    }

    return Container;
}