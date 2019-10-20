import React, { useEffect, useCallback, useState } from 'react'
import './SongListBody.scss'
import { TopPlaylist, TopPlaylistHighquality } from 'src/utils/Http/SongList/SongList';
import MusicList from '../../../../../components/MusicList/MusicList';
import  Pagination  from 'src/components/Pagination/Pagination';
import eventBus from 'src/components/EventBus/EventBus';

const SongListBody  = (props: {name: string , getHot: string}) => {
    const [getMusicListState, setMusicListState] = useState<[]>([]);// 分类音乐列表
    const [getPage, setPage] = useState<number>(0); // 分页
    const [getDefaultToal,setDefaultToal] = useState<number>(35); // 默认显示条数
    const [getNowChoicPage, setNowChoicPage] = useState<number>(1); // 选择的分页
    const [getUpdateTime, setUpdateTime] = useState<number>(0); // 最后一个列表的updateTime, 用于请求分页
    useEffect(() => {
        getChoicNameList(props.name, props.getHot);
        eventBus.On("type", busFn);
        return eventBus.Off("type")
    },[props.name, props.getHot]);

    const busFn = (msg: string) => {
      console.log(msg, 'msg')
    }

    /**
     * 歌单分类widget
     */
    const musicList: JSX.Element[] = getMusicListState.map((data, index: number) => {
        return (<li className="musicListBox" key={index}><MusicList item={data}  /></li>)
    });

  
    /**
     * 请求分类
     * @param name 请求分类名称
     */
    const getChoicNameList = useCallback(async(name: string, hot?: string) => {
            const data = await TopPlaylist(name, getDefaultToal , 'hot');
            const page: number = Math.ceil(data.total / getDefaultToal); // 分页
            setPage(page);
            console.log(page, ' 77');
            setMusicListState(data.playlists);
            console.log(data.playlists.slice(getDefaultToal - 1, getDefaultToal)[0].updateTime,'data.playlists.pop().updateTime');
            setUpdateTime(data.playlists.slice(getDefaultToal - 1, getDefaultToal)[0].updateTime);
    }, [getMusicListState, getUpdateTime]);
    /**
     * 请求分页
     * @param index 页码数
     */
    const changePagination = useCallback(async (index: number) => {
      console.log(index, `请求页码`);
      const data = await TopPlaylistHighquality(getDefaultToal, index, ) 
      setNowChoicPage(index)
    }, [getNowChoicPage]) 
  return (
    <div className="SongListBody">
        <ul>
          {musicList}
        </ul>
        <Pagination page={getPage} changePagination={changePagination}/>
    </div>
  )
}
export default SongListBody;
