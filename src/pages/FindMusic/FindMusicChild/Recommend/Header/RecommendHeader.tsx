import * as React from 'react';
import "./RecommendHeader.scss";
import banner0 from "../../../../../static/img/banner1.jpeg";
import banner1 from "../../../../../static/img/banner2.jpeg";
import banner2 from "../../../../../static/img/banner3.jpeg";
import banner3 from "../../../../../static/img/banner4.jpeg";
// 下载图片
import download from "../../../../../static/img/download.png";
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
    }
]

interface IPropsType {
    banners: []
}

function RecommendHeader(props: IPropsType): JSX.Element {
    // 轮播图数量
    const [bannerNum, setBannerNum] = React.useState<number>(0)
    // 轮播图顺序
    const [states, setStates] = React.useState<number>(0);
    // 透明度
    const [opacitys, setOpacitys] = React.useState<number>(1);
    // 轮播图定时器,用于清除定时器
    const times: any = React.useRef(null);

    React.useEffect(() => {
        let length: number = 0;
        if (props.banners) {
            length = props.banners.length;
            // 给ul赋值宽度
            setBannerNum(length);
        };
        const time = setInterval(() => {
            // 轮播图轮播
            bannerIndexFn(states);
        }, 3000)
        return () => clearInterval(time)
    }, [states, bannerNum])

    // 清楚opcity 定时器
    React.useEffect(() => {
        return () => clearTimeout(times.current)
    }, [])

    /**
     * 点击切换轮播图按钮
     * @param choic 加还是减
     */
    const bannerIndex = (choic: number) => React.useCallback(() => {
        if(choic === 1) {
            
            setStates(states + 1);
            // console.log(states, 'state,---');
        }else if(choic === 0){
            setStates(states - 1);
            // console.log(states,'state,---');
        }
        
        bannerIndexFn(states, choic);
    }, [states]);

    /**
     * 轮播图函数
     * @param stateIndex 选择的索引
     * @param choic      加还是减
     */
    function bannerIndexFn(stateIndex: number, choic: number = 1) {
        // console.log(stateIndex, 'choic')
        if (stateIndex >= 3) {
            setStates(0);
        } else {
            setStates(stateIndex + 1)
        }
        opcityChange()
    }
    // opcity过度效果
    function opcityChange() {
        setOpacitys(0.2);
        times.current = setTimeout(() => setOpacitys(1), 1500)
    }
    // 索引减1
    const cutIndex = () => React.useCallback(() => {
        if(states > 0) {
            setStates(states - 1);
            opcityChange()
        }
    },[states])
    // 选择某个点
    const choicPoint:JSX.Element[] = bannerBgList.map((data,index) => {
            return(
                <li key={index} className="point" onClick={() => setStates(index)} style={{ backgroundPosition: index === states ? `-17px -352px` :`2px -352px`}}/>
            )
        })
    // 轮播图数据
    let bannerList: any;
    if (props.banners) {
        const banners = props.banners;
        bannerList = banners.map((data: any, index: number): JSX.Element => {
            return (
                <li key={index} style={{ background: `url(${data.imageUrl}) no-repeat` }} />
            )
        })
    }
    return (
        <div className="recommendHeader" style={{ background: `url(${bannerBgList[states].name}) repeat-x` }}>
            <div className="bannerWithDownload">
                <div className="bannerPosBox" >
                    {/* 轮播图 */}
                    <ul className="bannerBox" style={{ width: `${bannerNum * 100}%`, transform: `translate3d(-${states / 8 * 100}%,0,0)`, opacity: opacitys, transition: `all 2s ease-in-out` }}>
                        {bannerList}
                    </ul>
                </div>
                {/* 下载 */}
                <div className="downLoad">
                    <img src={download} alt="" />
                </div>
                {/* 点击切换轮播 */}
                <button onClick={cutIndex()} className="left" />
                <button onClick={bannerIndex(1)} className="right" />
                {/* 中间的点 */}
                <ul className="chointPointBox">
                    {choicPoint}
                </ul>
            </div>

        </div>
    )
}
export default RecommendHeader;
