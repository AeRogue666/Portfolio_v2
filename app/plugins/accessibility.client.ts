export default defineNuxtPlugin(() => {
    const store = useAccessibilityStore();

    store.apply()

    store.$subscribe(() => {
        store.apply()
    })
});