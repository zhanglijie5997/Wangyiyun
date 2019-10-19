import * as React from 'react';
import './MusicCenter.scss';
import { Link } from 'react-router-dom';
const MusicCenter = (props:any,ref:any) => {
    const [movex,setMovex] = React.useState<number>(0);
    // 判断是否离开可移动区间
    const [moveStatus, setMoveStatus] = React.useState<boolean>(false);
    // 进度点
    const point: React.RefObject<HTMLSpanElement> = React.useRef(null);
    // 进度盒子
    const progess: React.RefObject<HTMLDivElement> = React.useRef(null);
    const audioRef: React.RefObject<HTMLAudioElement> = React.useRef(null); // audio 播放器实例
    const [currentTime, setCurrentTime] = React.useState<number>(0); // 音乐播放时长
    const [ended, setEnded] = React.useState<boolean>(false); // 播放是否结束
    const [musicLength, setMusicLength] = React.useState<string>('00:00'); // 音乐总时长
    const [nowLength, setNowLength] = React.useState<string>('00:00'); // 当前进度
    // 监听页面鼠标抬起事件
    React.useEffect(() => {
        // console.log(props,'prop');
        setTimeout(() => {
            if (props.audioUrl && audioRef && audioRef.current!.duration > 0) {
                if (toString.call(audioRef.current!.duration) === "[object Number]" && audioRef.current!.duration.toString() !== "NaN") {
                    // const musictime = audioRef.current.duration;
                    // console.log(musictime, 'llll===')
                    setMusicLength(getMusictime(audioRef.current!.duration));
                    audioRef.current!.volume = 0.5;
                }
                // 设置音量
            }
        },200)
        
        document.addEventListener('mouseup', docMove);
        progess.current!.onmousemove = null;
        return () => document.removeEventListener('mouseup', docMove)
    }, [moveStatus, musicLength])

    function docMove() {
        setMoveStatus(false)
    }
    React.useEffect(() => {
        point.current!.onmousedown = pointDown;
        // console.log(props.audioVolume, 'props===--==');
        audioRef.current!.volume = props.audioVolume;
    }, [props.audioVolume])

    /**
     * 设置音乐播放进度
     * @param cur 拖拽进度
     */
    const setNowCurrentTime = (cur:number):void => {
        const curSet = cur / 493 * audioRef.current!.duration;
        // console.log(curSet)
        audioRef.current!.currentTime = curSet;
    }
    

    const progessDown = (e:any) => {
        const doc:any = document.getElementById("progess");
        const moveDown:number = e.clientX - doc.getBoundingClientRect().x;
        setNowCurrentTime(moveDown)
        setMovex(e.clientX - doc.getBoundingClientRect().x);
    }
    /**
     * 拖动进度条
     * @param e 移动对象
     */
    const pointDown = (e:any) => {
        // setProgessWidth(e.clientX);
        const doc: any = document.getElementById("progess");
        const moveDown: number = e.clientX - doc.getBoundingClientRect().x;
        
        setMovex(e.clientX - doc.getBoundingClientRect().x );
        setNowCurrentTime(moveDown);
        progess.current!.onmousemove = pointMove;
        progess.current!.onmouseup = pointUp;
    }

    /**
     * 移动对象
     * @param e 移动对象
     */
    const pointMove = async (e: any) => {
        const doc: any = document.getElementById("progess")
        // console.log(doc.getBoundingClientRect(),'=,=')
        // setPos(doc.getBoundingClientRect())

        setMovex(e.clientX - doc.getBoundingClientRect().x );
        const nl: number = e.clientX - doc.getBoundingClientRect().x ;
        if(nl < 0) {
            setMovex(0)
        }else {
            if(nl > 480) {
                setMovex(480)
            }else {
                setMovex(nl)
            }
        }
        const moveDown: number = e.clientX - doc.getBoundingClientRect().x;
        setNowCurrentTime(moveDown)
    }
    /**
     * 抬起事件
     * @param e 移动内置对象
     */
    const pointUp = (e: any) => {
        progess.current!.onmousemove = null;
    }

    // 离开清楚鼠标移动事件
    const mouseLeave = React.useCallback(() => {
        // console.log(`离开`);
        setMoveStatus(false)
    }, [])

    React.useImperativeHandle(ref, () => ({
        duration: () => audioRef.current!.duration, // 音频时长
        endedMusic: () => ended,            // 播放是否结束
        getVolume: () => audioRef.current!.volume,
        // getBufferTime: () => getBufferTime(),  // 获取缓冲时间
        pause: () => audioRef.current!.pause(), // 暂停音频
        play: () => audioRef.current!.play(), // 播放音频
        timeUpdate: () => currentTime,  // 播放位置改变
        getDuration: () => { setMusicLength(getMusictime(audioRef.current!.duration));}
    }))
    // console.log(movex)
    const getMusictime =  (musictime: number): string=> {
        const data:string =  calculation(musictime);
        return data;
    }
    
    /**
     * 计算音乐时长
     * @param time 音乐时间长度
     */
    const calculation = (time:number):string=> {
        const minue = Math.floor(time / 60) < 1 ? '0' + Math.floor(time / 60) : Math.floor(time / 60) ;
        const secend = Math.floor(time % 60) < 10 ? '0' + Math.floor(time % 60) : Math.floor(time % 60);
        // console.log(minue + ':' + secend, '...');
        const all = minue + ':' + secend;
        return all
    }

    // 播放位置改变
    const timeupdate = React.useCallback(() => {
        setCurrentTime(audioRef.current!.currentTime);
        // console.log(currentTime)
        // setMovex(audioRef.current.currentTime);
        const $length: number = ((audioRef.current!.currentTime / audioRef.current!.duration) * 493) ;
        // console.log($length,'$length')
        setNowLength(calculation(audioRef.current!.currentTime));
        setMovex($length);
        // setPointMove(audioRef.current.currentTime / 493)
    }, [currentTime, musicLength,nowLength]);
    
    // 是否播放完成
    const endedMusic = (event: any) => {
        setEnded(true);
        console.log(props);
        props.stopPlay();
    }
    
    return (
        <div className="centerBox">
            {/* 左侧图片 */}
            <div className="musicImg">
                <a href="javscript:void(0);" style={{ background: `url(${props.audioState.artists[0].img1v1Url}) no-repeat`,backgroundSize:`cover` }}/>
            </div>
            {/* 进度条 */}
            <div className="progess" ref={progess} onMouseLeave={mouseLeave} id="progess" onMouseDown={progessDown}>
                <div className="songMsg">
                    <Link to="/">
                        {props.audioState.album.name}
                    </Link>
                    <Link to="/">
                        {props.audioState.artists[0].name}
                    </Link>
                </div>
                <div className="progessBar" style={{ width: movex  + 'px' }} >
                    <span ref={point} style={{ left: `${movex  - 11}px` }}/>
                </div>
                {/* <div className="mouseDon"  /> */}
            </div>
            {/* 时间 */}
            <div className="time">
                <em>{nowLength}</em>
                <em>/{musicLength}</em>
            </div>
            {/* audio组件 */}
            <div className="audioBox">
                <audio controls={true} ref={audioRef} id="audio" onTimeUpdate={timeupdate} onEnded={endedMusic}
                    src={props.audioUrl} />
            </div>
        </div>
    );
}
const RecommendHeaderFinal = React.forwardRef(MusicCenter)
export default RecommendHeaderFinal;
