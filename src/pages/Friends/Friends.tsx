import * as React from 'react';

import "./Friends.scss"

class Friends extends React.Component {
    constructor(props: any) {
        super(props);
    }

    public showLoginPopove() {
        console.log(1)
    }

    public render() {
        return (
            <div className="friends">
                <div className="friends-body">
                    <div className="friends-body-center">
                        <div className="friends-center-img">
                            <div className="friends-center-desc">
                                你可以关注明星和好友品味他们的私房歌单
                                <br/>
                                通过他们的动态发现更多精彩音乐
                            </div>
                            <a className="friends-center-btn" onClick={this.showLoginPopove}>立即登录</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Friends;