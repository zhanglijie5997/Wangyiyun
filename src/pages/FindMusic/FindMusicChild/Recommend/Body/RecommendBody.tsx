import * as React from 'react';
import  "./RecommendBody.scss";

const RecommendBody = (props:any):JSX.Element => {
    console.log(props,'...');

    return (
        <div className="recommemdBodyHeader">
            <div className="recommemdBody">
                {/* 左侧 */}
                <div className="recommemdBodyLeft">
                    11
                </div>
                <div className="recommemBodyRight">
                    22
                </div>
            </div>
        </div>
    );
}
export default RecommendBody;
