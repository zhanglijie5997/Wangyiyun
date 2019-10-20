/**
 * EventBus 观察者模式事件监听
 */

type MapArgsType = string | [] | object | symbol | null | undefined;
export interface MapArgs {
    [key: string]:  MapArgsType 
}
class EventBus{
    public static instance: EventBus = new EventBus();
    private eventsMap: Map<string, MapArgsType[]>;
    // private eventsMap: Map<K, V>;
    constructor() {
        this.eventsMap = new Map()
    }
    /**
     * 注册事件
     * @param name 事件名称
     * @param args 事件参数, 可选参数
     * @example 
     *      ```js
     *      this.EventBus.Emit("changeName", "热门")
     *      ```
     */
    public Emit(name: string, args?: any):void {
        // console.log(toString.call(args), '888')
        if(toString.call(args) === "[object Function]") {
            throw TypeError(`args type is Function, don't use Function`)
        }
        this.eventsMap.set(name, args);
    }

    /**
     * 获取事件
     * @param name 事件名称
     * @param fn 
     */
    public On(name: string, fn: (args: MapArgsType) => void): void {

        const getNameFn: MapArgsType[] = this.eventsMap.get(name)!;
        const getNameFnType: string = toString.call(getNameFn);
        switch (getNameFnType) {
            case "[object Array]" :
            case "[object Object]":
                fn.apply(this, ...getNameFn)
                break;
            default:
                fn.call(this, getNameFn);
                break;
        }
    }

    public Off(name: string): void {
        this.eventsMap.delete(name)
    }
   
}
export default EventBus.instance;