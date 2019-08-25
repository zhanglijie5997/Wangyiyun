import * as React from 'react'

import { connect } from "react-redux";

import "./LoginPopove.scss"

import actionsStore from '../../../redux/actions/actions';

const mapStateToProps = (state:any) => ({
    showPopove: state.showPopove
})

const mapDispatch = (dispath:any) => {
    return {
        changePopoveState:(payload:boolean) => dispath(actionsStore.setPopoveState(payload))
    }
}

class LoginPopove extends React.Component {
    public state:any;
    constructor(props:any) {
        super(props);
        this.choseAgree = this.choseAgree.bind(this);
        this.closePopove = this.closePopove.bind(this);
        this.state = {
            choicAgree:false
        }

    }
    // 记住密码
    public choseAgree():void {
        let choicAgree = this.state.choicAgree;
        choicAgree = !choicAgree;
        this.setState({
            choicAgree
        })
    }
    /**
     * closePopove
     */
    public closePopove():void {
        // tslint:disable-next-line:no-string-literal
        this.props["changePopoveState"](false)
    }
    public render() {
        return (
            <div className="loginPopove">
                {/* 11 */}
                <div className="showLoginBox">
                    <div className="title">
                        <span>
                            手机号登陆
                        </span>
                        <span />  
                    </div>
                    <i className="iconfont icon-guanbi" onClick={this.closePopove}/>
                    {/* 手机号，密码 */}
                    <div className="loginMsgBox">
                        <div className="loginMsg">
                            {/* 登录框内容 */}
                            <div className="loginInput">
                                <span className="iconfont icon-xiangxia">
                                    +86
                                </span>
                                <span>
                                    <input type="text" placeholder="请输入手机号" className="outPhone"/>
                                </span>
                            </div>
                            <div className="outPassword">
                                <input type="password" placeholder="请输入密码"/>
                            </div>
                            <div className="rememberPassword">
                                <div>
                                    <span className={["checkPwd iconfont", this.state.choicAgree ? "icon-huiyishiqueren_huabanfuben":''].join(' ')} onClick={this.choseAgree}/>
                                    <span>
                                        记住密码
                                    </span>
                                </div>
                                <div className="forgetPwd">
                                    忘记密码?
                                </div>
                            </div>
                            {/* 提交 */}
                            <div className="submit">
                                登陆
                            </div>
                        </div>
                    </div>
                    {/* 底部注册其他登陆方式 */}
                    <div className="registerOrMoreLogin">
                        <div className="registerOrMoreLoginBox">
                            {/*  */}
                            <span>
                                <a href="#">
                                    {`< 其他登陆方式`}
                                </a>
                               
                            </span>
                            <span>
                                <a href="#">
                                    没有帐号？去注册 >
                                </a>
                                
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(mapStateToProps, mapDispatch)(LoginPopove)