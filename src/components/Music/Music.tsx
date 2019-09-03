import * as React from 'react'
import './Music.scss';
import MusicCenter from "./MusicCenter/MusicCenter";
import Audio from './Audio/Audio';
import AudioHttp from '../../utils/Http/HttpList/Audio';

export default function Music() {
    const [playAudio, setPlayAudio] = React.useState<boolean>(false); // 设置音频播放还是暂停
    const [audioUrl,setAudioUrl] = React.useState('');// 音乐地址
    // 控制音频
    const useAudioRef: any = React.useRef(null);
    // 播放音频
    const play = React.useCallback(async () => {
        if (!playAudio) {
            await useAudioRef.current.play();
            setPlayAudio(true);
        } else {
            await useAudioRef.current.pause();
            setPlayAudio(false)
        }
        // tslint:disable-next-line:no-unused-expression
        // lookMusicEnd;
        console.log(useAudioRef.current.duration(), useAudioRef.current.ended,'useAudioRef.current.timeupdate()')
        // useAudioRef.current.play();
    }, [playAudio])
    React.useEffect(() => {
         getMusicUrlAddress();
        setTimeout(() => {
            // const time = useAudioRef.current.duration();
            // console.log(time, '..??')
        }, 20)
    }, []);
    // 获取音乐数据
    const getMusicUrlAddress = async () => {
        const data = await AudioHttp.getMusicUrl('33894312');
        console.log(data, '音乐数据');
        await setAudioUrl(data.data[0].url)
    }
    
  
   
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
                        <span onClick={play} style={{ backgroundPosition: playAudio ? `-2px -166px` : `-2px -205px` }} />
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
                    <div className="gradintLine" />
                    {/* 音量,循环,歌单 */}
                    <div className="volumnBox">
                        <a href="#" />
                        <a href="#" />
                        <a href="#" />
                    </div>
                </div>
            </div>
            {audioUrl ? <Audio ref={useAudioRef} audioUrl={audioUrl}/> : null}
        </div>
    )
}
