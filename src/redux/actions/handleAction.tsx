import { handleActions  } from "redux-actions";
import { showPopove, token, user, loginType, toastMsg} from "../state/state";
import types from "../types/typs";

import { IUser, IToastMsg } from 'src/components/Type/Type';

// 设置token  Reducer
const tokenReducer = handleActions<string>({
    [types.TOKEN]:(state:any,action:any) => action.payload.token
},token)

// 设置user Reducer
const userReducer = handleActions<IUser>({
    [types.USER_MSG]:(state:any,action:any) => action.payload.user
},user)

// 设置popove Reducer
const popoveReducer = handleActions<boolean>({
    [types.POPOVE_STATE]:(state:any,action:any) => {
        // tslint:disable-next-line:no-console
        console.log(action.payload,state,"handeActions")
        // state = action.payload;
        return action.payload
    }
},showPopove)

// 设置loginType  Reducer
const loginTypeReducer = handleActions<string>({
    [types.LOGIN_TYPE]:(state:any,action:any) => action.payload
},loginType)

// 设置toast状态
const toastReducer = handleActions<IToastMsg>({
    [types.TOAST_STAUS]:(state:any,action:any) => {
        console.log(action,'handleActions')
       return  ({...action.payload})
    }
},toastMsg)

export default {
    loginTypeReducer,
    popoveReducer,
    toastReducer,
    tokenReducer,
    userReducer,
}
