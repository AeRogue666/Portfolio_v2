export default defineNuxtRouteMiddleware((to) => {
    if(import.meta.env.NODE_ENV && to.path.startsWidth("/admin")) {
        return abortNavigation();
    }
});