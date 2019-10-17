import  React, { useEffect, useState, useCallback } from 'react';
import "./SongList.scss";
import SongListHeader from './SongListHeader/SongListHeader';
import SongListBody from './SongListBody/SongListBody';

const SongList = () => {
    const [getName, setName] = useState<string>("全部"); // 选中歌单
    const choicName = useCallback((name: string) => {
        setName(name)
    },[])
    return (
        <div className="songListPage">
            <div className="songListBody">
                {/* 头部 */}
                <SongListHeader choicName={choicName}/>
                <SongListBody name={getName}/>
            </div>
        </div>
    );
}

export default SongList;
