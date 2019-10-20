export interface MusicListType {
    item: { 
        playCount: number, 
        picUrl: string, 
        name: string,
        coverImgUrl: string,
        creator: {
            backgroundUrl: string
        } 
    }
}