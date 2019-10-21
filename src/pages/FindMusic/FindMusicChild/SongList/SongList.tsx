import  React, { useEffect, useState, useCallback } from 'react';
import "./SongList.scss";
import loadable from "@loadable/component";
const SongListHeader = loadable(() => import("./SongListHeader/SongListHeader"));
const SongListBody = loadable(() => import("./SongListBody/SongListBody"));

// import SongListHeader from './SongListHeader/SongListHeader';
// import SongListBody from './SongListBody/SongListBody';

const SongList = () => {
    const [getName, setName] = useState<string>("全部"); // 选中歌单
    const [getHot, setHot] = useState<string>(""); // 热门
    const choicName = useCallback((name: string, hot?: string) => {
        setName(name);
        setHot(hot!)
    },[])
    return (
        <div className="songListPage">
            <div className="songListBody">
                {/* 头部 */}
                <SongListHeader choicName={choicName} />
                <SongListBody name={getName} getHot={getHot}/>
            </div>
        </div>
    );
}

export default SongList;
