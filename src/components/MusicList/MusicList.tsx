import * as React from "react";
import "./MusicList.scss";
import { Link } from 'react-router-dom';
import { MusicListType } from './MusicListType/MusicListType';
// import banner from "../../static/img/loading.gif";
const MusicList = (props: MusicListType) => {
    // console.log(props,'..===');
    const [playCount,setPlayCount] = React.useState<string>(''); // 播放量
    React.useEffect(() => {
        const data: string = props.item.playCount > 10000 ? (Math.floor(props.item.playCount / 1000)  + props.item.playCount % 10000 + '万') : props.item.playCount + "";
        setPlayCount(data)
    }, [props.item.playCount])
    return (
        <div className="musicList">
            <Link to="/" className="link">
                <div className="listBox">
                    <div className="mask"/>
                    <img src={props.item.picUrl} alt="图片"/>
                    <div className="bottomMsg iconfont icon-erji icon-bofang">
                        {playCount}
                    </div>
                </div>
                <div className="description">
                    {props.item.name}
                </div>
            </Link>
        </div>
    )
}
export default MusicList;