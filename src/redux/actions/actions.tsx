import { createAction } from "redux-actions";

import types from "../types/typs";

import { IUser } from 'src/components/Type/Type';

// dispact方法需要走这个过程

// 设置用户token
const setToken = createAction(types.TOKEN,(token:string) => token);
// 设置用户信息
const setUser = createAction(types.USER_MSG,({...params}:IUser) => ({...params}))
// 设置popove状态
const setPopoveState = createAction(types.POPOVE_STATE, (popove: any) => popove)

const actionsStore = {
    setPopoveState,
    setToken,
    setUser,
   
}

export default actionsStore;