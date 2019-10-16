
import HttpClient from '../Http';


// 调用此接口, 可获取歌单分类, 包含 category 信息
export const PlaylistCatlist = async (): Promise<any> => {
    return await HttpClient.init("/playlist/catlist",{method: "post"})
            .then(res => res)
             
}