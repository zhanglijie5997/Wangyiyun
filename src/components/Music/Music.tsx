import * as React from 'react'
import './Music.scss';
// import MusicCenter from "./MusicCenter/MusicCenter";
import loadable from "@loadable/component";
import AudioHttp from '../../utils/Http/HttpList/Audio';
const MusicCenter = loadable(() => import("./MusicCenter/MusicCenter"))
export default function Music() {
    const [playAudio, setPlayAudio] = React.useState<boolean>(false); // 设置音频播放还是暂停
    const [audioUrl,setAudioUrl] = React.useState('');// 音乐地址
    const [centerShow,setCenter] = React.useState<boolean>(false);// 异步控制显示子组件
    const [audioVolume,setAudioVolume] = React.useState<number>(0.5); // 播放器音量
    const [showControlVolume,setControlVolume] = React.useState<boolean>(false); // 显示控制音量面板
    const [controlLength,setControlLength] = React.useState<number>(0); // 音量进度条高度
    const volumeProgess:any = React.useRef(null); // 进度条盒子ref
    const progessLength = React.useRef(null); // 进度条ref

    // 控制音频
    const useAudioRef: any = React.useRef(null);
    // 播放音频
    const play = React.useCallback(async () => {

        if (!playAudio) {
            await useAudioRef.current.play();
            useAudioRef.current.getDuration()
            setPlayAudio(true);
        } else {
            await useAudioRef.current.pause();
            setPlayAudio(false)
        }
        setAudioVolume(useAudioRef.current.getVolume())
    }, [playAudio])
    
    // 子组件回掉,关闭播放
    const stopPlay = () => setPlayAudio(false);

    React.useEffect(() => {
        getMusicUrlAddress();
        setTimeout(() => {
            setCenter(true);
        }, 200)
    }, [centerShow]);
    // 获取音乐数据
    const getMusicUrlAddress = async () => {
        const data = await AudioHttp.getMusicUrl('1382308543');
        // console.log(data, '音乐数据');
        await setAudioUrl(data.data[0].url);
    }
    // 显示更改音量界面
    const changeVolumn = (e:Event | undefined) => React.useCallback(() => {
        setControlVolume(!showControlVolume);
        const nowVolumeLength: number = useAudioRef.current.getVolume() * 93;
        setControlLength(nowVolumeLength)
        // console.log(nowVolumeLength, '当前音量');
    }, [showControlVolume]);

    // 点击设置音量
    const progessMouseDown = (event:any):void => {
        event.persist();
        // 距离顶部高度
        const docNode: any = document.getElementById("volumeProgess");
        // 距离外部盒子高
        const volumeNotify: number = (event.pageY - docNode.getBoundingClientRect().top) - 3;
        // console.log(93 - volumeNotify / 93,event,'///')
        setControlLength(volumeNotify);
        // tslint:disable-next-line:radix
        const nowVolume: number = Number(((93 - volumeNotify) / 93).toFixed(1));
        
        setAudioVolume(nowVolume < 1 ? nowVolume:1);
        // console.log(nowVolume);
        
    }
    
    // 设置音量盒子
    const volumeBox:JSX.Element | null = (showControlVolume ? <div className="volumeBox" >
        <div className="volumeProgess" onMouseDown={progessMouseDown} ref={volumeProgess} id="volumeProgess" >
            <span className="progessLength" style={{ height: `${controlLength}px` }} ref={progessLength} id="progessLength"/>
            <span className="volumeSwich" style={{ top: (controlLength - 20) < -8 ? -8 : (controlLength - 20)+ 'px' }}/>
        </div>

    </div>:null)
    return (
        <div className="music">
            {/* 头部 */}
           
            {/* 播放器 */}
            <div className="musicBox">
                {/* 控制信息 */}
                <div className="musicConstructor">
                    {/* 左侧播放 */}
                    <div className="constructorLeft">
                        <span />
                        <span onClick={play} style={{ backgroundPosition: playAudio ? `-2px -166px` : `-2px -205px` }} />
                        <span />
                    </div>
                    {/* 右侧进度条 */}
                    <div className="constructorCenter">
                        {audioUrl && centerShow? 
                            <MusicCenter 
                            audioUrl={audioUrl} 
                            ref={useAudioRef} 
                            audioVolume={audioVolume} 
                            stopPlay={stopPlay}
                            />
                        :null}
                    </div>
                    {/* 收藏,分享 */}
                    <div className="collection">
                        <span />
                        <span />
                    </div>
                    {/* 渐变线 */}
                    <div className="gradintLine" />
                    {/* 音量,循环,歌单 */}
                    <div className="volumnBox">
                        {/* {audioVolume} */}
                        {audioVolume <= 0 ?
                            <i className='zeroVolumn' onClick={changeVolumn(event)} /> :
                            <i onClick={changeVolumn(event)} /> }
                        <i />
                        <i />
                        {volumeBox}
                        {/* <div className="volumeBox">
                            <div className="volumeProgess">
                                <span className="progessLength"/>
                                <span className="volumeSwich" />
                            </div>
                            
                        </div> */}
                        
                        
                    </div>
                </div>
            </div>
            {/* {audioUrl ? <Audio ref={useAudioRef} audioUrl={audioUrl}/> : null} */}
            <div className="hand" >
                <span className="lock" />
            </div>
        </div>
    )
}
