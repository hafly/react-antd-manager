import JsonP from 'jsonp';
import axios from 'axios';
import {Modal} from 'antd';

/**
 * 请求类封装
 */
export default class Axios {
    // jsonp请求
    static jsonp(options) {
        return new Promise((resolve, reject) => {
            JsonP(options.url, {
                param: 'callback'
            }, function (err, response) {
                if (response.status === 'success') {
                    resolve(response);
                }
                else {
                    reject(response.message);
                }
            })
        });
    }

    // ajax请求，后端返回格式要固定
    static ajax(options) {
        let baseURL = 'http://easymock.vr-seesee.com/mock/5d761d1bf44f481c68a6282d/manager';
        return new Promise((resolve, reject) => {
            axios({
                baseURL: baseURL,
                url: options.url,
                method: options.method || 'get',
                timeout: 5000,
                params: options.data || {},
            }).then((response) => {
                if (response.status === 200) {
                    let res = response.data
                    if (res.status === 1) {
                        resolve(res);
                    }
                    else {
                        Modal.error({
                            title: '提示',
                            content: res.message
                        })
                    }
                }
                else {
                    reject(response);
                }
            }).catch(function (error) {
                Modal.error({
                    title: '提示',
                    content: '请求失败'
                })
                console.error(error);
            })
        });
    }
}