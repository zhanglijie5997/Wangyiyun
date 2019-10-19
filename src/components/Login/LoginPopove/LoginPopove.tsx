import * as React from 'react'

import { connect } from "react-redux";

import "./LoginPopove.scss"

import actionsStore from '../../../redux/actions/actions';
import { LoginPopoveState } from 'src/components/Type/Type';
import { ShowPopoveType } from 'src/components/Type/ReduxType';
import { IToastMsg } from '../../Type/Type';

const mapStateToProps = (state:any) => ({
    loginType : state.loginType ,
    showPopove: state.showPopove,
    
})

const mapDispatch = (dispath:any) => {
    return {
        changePopoveState: (payload: ShowPopoveType) => dispath(actionsStore.setPopoveState({...payload})),
        changeToastState: (payload: IToastMsg) => dispath(actionsStore.setToastStatus(payload)),
    }
}

class LoginPopove extends React.Component {
    public state:LoginPopoveState;
    public timer:NodeJS.Timeout; // 定时器开关
    constructor(props:any) {
        super(props);
        this.choseAgree = this.choseAgree.bind(this);
        this.closePopove = this.closePopove.bind(this);
        this.popoveMouseDown = this.popoveMouseDown.bind(this);
        this.popoveMousemove = this.popoveMousemove.bind(this);
        this.phoneInput = this.phoneInput.bind(this);
        this.passwordOutPut = this.passwordOutPut.bind(this);
        this.state = {
            
            choicAgree:false,  // 同意协议
            close: false,      // 关闭弹窗
            isdown:false,      // 拖拽开关
            loginType: "手机号登陆", // 登陆类型
            mouse:{
                disX: 0,        // 保存offWindowX
                disY: 0,        // 保存offWindowY
                offWindowX: 200, // 距离窗口x轴
                offWindowY: 50, // 距离窗口y轴
                screenX:0,     // 点击x轴坐标
                screenY:0,     // 点击y轴坐标
                
            },
            password:'',     // 密码
            passwordIstrue:false, // 密码是否输入正确
            phoneInputs: '',   // 手机号或密码输入框
            phoneIsTrue:false, // 手机号输入框输入是否正确
            
            
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
        const self =this;
        this.setState({
            close:true
        })
        setTimeout(() => {
            self.changePopoveStateStatus(false,'phone')
        },100)
        
    }
    /**
     * 获取手机火邮箱输入框内容
     * @param e 获取输入框的值
     */
    public phoneInput(e:any):void {
        e.stopPropagation()
         // tslint:disable-next-line:no-bitwise
         if(~this.state.loginType.indexOf('phone') ) {
             // 验证是否是数字
             const reg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/;
             // console.log(reg.test(e.target.value),'正则')
             if (reg.test(e.target.value)) {
                 // console.log(`正确`)
                 this.setState({
                     phoneInput: String(e.target.value),
                     phoneIsTrue: true,
                 });
                 //  关闭登陆弹窗
                //  this.changePopoveStateStatus(false,'phone')
             } else {
                 // console.log(this.state, '???')
                 this.setState({
                     phoneInput: '',
                     phoneIsTrue: false,
                 })
             }
         }
    }

    /**
     * passwordOutPut
     */
    public passwordOutPut(e:any):void {
        e.stopPropagation()
        const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
        if(reg.test(e.target.value)) {
            this.setState({
                password: e.target.value,
                passwordIstrue:true
            })
        }else {
            this.setState({
                password: '',
                passwordIstrue: false
            })
        }
    }

    // 提交表单
    public submit(isLogin:boolean):void {
        
        const self = this;
        // tslint:disable-next-line:no-string-literal
        const loginType = this.props['showPopove']['type'];
        // tslint:disable-next-line:no-bitwise
        if (~loginType.indexOf('youxiang')){
           
            this.setState({
                loginType:'email'
            })
            self.changeToast("暂不支持此登陆方式")
            
        }else {
            this.setState({
                loginType: 'phone'
            })
        }
        
         // console.log(this.state.loginType,'mm??')

        if (!isLogin)  {return ;}
        // 否则请求接口
        if(this.state.phoneIsTrue && this.state.passwordIstrue) {
            this.changeToast("登陆成功");
            this.closePopove()
        }
    }

    /**
     * 改变toast状态
     * @param msg 信息
     */
    public changeToast(msg:string):void {
        const self =this;
        // tslint:disable-next-line:no-string-literal
        this.props['changeToastState'](
            {
                duation: 3000,
                msg,
                show: true
            }
        )
        this.timer = setTimeout(() => {
            // tslint:disable-next-line:no-string-literal
            self.props['changeToastState']({
                duation: 3000,
                msg: '',
                show: false,
            })
        }, 3000)
    }
    /**
     * 改变popove 状态
     * @param show 是否展示
     * @param type 展示类型
     */
    public changePopoveStateStatus(show: boolean, type:string):void {
        const self =this;
        // tslint:disable-next-line:no-string-literal
        self.props["changePopoveState"]({
            show,
            type
        })
    }

    public componentDidMount():void {
        this.submit(false)
    }
    /**
     * popoveMouseenter 鼠标摁下事件 设置距离
     */
    public async popoveMouseDown(e:any):Promise<void> {
        // console.log(e);
        const initState = this.state.mouse;
        initState.screenX = e.pageX;
        initState.screenY = e.pageY;
        initState.disX = this.state.mouse.offWindowX;
        initState.disY = this.state.mouse.offWindowY;
        // console.log(initState,'bbb')
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
            // console.log(`移动`);
            const pageX: number =  e.pageX;
            const pageY: number = e.pageY;
            // console.log(pageX,this.state.mouse.screenX);
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
            // console.log(this.state.mouse)
            document.onmousemove = null;
        }
    }
   
    public UNSAFE_componentWillUpdate(nextProps:any,nextState:any) {
        if (nextState.isdown) {
            // this.popoveMousemove()
        }
    }
    
    public componentWillUnmount():void {
        clearTimeout(this.timer)
    }

    public render() {
        return (
            <div className={["loginPopoveBox"].join('')} >
                <div className={["loginPopove", this.state.close ? 'addCloseEffect' : '' ].join(' ')}onMouseDown={() => this.popoveMouseDown(event)} 
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
                                <div className={
                                                    
                                                    // tslint:disable-next-line:no-string-literal
                                                    // tslint:disable-next-line:no-bitwise
                                    ["loginInput iconfont", this.state.phoneIsTrue && this.state.loginType === 'phone'  ? "icon-zhengque": "icon-guanbi"].join(' ')
                                            }>
                                
                                    {   // tslint:disable-next-line:no-string-literal
                                        this.props['loginType'] === '手机号登陆' ? <span className="iconfont icon-xiangxia">
                                            +86
                                        </span> : null
                                    }
                                    <span>
                                        {
                                            // tslint:disable-next-line:no-string-literal
                                            <input type="text" placeholder={this.props['loginType']} className={["outPhone"].join(' ')} onInput={() => this.phoneInput(event)}/>
                                        }
                                    </span>
                                </div>
                                <div className={["outPassword iconfont", this.state.passwordIstrue ? "icon-zhengque" : "icon-guanbi"].join(" ")}>
                                    <input type="password" placeholder="请输入密码" onInput={() => this.passwordOutPut(event)}/>
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
                                <div className="submit" onClick={() => this.submit(true)}>
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