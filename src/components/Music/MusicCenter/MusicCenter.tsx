import * as React from 'react';
import './MusicCenter.scss';

// import constructorImg from '../../../static/img/iconall.png'
const MusicCenter = () => {
    // 进度条宽度
    const [x, setProgessWidth] = React.useState<number>(0);
    // 结束距离
    const [l, setPos] = React.useState<number>(0);
    // moveX
    const [movex,setMovex] = React.useState<number>(0);
    // 判断是否离开可移动区间
    const [moveStatus, setMoveStatus] = React.useState<boolean>(false);
    // 进度点
    const point: any = React.useRef(null);
    // 进度盒子
    const progess: any = React.useRef(null);
    
    // 监听页面鼠标抬起事件
    React.useEffect(() => {
        document.addEventListener('mouseup', docMove);
        progess.current.onmousemove = null;
        return () => document.removeEventListener('mouseup', docMove)
    }, [moveStatus])

    function docMove() {
        setMoveStatus(false)
    }
    React.useEffect(() => {
        point.current.onmousedown = pointDown;
    }, [x, l])

    /**
     * 拖动进度条
     * @param e 移动对象
     */
    const pointDown = (e:any) => {
        setProgessWidth(e.clientX);
        setPos(point.current.offsetLeft)
        progess.current.onmousemove = pointMove;
        progess.current.onmouseup = pointUp;
    }

    /**
     * 移动对象
     * @param e 移动对象
     */
    const pointMove = async (e: any) => {
        const x2:number = e.clientX;
        const nl:number = x2 - (x - l)-356;
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
        setPos(e.offsetX-5)
        setProgessWidth(e.offsetX)
        progess.current.onmousemove = null;
    }

    // 离开清楚鼠标移动事件
    const mouseLeave = React.useCallback(() => {
        console.log(`离开`);
        // progess.current.onmousemove = null;
        setMoveStatus(false)
        // return 
    }, [x])

    return (
        <div className="centerBox">
            {/* 左侧图片 */}
            <div className="musicImg">
                <a href="javscript:;" />
            </div>
            {/* 进度条 */}
            <div className="progess" ref={progess} onMouseLeave={mouseLeave}>
                <div className="progessBar" style={{ width: movex + 'px' }} >
                    <span ref={point} style={{ transform: `translate3d(${movex}px,0px,0px)` }}/>
                </div>
                {/* <div className="mouseDon"  /> */}
            </div>
            {/* 时间 */}
            <div className="time">
                <em>00:00</em>
                <em>/00:00</em>
            </div>

            
        </div>
    );
}

export default MusicCenter;
