/**
 * EventBus 事件监听
 */

type MapArgsType = string | [] | object | symbol | null | undefined;
interface MapArgs {
    [key: string]: () => MapArgsType
}
class EventBus {
    public static instance: EventBus = new EventBus();
    private eventsMap: Map<string, MapArgs[]>;
    constructor() {
        this.eventsMap = new Map()
    }
    /**
     * 注册事件
     * @param name 事件名称
     * @param args 事件参数, 可选参数
     */
    public Emit(name: string , args?: any):void {
        if(toString.call(args) === "[object Funcction]") {
            throw TypeError(`args type is Function, don't use Function`)
        }
        this.eventsMap.set(name, args);
    }

    /**
     * 获取事件
     * @param name 事件名称
     * @param fn 
     */
    public On(name: string, fn: (args: any) => void): void {
        const getNameFn = this.eventsMap.get(name);
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