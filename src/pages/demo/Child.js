import React from 'react';

export default class Child extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    componentWillMount() {
        console.log('will mount');
    }

    componentDidMount() {
        console.log('did mount');
    }

    // componentWillReceiveProps(newProps) {
    //     console.log('will receive props');
    //     console.log(newProps);
    // }

    // shouldComponentUpdate() {
    //     console.log('should update');
    //     return true
    // }

    componentWillUpdate() {
        console.log('will update')
    }

    componentDidUpdate() {
        console.log('did update')
    }

    render() {
        return (
            <div>
                <p>{this.props.name}</p>
            </div>
        )

    }
}