import * as React from 'react';
import "./SongList.scss";
import SongListHeader from './SongListHeader/SongListHeader';
const SongList = () => {
    return (
        <div className="songListPage">
            <div className="songListBody">
                {/* 头部 */}
                <SongListHeader />
            </div>
        </div>
    );
}

export default SongList;
