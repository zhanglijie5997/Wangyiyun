import * as React from 'react'

import { connect } from "react-redux";

import "./LoginPopove.scss"

import actionsStore from '../../../redux/actions/actions';
import { LoginPopoveState } from 'src/components/Type/Type';

const mapStateToProps = (state:any) => ({
    loginType : state.loginType ,
    showPopove: state.showPopove,
    
})

const mapDispatch = (dispath:any) => {
    return {
        changePopoveState:(payload:boolean) => dispath(actionsStore.setPopoveState(payload))
    }
}

class LoginPopove extends React.Component {
    public state:LoginPopoveState;
    
    constructor(props:any) {
        super(props);
        this.choseAgree = this.choseAgree.bind(this);
        this.closePopove = this.closePopove.bind(this);
        this.popoveMouseDown = this.popoveMouseDown.bind(this);
        this.popoveMousemove = this.popoveMousemove.bind(this);
        this.state = {
            choicAgree:false,  // 同意协议
            isdown:false,      // 拖拽开关
            loginType: "手机号登陆", // 登陆类型
            mouse:{
                disX: 0,        // 保存offWindowX
                disY: 0,        // 保存offWindowY
                offWindowX: 200, // 距离窗口x轴
                offWindowY: 50, // 距离窗口y轴
                screenX:0,     // 点击x轴坐标
                screenY:0,     // 点击y轴坐标
                
            }
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
     * closePopove 关闭弹窗
     */
    public closePopove():void {
        // tslint:disable-next-line:no-string-literal
        this.props["changePopoveState"](false)
    }

    /**
     * popoveMouseenter 鼠标摁下事件 设置距离
     */
    public async popoveMouseDown(e:any):Promise<void> {
        console.log(e);
        const initState = this.state.mouse;
        initState.screenX = e.pageX;
        initState.screenY = e.pageY;
        initState.disX = this.state.mouse.offWindowX;
        initState.disY = this.state.mouse.offWindowY;
        console.log(initState,'bbb')
        await this.setState({
            mouse: initState,
        });
        this.popoveMousemove(e)
    }

    /**
     * popoveMousemove 鼠标移动事件
     */
    public popoveMousemove(event:any):void {
        
        document.onmousemove = (e:any) => {
            const initState = this.state.mouse;
            console.log(`移动`);
            const pageX: number =  e.pageX;
            const pageY: number = e.pageY;
            console.log(pageX,this.state.mouse.screenX);
            // debugger;
            const screenX: number = pageX - this.state.mouse.screenX ;
            const screenY: number = pageY - this.state.mouse.screenY;
            initState.offWindowX = screenX + this.state.mouse.disX;
            initState.offWindowY = screenY + this.state.mouse.disY;
            initState.screenX = initState.screenX;
            initState.screenY = initState.screenY;
            this.setState({
                mouse: initState
            })
        }
        document.onmouseup = () => {
            console.log(this.state.mouse)
            document.onmousemove = null;
        }
    }
   
    public UNSAFE_componentWillUpdate(nextProps:any,nextState:any) {
        if (nextState.isdown) {
            // this.popoveMousemove()
        }
    }
    
    public render() {
        return (
            <div className="loginPopoveBox">
                <div className="loginPopove" onMouseDown={() => this.popoveMouseDown(event)} 
                    style={{ "transform": `translate3d(${this.state.mouse.offWindowX}px,${this.state.mouse.offWindowY}px,0px)`}}
                    id="loginPopove"
                    >
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
                                    
                                    {   // tslint:disable-next-line:no-string-literal
                                        this.props['loginType'] === '手机号登陆' ? <span className="iconfont icon-xiangxia">
                                            +86
                                        </span> : null
                                    }
                                    <span>
                                        {
                                            // tslint:disable-next-line:no-string-literal
                                            <input type="text" placeholder={this.props['loginType']} className="outPhone"/>
                                        }
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
            </div>
        )
    }
}
export default connect(mapStateToProps, mapDispatch)(LoginPopove)