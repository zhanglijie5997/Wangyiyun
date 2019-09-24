class EventBus {
    private events: any = null;
    constructor() {
        this.events = this.events || new Object();
    }
    public $emit(type: string, ...args: any): void {
        let e;
        e = this.events[type];
        // 查看这个type的event有多少个回调函数，如果有多个需要依次调用。
        if (Array.isArray(e)) {
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < e.length; i++) {
                // cc.log(e[i], 'hhh')
                e[i].apply(this, args);
            }
        } else {
            e[0].apply(this, args);
        }
    }

    public $on(type: string, fun: () => any) {

        const e = this.events[type];


        if (!e) {   // 如果从未注册过监听函数，则将函数放入数组存入对应的键名下
            this.events[type] = [fun];

        } else {  // 如果注册过，则直接放入
            e.push(fun);
        }
    }

    public $off(type: string, fun: () => any) {
        // const e = this.events[type];
        const KEY = Object.keys(this.events);
        let slice1: string;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < KEY.length; i++) {
            if (KEY[i] === type) {
                // cc.log(KEY[i], '5555');
                slice1 = KEY[i];
                delete (this.events[slice1])
            }
        }
       
    }

}

const eventBus = new EventBus();

export default eventBus;