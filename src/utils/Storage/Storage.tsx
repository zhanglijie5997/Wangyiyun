class Storage {
    public static instance: Storage = new Storage();

    /**
     * SessionStorage
     * @param name     key   值
     * @param val      value 值
     * @example
     *      SessionStorage('test',{a:1})
     */
    public SessionStorage(name: string, val: any): void {
        const data: string = JSON.stringify(val);
        sessionStorage.setItem(name, data)
    }

    /**
     * 
     * @param name    key  值
     * @param val     value值
     * @example
     *      LocalStorage('test',{a:1})
     */
    public LocalStorage(name: string, val: any): void {
        const data: string = JSON.stringify(val);
        localStorage.setItem(name, data);
    }

    /**
     * SessionStorageRemove  移除临时存储的值
     * @params name     移除的key值
     * @example
     *      SessionStorageRemove("test")
     */
    public SessionStorageRemove(name: string): void {
        if (sessionStorage.getItem(name)) { sessionStorage.removeItem(name); }
    }

    /**
     * LocalStorageRemove 移除本地存储
     * @param name 移除元素的key值
     * @example 
     *      LocalStorageRemove("test")
     */
    public LocalStorageRemove(name: string): void {
        if (localStorage.getItem(name)) { localStorage.removeItem(name); }
    }

    /**
     * GetSessionStorage  获取临时存储
     * @param name 获取临时存储的key值
     */
    public GetSessionStorage(name: string): string | null {
        // tslint:disable-next-line:prefer-const
        return sessionStorage.getItem(name) ? sessionStorage.getItem(name) : null;

    }

    public GetLocalStorage(name: string): string | null {
        return localStorage.getItem(name) ? localStorage.getItem(name) : null
    }
}

export default Storage.instance;