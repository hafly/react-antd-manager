/**
 * 公共reducer
 */

const initialState = {
    breadcrumbList: []
}

export const baseReducer = function (state = initialState, action) {
    switch (action.type) {
        case 'base/updateBreadcrumb':
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