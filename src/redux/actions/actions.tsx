import { createAction } from "redux-actions";

import types from "../types/typs";

import { IUser, IToastMsg } from 'src/components/Type/Type';
import { ShowPopoveType } from 'src/components/Type/ReduxType';

// dispact方法需要走这个过程

// 设置用户token
const setToken = createAction(types.TOKEN,(token:string) => token);
// 设置用户信息
const setUser = createAction(types.USER_MSG,({...params}:IUser) => ({...params}))
// 设置popove状态
const setPopoveState = createAction(types.POPOVE_STATE, (popove: ShowPopoveType) => ({ ...popove}));
// 设置登陆类型
const setLoginType =createAction(types.LOGIN_TYPE,(payload:string) => payload)
// 设置显示toast
const setToastStatus = createAction(types.TOAST_STAUS, (payload: IToastMsg) => ({...payload}))


const actionsStore = {
    setLoginType,
    setPopoveState,
    setToastStatus,
    setToken,
    setUser,
    
}

export default actionsStore;