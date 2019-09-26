import HttpClient from '../Http';
class AudioHttp {
    public static instance: AudioHttp = new AudioHttp();
    constructor() {
        // 
    }
    /**
     * 获取音乐 url
     * @param id  歌曲id
     */
    public async getMusicUrl(id:string): Promise<any> {
        const data = await HttpClient.init('/song/url?id='+ id, { method: "get" })
            .then((res: any) => Promise.resolve(res))
            .catch((err: Error) => Promise.reject(err))
        return data;
    }
    
    /**
     * 搜索音乐
     * @param key 关键字
     */
    public async search(key: string): Promise<any> {
        return await HttpClient.init(`/search?keywords=${key}`,{method: 'get'})
            .then((res: any) => Promise.resolve(res))
            .catch((err: Error) => Promise.reject(err))
    }
}
export default AudioHttp.instance;