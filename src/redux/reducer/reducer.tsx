import { combineReducers } from 'redux';
import handleAction from "../actions/handleAction";
const rootReduce = combineReducers({
    // 创建的action任务需要在这里添加
    loginType    :   handleAction.loginTypeReducer ,
    showPopove   :   handleAction.popoveReducer ,
    toast        :   handleAction.toastReducer,
    token        :   handleAction.tokenReducer ,
    user         :   handleAction.userReducer,
    
})

export default rootReduce;
