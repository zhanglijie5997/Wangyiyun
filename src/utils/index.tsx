/**
 * 防抖 
 * @param fn    回调用
 * @param time  防抖时间
 */
export const debounce = (fn: (event: any) => void, time: number) => {
    let timer: NodeJS.Timeout | null = null;
    // tslint:disable-next-line:only-arrow-functions
    return function () {
        const self  = debounce;
        const args = arguments;
        if(timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(() => {
            fn.apply(self, args)
        }, time)
    }
}

/**
 * 节流
 * @param fn    回掉函数s
 * @param time  节流时间
 */
export const throttle = (fn: (event: any) => void, time: number) => {
    let timer: NodeJS.Timeout | null= null;
    let lastTime: number = +new Date();
    // tslint:disable-next-line:only-arrow-functions
    return function () {
        const nowTime: number = +new Date();
        const args: IArguments = arguments;
        const context: any = throttle;
        if (nowTime - lastTime > time) {
            if(timer) {
                clearTimeout()
            };
            fn.apply(context, args);
            lastTime = +new Date();
        }else {
            if(!timer) {
                timer = setTimeout(() => {
                    fn.apply(context, args);
                    lastTime = +new Date();
                },time - (nowTime - lastTime))
            }
        }
    }
}

/**
 * Canvas高清分辨路显示模糊问题
 * @param context 屏幕大小
 */
export const canvasRatio = (context: any) => {
    const backingStore = context ? context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 1 : 1;
    return (window.devicePixelRatio || 1) / backingStore;
}