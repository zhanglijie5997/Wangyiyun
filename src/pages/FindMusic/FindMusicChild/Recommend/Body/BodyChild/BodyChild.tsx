import * as React from 'react';
import { Link } from "react-router-dom";
import "./BodyChild.scss"
const BodyChild = (props: any) => {
    const [list] = React.useState<any[]>(props.tags); // 分类
    // 头部音乐分类
    const musicHeader: JSX.Element[] = list.slice(0, 4).map((item: any, index: number) => {
        return (
            <li key={index}>
                {item.name}
            </li>
        )
    });
    return (
        <div className="bodyChildHeader">
            <div className="headerLeft"><span className="circle" /></div>
            <Link to="/SongList" className="hot">{ props.name }</Link>
            {list.length > 0 ? <ul>{musicHeader}</ul>:null}
            <Link to={props.to} className="iconfont icon-youjiantou more">更多 </Link>
        </div>
    );
}

export default BodyChild;
