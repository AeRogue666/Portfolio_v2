export default defineNuxtRouteMiddleware((to) => {
    setPageLayout('index-header', {
        sidebarLeftOpen: true,
        sidebarRightOpen: false,
    })
})