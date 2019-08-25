import { handleActions  } from "redux-actions";
import {  showPopove ,token, user } from "../state/state";
import types from "../types/typs";

import { IUser } from 'src/components/Type/Type';

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

export default {
    popoveReducer,
    tokenReducer,
    userReducer,
}
