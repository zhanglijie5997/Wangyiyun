import React, { useEffect, useCallback, useState, useRef, RefObject, useImperativeHandle, forwardRef, CanvasHTMLAttributes} from 'react';
import "./Video.scss";
import { videoGroup } from 'src/utils/Http/HttpList/Video';
import { GetVideoGroupType, GetVideoObjType } from './VideoInterface/VideoInterface';


const Video = (props: any,ref: any) => {
    const [getVideoGroup, setVideoGroup] = useState<string>(""); // 视频资源
    const [getVideoObj, setVideoObj] = useState<GetVideoObjType>({
        muted: false , // 是否静音
        poster: "", // 背景logo
        preload: "auto", // 是否在页面加载后载入视频, auto指示一旦页面加载，则开始加载音频/视频。 metadata指示当页面加载后仅加载音频/视频的元数据。 none指示页面加载后不应加载音频/视频。
    }); // video势力方法
    const videoRef:RefObject<HTMLVideoElement> = useRef(null); // video 标签内容
    const canvasRef: RefObject<HTMLCanvasElement> = useRef(null); // canvas 画布

    useEffect(() => {
        VideoGroup();
        canvasDefault();
    }, []);
    // 获取video数据
    const VideoGroup = useCallback(async () => {
        const data = await videoGroup();
        await setVideoGroup(data[0].data.urlInfo.url);
    }, [])
    // canvas 绘制视频
    const canvasDefault = useCallback(() => {   
        console.log(canvasRef.current, 'canvas'); 
    },[])
    // 定义一些ref方法
    useImperativeHandle(ref,() => ({

    }))
    // video 方法
    const setVideoAttr = () => {
        return new Map([
            ["playbackRate", (speed: number) => videoRef.current!.playbackRate = speed] , // 设置播放速度
            ["duration", () => videoRef.current!.duration], // 获取视频时长
            ["networkState", () => videoRef.current!.networkState], // 媒体网络状态 0 未初始化 1 是活动的且已选取资源，但并未使用网络 2 浏览器正在下载数据 3 未找到音频/视频来源
            ["duration", () => videoRef.current!.duration], // 获取视频时长
            ["duration", () => videoRef.current!.played.start(0) + videoRef.current!.played.end(0)], // 获得视频中以秒计的首段已播放的范围
            ["readyState", () => videoRef.current!.readyState], // 返回视频的当前就绪状态。0 没有关于音频/视频是否就绪的信息 1 关于音频/视频就绪的元数据 2 关于当前播放位置的数据是可用的，但没有足够的数据来播放下一帧/毫秒 3 当前及至少下一帧的数据是可用的 4 可用数据足以开始播放
        ])
    }
    // 播放视频
    const playVideo = ()  => { videoRef.current!.play() };
    // 暂停视频
    const pause = () => { videoRef.current!.pause()};

    // video 方法
    const videoFn = () => {
        return new Map([
            ["onratechange", () => videoRef.current!.onratechange = () => {console.log(`播放速度改变`);}],
            ["onvolumechange", () => videoRef.current!.onvolumechange = () => {console.log(`音量改变`);}],
            ["play", () => videoRef.current!.onplay = () => { console.log(`开始播放`); }],
            ["ended", () => videoRef.current!.onended = () => { console.log(`播放结束`); }],
            ["onpause", videoRef.current!.onpause = () => { console.log(`视频暂停`); }],
            ["onplaying", videoRef.current!.onplaying = () => { console.log(`视频异常,暂停`); }],
            ["onwaiting", videoRef.current!.onwaiting = () => { console.log(`视频需要缓冲到下一帧，可以做一些操作`); }],
            ["onseeking", videoRef.current!.onseeking = () => { console.log(`移动视频播放位置`); }],
            ["onseeked", videoRef.current!.onseeked = () => { console.log(`视频播放位置移动完成,可以做一些操作`); }],
            ["ontimeupdate", videoRef.current!.ontimeupdate = () => videoRef.current!.currentTime], // 获取当前播放位置
            ["onabort", videoRef.current!.onabort = () => { console.log(`视频终止加载,提示信息`)}],
            ["onerror", videoRef.current!.onerror = () => { console.log(`视频加载错误`)}],
            ["onstalled", videoRef.current!.onstalled = () => { console.log(`当前视频格式不可用`) }],
            ["onsuspend", videoRef.current!.onsuspend = () => { console.log(`媒体加载数据被阻止`) }],
        ])
    }
    return (
        <div className="video">
            <canvas id="videoCanvas" ref={canvasRef} width="400" height="300">您的浏览器不支持canvas</canvas>
            <video src={getVideoGroup} controls={true} ref={videoRef} className="videoRef" 
                   muted={getVideoObj.muted} poster={getVideoObj.poster} preload={getVideoObj.preload}>您的浏览器不支持video标签</video>
        </div>
    );
}
const FinalVideo = forwardRef(Video);
export default FinalVideo;
