import React, { RefObject, useRef} from 'react';
import "./Singer.scss";
import  Video  from 'src/components/Video/Video';

const Singer = () => {
    const videoRef: RefObject<HTMLVideoElement> = useRef(null); // 视频标签
    return (
        <div>
            <Video ref={videoRef} />
        </div>
    );
}

export default Singer;

