import JsonP from 'jsonp';
import axios from 'axios';
import {Modal} from 'antd';

export default class Axios {
    // 封装jsonp
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

    static ajax(options) {
        let baseURL = 'https://www.easy-mock.com/mock/5d607b15bf22c858eca714cb/manager';
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
                        resolve(res.data);
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
            })
        });
    }
}