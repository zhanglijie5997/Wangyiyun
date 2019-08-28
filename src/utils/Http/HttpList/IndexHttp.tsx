import HttpClient from '../Http';
class IndexHttp {
    public static instance:IndexHttp = new IndexHttp();
    constructor() {
        // 
    }
    // banner数据
    public async banner():Promise<any> {
        const data = await HttpClient.init('/banner',{
            data:'',
            method:"get"
        }).then((res:any) => {
            return Promise.resolve(res)
        }).catch((err:Error) => {
           return Promise.reject(err)
        })
        console.log(data,'banner数据')
        return data;
    }
}
export default IndexHttp.instance;