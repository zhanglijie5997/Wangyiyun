import HttpClient from '../Http';
class IndexHttp {
    public static instance:IndexHttp = new IndexHttp();
    constructor() {
        // 
    }
    // banner数据
    public async banner():Promise<any> {
        const data = await HttpClient.init('/banner',{method:"get"})
        .then((res:any) => Promise.resolve(res))
        .catch((err:Error) => Promise.reject(err))
        return data;
    }

    // 热门歌单分类
    public async hotMusicList():Promise<any> {
        const data = await HttpClient.init('/playlist/hot',{method:'get'})
        .then((res:any) => Promise.resolve(res))
        .catch((err:Error) => Promise.reject(err))
        return data;
    }
}
export default IndexHttp.instance;