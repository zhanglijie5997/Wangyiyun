export default class HttpStatus {
    public httpStatusList:Map<(string | number),any>;
    constructor(data:any) {
        this.httpStatusList = new Map([
            [200 || '200',() => data]
        ]);
    }
    /**
     * 状态码
     * @param status 状态码
     */
    public init(data:any):(() => any)|undefined {
        // console.log(data,'data')
        return this.httpStatusList.get(data.code)();
    }
}
