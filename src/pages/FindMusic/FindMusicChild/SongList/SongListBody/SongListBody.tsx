import React, { useEffect, useCallback, useState } from 'react'
import './SongListBody.scss'
import { TopPlaylist } from 'src/utils/Http/SongList/SongList';
import MusicList from '../../../../../components/MusicList/MusicList';
import  Pagination  from 'src/components/Pagination/Pagination';

const SongListBody  = (props: {name: string , getHot: string}) => {
    const [getMusicListState, setMusicListState] = useState<[]>([]);// 分类音乐列表
    const [getPage, setPage] = useState<number>(0); // 分页
    useEffect(() => {
        getChoicNameList(props.name, props.getHot)
    },[props.name, props.getHot]);
    // 歌单分类widget
    const musicList: JSX.Element[] = getMusicListState.map((data, index: number) => {
        return (<li className="musicListBox" key={index}><MusicList item={data}  /></li>)
    });

  
    /**
     * 请求分类
     * @param name 请求分类名称
     */
    const getChoicNameList = useCallback(async(name: string, hot?: string) => {
            const data = await TopPlaylist(name, hot);
            const page: number = Math.ceil(data.total / 50); // 分页
            setPage(page);
            console.log(page, ' 77');
            setMusicListState(data.playlists)
    }, [getMusicListState]);
  return (
    <div className="SongListBody">
        <ul>
          {musicList}
        </ul>
        <Pagination page={getPage}/>
    </div>
  )
}
export default SongListBody;
