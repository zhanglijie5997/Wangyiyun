export interface MusicListType {
    item: { 
        playCount: number, 
        picUrl: string, 
        name: string,
        creator: {
            backgroundUrl: string
        } 
    }
}