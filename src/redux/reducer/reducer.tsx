import { combineReducers } from 'redux';
import handleAction from "../actions/handleAction";
const rootReduce = combineReducers({
    // 创建的action任务需要在这里添加
    loginType    :   handleAction.loginTypeReducer as any,
    showPopove   :   handleAction.popoveReducer as any,
    toast        :   handleAction.toastReducer as any,
    token        :   handleAction.tokenReducer as any,
    user         :   handleAction.userReducer  as any,
    
})

export default rootReduce;
