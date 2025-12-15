import {ref, onMounted, onUnmounted, type Ref} from 'vue'

/**
 * 监听元素是否进入视口
 * @param target 目标元素的 Ref
 * @param options IntersectionObserver 配置项
 * @param options.rootMargin 视口边界扩充/收缩，用法同 CSS margin，例如 "100px" (提前100px触发) 或 "-50px" (进入50px后触发)
 * @param options.threshold 触发阈值，0.0-1.0，例如 0.5 表示元素一半进入视口时触发，1.0 表示完全进入视口时触发
 */
export function useInViewport(target: Ref<HTMLElement | null>, options: IntersectionObserverInit = {}) {
    const isInViewport = ref(false)
    let observer: IntersectionObserver | null = null

    onMounted(() => {
        if (target.value) {
            observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    isInViewport.value = entry.isIntersecting
                })
            }, options)
            observer.observe(target.value)
        }
    })

    onUnmounted(() => {
        if (observer) {
            observer.disconnect()
        }
    })

    return {isInViewport}
}
