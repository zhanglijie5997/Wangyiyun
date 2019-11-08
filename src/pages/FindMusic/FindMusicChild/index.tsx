import AnchorAudio from './AnchorAudio/AnchorAudio';
import Leaderboard from './Leaderboard/Leaderboard';
import NewDiscShelf from './NewDiscShelf/NewDiscShelf';
import Recommend from './Recommend/Recommend';
import Singer from './Singer/Singer';
import SongList from './SongList/SongList';

import PagesType from '../../../components/Type/Type';

const FindMusicList: PagesType[] =[
    {   // 推荐
        classname: "recommend",
        component: Recommend,
        name: "推荐",
        to: "/",
    },
    {   // 排行榜
        classname: "leaderboard",
        component: Leaderboard,
        name: "排行榜",
        to: "/Leaderboard",
    },
    {   // 歌单
        classname: "songList",
        component: SongList,
        name: "歌单",
        to: "/SongList",
    },
    {   // 主播电台
        classname: "anchorAudio",
        component: AnchorAudio,
        name: "主播电台",
        to: "/AnchorAudio",
    },
    {   // 歌手
        classname: "singer",
        component: Singer,
        name: "视频播放器",
        to: "/Singer",
    },
    {   // 新碟上架
        classname: "newDiscShelf",
        component: NewDiscShelf,
        name: "新碟上架",
        to: "/NewDiscShelf",
    },
] 

export default FindMusicList;
