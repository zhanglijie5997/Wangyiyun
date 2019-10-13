import * as React from 'react'
import './Music.scss';
// import MusicCenter from "./MusicCenter/MusicCenter";
import AudioHttp from '../../utils/Http/HttpList/Audio';
import loadable from "@loadable/component";
const MusicCenter = loadable(() => import("./MusicCenter/MusicCenter"));
// import { message } from "antd";
export default function Music() {
    const [playAudio, setPlayAudio] = React.useState<boolean>(false); // 设置音频播放还是暂停
    const [audioUrl,setAudioUrl] = React.useState<string>('');// 音乐地址
    const [audioState,setAudioState] = React.useState<object>({}); // 音乐数据
    const [centerShow,setCenter] = React.useState<boolean>(false);// 异步控制显示子组件
    const [audioVolume,setAudioVolume] = React.useState<number>(0.5); // 播放器音量
    const [showControlVolume,setControlVolume] = React.useState<boolean>(false); // 显示控制音量面板
    const [controlLength,setControlLength] = React.useState<number>(0); // 音量进度条高度
    const volumeProgess: React.RefObject<HTMLDivElement> = React.useRef(null); // 进度条盒子ref
    const progessLength: React.RefObject<HTMLDivElement> = React.useRef(null); // 进度条ref
    
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

    
    // 获取音乐数据
    const getMusicUrlAddress = async () => {
        const musiclist: any = await AudioHttp.search('海阔天空'); // 搜索关键词音乐
        console.log(musiclist.result.songs[0].id,'musiclist');
        setAudioState(musiclist.result.songs[0])
        const data = await AudioHttp.getMusicUrl(musiclist.result.songs[0].id); // 搜索音乐地址
        // console.log(data, '音乐数据');
        await setAudioUrl(data.data[0].url);
    }
    // 显示更改音量界面
    const changeVolumn = (e:Event | undefined) => React.useCallback(() => {
        // message.success("打开设置面板成功")
        setControlVolume(!showControlVolume);
        // const nowVolumeLength: number = useAudioRef.current.getVolume() * 93;
        // setControlLength(nowVolumeLength)
        // console.log(nowVolumeLength, '当前音量');
    }, [showControlVolume]);

    // 点击设置音量
    const progessMouseDown = (event:any) => {
        event.persist();
        // 距离顶部高度
        const docNode: HTMLElement = event.target;
        
        // 距离外部盒子高
        const volumeNotify: number = (event.pageY - docNode.getBoundingClientRect().top) ;
        console.log(volumeNotify,'///')
        setControlLength(volumeNotify);
        // tslint:disable-next-line:radix
        const nowVolume: number = Number(((93 - volumeNotify) / 93).toFixed(1));
        console.log(event.target.getBoundingClientRect().top, docNode.getBoundingClientRect().top,'mmmm')
        setAudioVolume(nowVolume < 1 ? nowVolume : 1);
        // console.log(nowVolume);
        volumeProgess.current!.onmousemove = changeVolumeDown;
    }

    React.useEffect(() => {
        getMusicUrlAddress(); 
        setTimeout(() => {
            setCenter(true);
        }, 200)
    }, [centerShow]);

    const changeVolumeDown = (e: any): void => {
        // console.log(e,'0000')
    };
    // 更改音量
    const volumeMoveChange = (event: any) => {
        // console.log(volumeProgess.current, '////');
        
    }
    // 设置音量盒子
    const volumeBox:JSX.Element= ( <div className="volumeBox" >
        <div className="volumeProgess" 
             onMouseDown={progessMouseDown} 
             ref={volumeProgess} 
             onMouseMove={volumeMoveChange}
             id="volumeProgess" >
            
            <span className="progessLength" style={{ height: `${controlLength}px` }} ref={progessLength} id="progessLength"/>
            <span className="volumeSwich" style={{ top: (controlLength - 20) < -8 ? -8 : (controlLength - 20)+ 'px' }}/>
        </div>

    </div>);

    
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
                        <span onClick={play} 
                              style={{ backgroundPosition: playAudio ? `-2px -166px` : `-2px -205px` }} 
                              />
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
                                audioState={audioState}
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
                        {showControlVolume ? volumeBox : null}
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
