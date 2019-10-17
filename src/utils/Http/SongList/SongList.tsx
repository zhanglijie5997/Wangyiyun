
import HttpClient from '../Http';


// 调用此接口, 可获取歌单分类, 包含 category 信息
export const PlaylistCatlist = async (): Promise<any> => {
    return await HttpClient.init("/playlist/catlist",{method: "post"})
            .then(res => res)
}

/**
 * 歌单
 * @param name 歌单名称
 */
export const TopPlaylist = async (name: string = "全部"): Promise<any> => {
    return await HttpClient.init(`/top/playlist?cat=${name}`,{method: "post"})
            .then(res => res)
}