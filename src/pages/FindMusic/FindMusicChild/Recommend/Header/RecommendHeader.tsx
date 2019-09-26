import * as React from 'react';
import "./RecommendHeader.scss";

import Swiper from "../../../../../components/Swiper/Swiper";


import banner0 from "../../../../../static/img/banner1.jpeg";
import banner1 from "../../../../../static/img/banner2.jpeg";
import banner2 from "../../../../../static/img/banner3.jpeg";
import banner3 from "../../../../../static/img/banner4.jpeg";
// 下载图片
import download from "../../../../../static/img/download.png";

// import Swiper from '../../../../../utils/Swiper/swiper.d';
// banner 轮播背景图
const bannerBgList = [
    {
        id: 0,
        name: banner0,
    },
    {
        id: 1,
        name: banner1,
    },
    {
        id: 2,
        name: banner2,
    },
    {
        id: 3,
        name: banner3,
    },
    {
        id: 4,
        name: banner0,
    },
]

interface IPropsType {
    banners: []
}

const RecommendHeader =  (props: IPropsType): JSX.Element  => {
    const [states] = React.useState<number>(0);
    
    
    return (
        <div className="recommendHeader" style={{ background: `url(${bannerBgList[states].name}) repeat-x` }}>
            <div className="bannerWithDownload">
                <div className="bannerPosBox" >
                    {/* 轮播图 */}
                    {/* <ul className="bannerBox" style={{ width: `${5 * 100}%`, transform: `translate3d(-${states / 5 * 100}%,0,0)`, opacity: opacitys, transition: `all ${getTransition}s ease-in-out` }}>
                        {bannerList}
                    </ul> */}
                    <Swiper {...props}/>
                </div>
                {/* 下载 */}
                <div className="downLoad">
                    <img src={download} alt="" />
                </div>
                {/* 点击切换轮播 */}
                <button  className="left" />
                <button  className="right" />
                {/* 中间的点 */}
                <ul className="chointPointBox">
                    {/* {choicPoint} */}
                </ul>
            </div>

        </div>
    )
}
export default RecommendHeader;
