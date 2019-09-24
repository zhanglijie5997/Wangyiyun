import * as React from 'react';
import "./RankList.scss"
const RankList = (props: any) => {
    // console.log(props,'榜单数据');
    // 榜单数据

    return (
        <div className="rankList">
            <div className="rankListLi">
                <span style={{ color: props.index + 1 < 3 ? '#c10d0c':'#333'}}>
                    { props.index+1 }
                </span>
                <span>
                    { props.item.name }
                </span>
            </div>
        </div>
    );
}

export default RankList;
