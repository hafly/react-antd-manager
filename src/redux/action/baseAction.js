/**
 * Action 类型
 */

export function updateBreadcrumb(breadcrumbList) {
    return {
        type: 'base/updateBreadcrumb',
        breadcrumbList
    }
}