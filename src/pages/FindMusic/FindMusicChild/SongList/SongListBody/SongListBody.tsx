import React, { useEffect, useCallback, useState } from 'react'
import './SongListBody.scss'
import { TopPlaylist } from 'src/utils/Http/SongList/SongList';
import MusicList from '../../../../../components/MusicList/MusicList';
const SongListBody  = (props: {name: string}) => {
    const [getMusicListState, setMusicListState] = useState<[]>([]);// 分类音乐列表
    useEffect(() => {
        getChoicNameList(props.name)
    },[]);
    // 歌单分类widget
    const musicList: JSX.Element[] = getMusicListState.map((data, index: number) => {
        return <MusicList item={data} key={index} />
    })
    const getChoicNameList = useCallback(async(name: string) => {
            const data = await TopPlaylist(name);
            setMusicListState(data.playlists)
    }, [getMusicListState])
  return (
    <div className="SongListBody">
        {musicList}
    </div>
  )
}
export default SongListBody;
