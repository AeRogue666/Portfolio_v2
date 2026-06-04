export function useDebounceFn(fn: Function, delay = 500) {
    let timeout: ReturnType<typeof setTimeout> | null = null

    return (...args: any[]) => {
        if(timeout) clearTimeout(timeout)

            timeout = setTimeout(() => {
                fn(...args)
            }, delay)
    }
}