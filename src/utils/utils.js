/**
 * 公共方法
 */
export default {
    /**
     * 格式化时间
     * @param time 时间戳
     * @param format 格式（yyyy-MM-dd或yyyy-MM-dd HH:mm:ss）
     * @returns {string}
     */
    formatDate(time, format = "yyyy-MM-dd HH:mm:ss") {
        if (!time) return '';
        let date = new Date(time);
        let o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "H+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds()
        };
        if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
            if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return format;
    },
    /**
     * 分页
     * @param data
     * @param callback
     */
    pagination(data, callback) {
        return {
            onChange: (current) => {
                callback(current)
            },
            current: data.page,
            size: data.size,
            total: data.total,
            showTotal: () => {
                return `共${data.total}条`;
            },
            showQuickJumper: true
        }
    }
}