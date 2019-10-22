const menuList = [
    {
        title: '首页',
        url: '/home'
    },
    {
        title: 'UI',
        url: '/ui',
        children: [
            {
                title: '按钮',
                url: '/ui/buttons',
            },
            {
                title: '弹框',
                url: '/ui/modals',
            },
            {
                title: 'Loading',
                url: '/ui/loadings',
            },
            {
                title: '通知提醒',
                url: '/ui/notification',
            },
            {
                title: '全局Message',
                url: '/ui/messages',
            },
            {
                title: 'Tab页签',
                url: '/ui/tabs',
            },
            {
                title: '图片画廊',
                url: '/ui/gallery',
            },
            {
                title: '轮播图',
                url: '/ui/carousel',
            }
        ]
    },
    {
        title: '表单',
        url: '/form',
        children: [
            {
                title: '登录',
                url: '/form/login',
            },
            {
                title: '注册',
                url: '/form/register',
            }
        ]
    },
    {
        title: '表格',
        url: '/table',
        children: [
            {
                title: '基础表格',
                url: '/table/basic',
            },
            {
                title: '高级表格',
                url: '/table/high',
            }
        ]
    },
    {
        title: '城市管理',
        url: '/city'
    },
    {
        title: '订单管理',
        url: '/order',
        btnList: [
            {
                title: '订单详情',
                url: '/order/detail'
            },
            {
                title: '结束订单',
                url: '/order/finish'
            }
        ]
    },
    {
        title: '员工管理',
        url: '/user'
    },
    {
        title: '车辆地图',
        url: '/bikeMap'
    },
    {
        title: '图表',
        url: '/chart',
        children: [
            {
                title: '柱形图',
                url: '/chart/bar'
            },
            {
                title: '折线图',
                url: '/chart/line'
            },
            {
                title: '饼图',
                url: '/chart/pie'
            },
        ]
    },
    {
        title: '富文本',
        url: '/rich'
    },
    {
        title: '权限设置',
        url: '/permission'
    },
];
export default menuList;