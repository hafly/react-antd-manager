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
        let baseURL = ' http://127.0.0.1:7300/mock/5d761d1bf44f481c68a6282d/manager';
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
            })
        });
    }
}