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
    // 热门歌手
    public async topArtists():Promise<any> {
        const data = await HttpClient.init('/top/artists',{method:'get'})
        .then((res: any) => Promise.resolve(res))
        .catch((err:Error) => Promise.reject(err))
        return data;
    }

    // 首页推荐接口
    public async personalized(limit: number): Promise<any> {
        return await HttpClient.init(`/personalized?limit=${limit}`,{method:'get'})
        .then((res: any) => Promise.resolve(res))
        .catch((err: Error) => Promise.reject(err))
    }
    // 新碟上架最新
    public async albumNewest(): Promise<any> {
        return await HttpClient.init("/album/newest",{method:'get'})
    }

    // 新碟上架板块
    public async topAlbum(limit: number = 10): Promise<any> {
        return await HttpClient.init(`/top/album?limit=${limit}`,{method:'get'})
    }
    /**
     * 排行榜
     * @param type 排行榜类型
     */
    public async topList(type: number): Promise<any> {
        return await HttpClient.init(`/top/list?idx=${type}`,{method: 'get'})
    }
}
export default IndexHttp.instance;