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
    showList     : boolean,
    loginTypeList: ILoginListType[],
    showPopove?  : boolean
}

// components/Login/LoginPopove/LoginPopove state类型
export interface LoginPopoveState {
    choicAgree  :   boolean,
    isdown      :   boolean,
    
    mouse       :   {   
                        disX: number,
                        disY: number,
                        offWindowX:number,
                        offWindowY:number,
                        screenX:number,
                        screenY:number
                     }
}