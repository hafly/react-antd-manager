/**
 * Reducer 数据处理
 */

import {type} from '../action';

const initialState = {
    breadcrumbList: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case type.SWITCH_MENU:
            return {
                ...state,
                breadcrumbList: action.breadcrumbList
            }
        default:
            return {
                ...state
            };
    }
}