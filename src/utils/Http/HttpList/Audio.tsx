import HttpClient from '../Http';
class AudioHttp {
    public static instance: AudioHttp = new AudioHttp();
    constructor() {
        // 
    }
    // 获取音乐 url
    public async getMusicUrl(id:string): Promise<any> {
        const data = await HttpClient.init('/song/url?id='+ id, { method: "get" })
            .then((res: any) => Promise.resolve(res))
            .catch((err: Error) => Promise.reject(err))
        return data;
    }
}
export default AudioHttp.instance;