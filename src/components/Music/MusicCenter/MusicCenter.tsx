import * as React from 'react';
import './MusicCenter.scss';
// import constructorImg from '../../../static/img/iconall.png'
const MusicCenter = () => {
    // 进度条宽度
    const [progressWidth,setProgessWidth] = React.useState<number>(0);
    // 初始距离,结束距离
    const [pos,setPos] = React.useState<number>(0);
    // 默认距离
    const [defaultPos,setDefaultPos] = React.useState<number>(0);
    // 计算距离
    const [addPos,setAddPos] = React.useState<number>(0);
    // 进度点
    const point:any = React.useRef(null);
    // 进度盒子
    const progess:any = React.useRef(null);
    React.useEffect(() => {
        // console.log(point.current.onmousedown,'uuu')
        point.current.onmousedown = pointDown;
    }, [pos, progressWidth, defaultPos, addPos])

    // console.log(setProgessWidth, setPos);
    /**
     * 拖动进度条
     * @param e 移动对象
     */
    const pointDown = (e: any) =>  {
        console.log(e,'nnn')
        // setProgessWidth(e.offsetX);

        setAddPos(e.offsetX);
        setPos(e.offsetX);
        
        // tslint:disable-next-line:no-unused-expression
        progess.current.onmousemove = pointMove;
        // tslint:disable-next-line:no-unused-expression
        progess.current.onmouseup = pointUp;
    }

    /**
     * 移动对象
     * @param e 移动对象
     */
    const pointMove = (e: any) =>  {
        console.log(e.offsetX, 'pointMove');
        setProgessWidth(e.offsetX);
       
        setDefaultPos(e.offsetX);
        setPos(e.pageX-186)
        console.log(pos,'pos')
    }
    /**
     * 抬起事件
     * @param e 移动内置对象
     */
    const pointUp = (e:any) => {
        console.log(e,'pointUp');
        setPos(e.pageX-186)
        progess.current.onmousemove = null;
    }

    // 离开清楚鼠标移动事件
    const mouseLeave = React.useCallback(() => {
        progess.current.onmousemove = null;
    },[])

    return (
        <div className="centerBox">
            {/* 左侧图片 */}
            <div className="musicImg">
                <a href="javscript:;" />
            </div>
            {/* 进度条 */}
            <div className="progess" ref={progess} onMouseLeave={mouseLeave}>
                <div className="progessBar" style={{ width: progressWidth + 'px' }}>
                    <span ref={point} style={{ transform: `translate3d(${pos}px,0,0)` }} />
                </div>
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
