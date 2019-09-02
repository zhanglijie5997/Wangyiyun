import * as React from 'react'
import './Music.scss';
import MusicCenter from "./MusicCenter/MusicCenter";
export default class Music extends React.Component {
    public render() {
        return (
            <div className="music">
                {/* 头部 */}
                <div className="hand" >
                    <span className="lock" />
                </div>
                {/* 播放器 */}
                <div className="musicBox">
                    {/* 控制信息 */}
                    <div className="musicConstructor">
                        {/* 左侧播放 */}
                        <div className="constructorLeft">
                            <span />
                            <span />
                            <span />
                        </div>
                        {/* 右侧进度条 */}
                        <div className="constructorCenter">
                            <MusicCenter />
                        </div>
                        {/* 收藏,分享 */}
                        <div className="collection">
                            <span />
                            <span />
                        </div>
                        {/* 渐变线 */}
                        <div className="gradintLine"/>
                        {/* 音量,循环,歌单 */}
                        <div className="volumnBox">
                            <a href="#" />
                            <a href="#" />
                            <a href="#" />
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
