import { handleActions, Action  } from "redux-actions";
import { showPopove, token, user, loginType, toastMsg, targetPage} from "../state/state";
import types from "../types/typs";

import { IUser, IToastMsg } from 'src/components/Type/Type';
import { ShowPopoveType } from 'src/components/Type/ReduxType';

// 设置token  Reducer
const tokenReducer = handleActions<string>({
    [types.TOKEN]:(state: string,action: Action<string>) => action.payload
},token)

// 设置user Reducer
const userReducer = handleActions<IUser>({
    [types.USER_MSG]: (state: IUser, action: Action<IUser>) => ({...action.payload})
},user)

// 设置popove Reducer
const popoveReducer = handleActions<ShowPopoveType>({
    [types.POPOVE_STATE]:(state:ShowPopoveType,action:Action<ShowPopoveType>) => {
        // tslint:disable-next-line:no-console
        // console.log(action.payload,state,"handeActions")
        // state = action.payload;
        return ({...action.payload})
    }
},showPopove)

// 设置loginType  Reducer
const loginTypeReducer = handleActions<string>({
    [types.LOGIN_TYPE]:(state:string,action:Action<string>) => action.payload
},loginType)

// 设置toast状态
const toastReducer = handleActions<IToastMsg>({
    [types.TOAST_STAUS]: (state: IToastMsg, action: Action<IToastMsg>) => {
        // console.log(action,'handleActions')
       return  ({...action.payload})
    }
},toastMsg)

// 当前页面路由
const targetPageReducer = handleActions<string>({
    [types.TARGET_PAGE]: (state: string, action: Action<string>) => action.payload
},targetPage)

export default {
    loginTypeReducer,
    popoveReducer,
    toastReducer,
    tokenReducer,
    userReducer,
    targetPageReducer
}
