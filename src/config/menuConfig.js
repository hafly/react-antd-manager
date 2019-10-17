const menuList = [
    {
        title: '首页',
        url: '/admin/home'
    },
    {
        title: 'UI',
        url: '/ui',
        children: [
            {
                title: '按钮',
                url: '/admin/ui/buttons',
            },
            {
                title: '弹框',
                url: '/admin/ui/modals',
            },
            {
                title: 'Loading',
                url: '/admin/ui/loadings',
            },
            {
                title: '通知提醒',
                url: '/admin/ui/notification',
            },
            {
                title: '全局Message',
                url: '/admin/ui/messages',
            },
            {
                title: 'Tab页签',
                url: '/admin/ui/tabs',
            },
            {
                title: '图片画廊',
                url: '/admin/ui/gallery',
            },
            {
                title: '轮播图',
                url: '/admin/ui/carousel',
            }
        ]
    },
    {
        title: '表单',
        url: '/form',
        children: [
            {
                title: '登录',
                url: '/admin/form/login',
            },
            {
                title: '注册',
                url: '/admin/form/register',
            }
        ]
    },
    {
        title: '表格',
        url: '/table',
        children: [
            {
                title: '基础表格',
                url: '/admin/table/basic',
            },
            {
                title: '高级表格',
                url: '/admin/table/high',
            }
        ]
    },
    {
        title: '城市管理',
        url: '/admin/city'
    },
    {
        title: '订单管理',
        url: '/admin/order',
        btnList: [
            {
                title: '订单详情',
                url: '/admin/order/detail'
            },
            {
                title: '结束订单',
                url: '/admin/order/finish'
            }
        ]
    },
    {
        title: '员工管理',
        url: '/admin/user'
    },
    {
        title: '车辆地图',
        url: '/admin/bikeMap'
    },
    {
        title: '图表',
        url: '/admin/chart',
        children: [
            {
                title: '柱形图',
                url: '/admin/chart/bar'
            },
            {
                title: '折线图',
                url: '/admin/chart/line'
            },
            {
                title: '饼图',
                url: '/admin/chart/pie'
            },
        ]
    },
    {
        title: '富文本',
        url: '/admin/rich'
    },
    {
        title: '权限设置',
        url: '/admin/permission'
    },
];
export default menuList;