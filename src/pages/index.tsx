
import loadable from "@loadable/component";
const Recommend = loadable(() => import("./FindMusic/FindMusicChild/Recommend/Recommend"));
const Friends = loadable(() => import("./Friends/Friends"));
const MusicDowload = loadable(() => import('./MusicDowload/MusicDowload'));
const MusicPeople = loadable(() => import("./MusicPeople/MusicPeople"));
const MusicShop = loadable(() => import("./MusicShop/MusicShop"));
const MyMusic = loadable(() => import("./MyMusic/MyMusic"));

import  PagesType  from '../components/Type/Type';

// 导出所有路由页面
export const list: PagesType[] = [
    // {   // 发现音乐
    //     classname: "findmusic",
    //     component: FindMusic,
    //     name:"发现音乐",
    //     to:"/FindMusic",
    // },
    {   // 发现音乐
        classname: "recommend",
        component: Recommend,
        name:"发现音乐",
        to:"/",
    },
    {   // 我的音乐
        classname: "mymusic",
        component: MyMusic,
        name: "我的音乐",
        to: "/MyMusic",
    },
    {   // 朋友
        classname: "friends",
        component: Friends,
        name: "朋友",
        to: "/Friends",
    },
    {   // 音乐商城
        classname: "musicshop",
        component: MusicShop,
        name: "商城",
        to: "/MusicShop",
    },
    {   // 音乐人
        classname: "musicpeople",
        component: MusicPeople,
        name: "音乐人",
        to: "/MusicPeople",
    },
    {   // 下载客户端
        classname: "musicdowload",
        component: MusicDowload,
        hot: true,
        name: "下载客户端",
        to: "/MusicDowload",
       
    },
]