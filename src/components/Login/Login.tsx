import * as React from 'react'
import "./Login.scss"

import {  ILoginListType,ILoginState, IToastMsg } from '../Type/Type';

import { connect } from "react-redux";

import actionsStore from "../../redux/actions/actions";
// import Toast from '../Toast/Toast';
// import LoginPopove from "./LoginPopove/LoginPopove";


const mapStateToProps = (state:any) => ({
    showPopove: state.showPopove,
    // showToast : state
})

const mapDispatch = (dispatch:any) => {

    return {
        
        changeLoginTypeState: (payload: string) => dispatch(actionsStore.setLoginType(payload)),
        
        changePopoveState: (payload: any) => {
            // tslint:disable-next-line:no-console
            // console.log(payload,'payload')
            return dispatch(actionsStore.setPopoveState(payload))
        },
        changeToastState: (payload: IToastMsg) => dispatch(actionsStore.setToastStatus(payload)),
    }
}
class Login extends React.Component {
    public state:ILoginState;
    constructor(props:any) {
        super(props);
        // tslint:disable-next-line:no-console
        // console.log(props)
        this.state = {
            loginTypeList:[
                {icon:'icon-shouji',name:'手机号登陆'},
                {icon:'icon-weixin',name:'微信登陆'},
                {icon:'icon-qq',name:'QQ登陆'},
                {icon:'icon-weibo',name:'新浪微博登陆'},
                {icon:'icon-youxiang',name:'网易邮箱登陆'},
            ],
            showList: false, // 展示登陆类型列表
            toastMsg:{
                duation:3000,
                msg:'暂不支持此登陆类型',
                show:true
            }
        }
        this.mouseLoginShow = this.mouseLoginShow.bind(this);
        this.mouseLoginLeave = this.mouseLoginLeave.bind(this);
    }
    // 移入显示登陆类型
    public mouseLoginShow():void {
        this.setState({
            showList:true
        })
    }
    // 移除隐藏类型
    public mouseLoginLeave():void {
        this.setState({
            showList:false
        })
    }

    public async goLogin(icon:string,name:string):Promise<void> {
        const self =this;
        
        // tslint:disable-next-line:no-bitwise
        if(~icon.indexOf("shouji") || ~icon.indexOf("youxiang")) {
            // tslint:disable-next-line:no-string-literal
            await this.props['changePopoveState']({ show: true, type:icon});
            // tslint:disable-next-line:no-string-literal
            await this.props['changeLoginTypeState'](name)
        }else {
            // tslint:disable-next-line:no-string-literal
            await this.props['changeToastState'](this.state.toastMsg)
            setTimeout(() => {
                 // tslint:disable-next-line:no-string-literal
                self.props['changeToastState']({
                    duation: 3000,
                    msg: '暂不支持此登陆类型',
                    show: false
                })
            },3000)
        }
    }
    public render() {
        // 登陆类型
        const loginTypeList = this.state.loginTypeList.map((item:ILoginListType,index:number) => {
            return(
                <li key={index} onClick={this.goLogin.bind(this,item.icon,item.name)}>
                    <span className={['iconfont',item.icon].join(' ')}/>
                    <span className={item.name}>
                        { item.name }
                    </span>
                </li>
            )
        }) 

        return (
            <div className="login">
                <em onMouseEnter={this.mouseLoginShow} >
                    登陆
                </em>
                {/* 登陆方式 */}
                <div className={["loginType", this.state.showList ? 'loginTypeShow' : 'loginTypeHide'].join(' ')} onMouseLeave={this.mouseLoginLeave}>
                    <ul>
                        {loginTypeList}
                    </ul>
                </div>
                
            </div>
        )
    }
}
export default connect(mapStateToProps, mapDispatch)(Login)