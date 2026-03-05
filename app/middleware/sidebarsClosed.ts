export default defineNuxtRouteMiddleware((to) => {
    setPageLayout('index-header', {
        sidebarLeftOpen: false,
        sidebarRightOpen: false,
    })
})