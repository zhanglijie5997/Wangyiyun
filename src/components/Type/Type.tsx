// page/index 页面类型
export default interface IRouterList {
    component: any,
    name     : string,
    to       : string,
    classname: string,
    hot?     : boolean
}

// redux/state/state   user数据类型
export interface IUser {
    email?  :  string,
    phone   :  number,
    username:  string
}
// router/router  state类型
export interface IRouterState  {
    defaultName                 :  string,
    findmusicLis?               :  IRouterList[],
    findmusicLisDefaultName     :  string
}

// components/Login/Login state类型
export interface ILoginListType {
    icon        :   string,
    name        :   string,
    
}

export interface ILoginState {
    clickLoginType? : string,
    showList        : boolean,
    loginTypeList   : ILoginListType[],
    showPopove?     : boolean,
    toastMsg        : IToastMsg
}

// components/Login/LoginPopove/LoginPopove state类型
export interface LoginPopoveState {
    choicAgree      :   boolean,
    isdown          :   boolean,
    loginType       :   string,
    close           :   boolean
    phoneInputs     :   string 
    phoneIsTrue     :   boolean
    passwordIstrue  :   boolean
    password        :   string
    mouse           :   {   
                        disX: number,
                        disY: number,
                        offWindowX:number,
                        offWindowY:number,
                        screenX:number,
                        screenY:number
                     }
}


// components/Toast/Toast state类型
export interface IToastState {
    toastMsg    :   IToastMsg,
    addAnimate  :   boolean
}

// App state类型
export interface IAppState {
    toastStatus  : boolean,
    
}

// components/Toast/Toast state类型
export interface IToastMsg {
    duation     :   number,
    msg         :   string,
    show        :   boolean
}