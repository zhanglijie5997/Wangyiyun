import * as React from 'react';
import './Audio.scss';
const Audio = (props:any,ref:any) => {
    const audioRef:any = React.useRef(null);
    const [currentTime,setCurrentTime] = React.useState<number>(0); // 音乐播放时长
    const [ended,setEnded] = React.useState<boolean>(false); // 播放是否结束
    React.useImperativeHandle(ref,() => ({
        duration: () => audioRef.current.duration, // 音频时长
        endedMusic: () => ended,            // 播放是否结束
        getBufferTime: () => getBufferTime(),  // 获取缓冲时间
        pause : () => audioRef.current.pause(), // 暂停音频
        play  : () => audioRef.current.play(), // 播放音频
        timeUpdate: () => currentTime,  // 播放位置改变
        
    }))
    React.useEffect(() => {
        // console.log(audioRef.current.__proto__,props,'ee') 
    },[]);
    // 播放位置改变
    const timeupdate =  React.useCallback(() => {
        setCurrentTime(audioRef.current.currentTime);
        // console.log(currentTime)
    }, [currentTime]);
    // 获取缓冲时间
    const getBufferTime = () => {
        // console.log(audioRef.current.duration)
        // const start = audioRef.current.start(0);
        // const end   = audioRef.current.end(0);
        // console.log(`${start} --- ${end} 开始到结束时间`)
    }
    // 是否播放完成
    const endedMusic = React.useCallback(() => setEnded(true),[]);
    return (
        <div className="audioBox">
            <audio controls={true} ref={audioRef} id="audio" onTimeUpdate={timeupdate}  onEnded={endedMusic}
                src={props.audioUrl} />
        </div>
    );
}
const RecommendHeaderFinal = React.forwardRef(Audio)

export default RecommendHeaderFinal;
