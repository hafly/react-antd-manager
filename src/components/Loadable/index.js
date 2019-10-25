import React from 'react'
import Loadable from 'react-loadable'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

class LoadingPage extends React.Component {
    componentWillMount(){
        // 页面顶部加载进度条
        NProgress.start()
    }
    componentWillUnmount(){
        NProgress.done()
    }
    render () {
        return (
            <div/>
        )
    }
}

const LoadableComponent = (component) => {
    return Loadable({
        loader: component,
        loading: ()=><LoadingPage/>
    })
}

export default LoadableComponent;