import * as React from 'react';
import './MusicCenter.scss';

// import Audio from '../Audio/Audio';
// import constructorImg from '../../../static/img/iconall.png'
const MusicCenter = (props:any,ref:any) => {
    // console.log(props,'>??')
    // 进度条宽度
    // const [x, setProgessWidth] = React.useState<number>(0);
    // 结束距离
    // const [l, setPos] = React.useState<number>(0);
    // moveX
    const [movex,setMovex] = React.useState<number>(0);
    // pointMove 
    // const [pointMoves,setPointMove] = React.useState(0);
    // 判断是否离开可移动区间
    const [moveStatus, setMoveStatus] = React.useState<boolean>(false);
    // 进度点
    const point: any = React.useRef(null);
    // 进度盒子
    const progess: any = React.useRef(null);
    const audioRef: any = React.useRef<any>(null); // audio 播放器实例
    const [currentTime, setCurrentTime] = React.useState<number>(0); // 音乐播放时长
    const [ended, setEnded] = React.useState<boolean>(false); // 播放是否结束
    const [musicLength, setMusicLength] = React.useState<any>(''); // 音乐总时长
    const [nowLength, setNowLength] = React.useState<string>('00:00'); // 当前进度
    // 监听页面鼠标抬起事件
    React.useEffect(() => {
        console.log(audioRef.current.src);
        setTimeout(() => {
            if (props.audioUrl && audioRef && audioRef.current.duration > 0) {
                if (toString.call(audioRef.current.duration) === "[object Number]" && audioRef.current.duration.toString() !== "NaN") {
                    const musictime = audioRef.current.duration;
                    console.log(musictime, 'llll===')
                    setMusicLength(getMusictime(audioRef.current.duration));
                }
            }
        },20)
        
        document.addEventListener('mouseup', docMove);
        progess.current.onmousemove = null;
        return () => document.removeEventListener('mouseup', docMove)
    }, [moveStatus, musicLength])

    function docMove() {
        setMoveStatus(false)
    }
    React.useEffect(() => {
        point.current.onmousedown = pointDown;
    }, [])

    

    const progessDown = (e:any) => {
        const doc:any = document.getElementById("progess");

        setMovex(e.clientX - doc.getBoundingClientRect().x);
    }
    /**
     * 拖动进度条
     * @param e 移动对象
     */
    const pointDown = (e:any) => {
        // setProgessWidth(e.clientX);
        const doc: any = document.getElementById("progess");

        setMovex(e.clientX - doc.getBoundingClientRect().x )
        
        progess.current.onmousemove = pointMove;
        progess.current.onmouseup = pointUp;
    }

    /**
     * 移动对象
     * @param e 移动对象
     */
    const pointMove = async (e: any) => {
        const doc: any = document.getElementById("progess")
        console.log(doc.getBoundingClientRect(),'=,=')
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
        
        // setProgessWidth(e.offsetX);
        // setPos(e.offsetX - 5);
    }
    /**
     * 抬起事件
     * @param e 移动内置对象
     */
    const pointUp = (e: any) => {
        // console.log(e,'pointUp');
        // setPos(e.offsetX-5)
        // setProgessWidth(e.offsetX)
        // setMovex(e.offsetX)
        progess.current.onmousemove = null;
    }

    // 离开清楚鼠标移动事件
    const mouseLeave = React.useCallback(() => {
        console.log(`离开`);
        // progess.current.onmousemove = null;
        setMoveStatus(false)
        // return 
    }, [])

    React.useImperativeHandle(ref, () => ({
        duration: () => audioRef.current.duration, // 音频时长
        endedMusic: () => ended,            // 播放是否结束
        // getBufferTime: () => getBufferTime(),  // 获取缓冲时间
        pause: () => audioRef.current.pause(), // 暂停音频
        play: () => audioRef.current.play(), // 播放音频
        timeUpdate: () => currentTime,  // 播放位置改变

    }))
    console.log(movex)
    
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
        setCurrentTime(audioRef.current.currentTime);
        // console.log(currentTime)
        // setMovex(audioRef.current.currentTime);
        const $length: number = ((audioRef.current.currentTime / audioRef.current.duration) * 493) ;
        console.log($length,'$length')
        setNowLength(calculation(audioRef.current.currentTime));
        setMovex($length);
        // setPointMove(audioRef.current.currentTime / 493)
    }, [currentTime, musicLength,nowLength]);
    
    // 是否播放完成
    const endedMusic = React.useCallback(() => setEnded(true), []);
    
    return (
        <div className="centerBox">
            {/* 左侧图片 */}
            <div className="musicImg">
                <a href="javscript:;" />
            </div>
            {/* 进度条 */}
            <div className="progess" ref={progess} onMouseLeave={mouseLeave} id="progess" onMouseDown={progessDown}>
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
