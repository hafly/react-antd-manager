/**
 * Action 类型
 */

export const type = {
    SWITCH_MENU: 'SWITCH_MENU'
}

export function switchMenu(breadcrumbList) {
    return {
        type: type.SWITCH_MENU,
        breadcrumbList
    }
}