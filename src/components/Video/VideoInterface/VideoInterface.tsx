export interface GetVideoGroupType {
    data: GetVideoDataType[]
}

// 视频对象属性
export interface GetVideoObjType {
    muted: boolean,
    poster: string,
    preload: "auto" | "none" | "metadata"
}

interface GetVideoDataType {
    urlInfo: {
        url: string
    }
}