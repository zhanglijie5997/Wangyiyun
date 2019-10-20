
import HttpClient from '../Http';


// 调用此接口, 可获取歌单分类, 包含 category 信息
export const PlaylistCatlist = async (): Promise<any> => {
    return await HttpClient.init("/playlist/catlist",{method: "post"})
            .then(res => res)
            .catch(err => err)
}

/**
 * 歌单
 * @param name  歌单名称
 * @param order 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
 */
export const TopPlaylist = async (name: string = "全部" , limit: number, order?: string): Promise<any> => {
    if(!order) {
        return await HttpClient.init(`/top/playlist?cat=${name}&limit=${limit}`,{method: "post"})
            .then(res => res)
            .catch(err => err)
    }
    return await HttpClient.init(`/top/playlist?cat=${name}&order=${order}&limit=${limit}`,{method: "post"})
            .then(res => res)
            .catch(err => err)
}
/**
 * 获取精品歌单分页
 * @param limit   显示数量
 * @param before  上一页最后一个更新事件
 * @param cat     分类
 */
export const TopPlaylistHighquality = async (limit: number, before: number, cat: string = "全部") => {
    // 
    const data = await HttpClient.init(`/top/playlist/highquality?before=${before}&cat=${cat}&limit=${limit}`,{method: "post"})
                .then(res => Object.freeze(res))
                .catch(err => err);
    return data;
}