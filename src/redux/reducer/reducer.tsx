import { combineReducers } from 'redux';
import handleAction from "../actions/handleAction";
const rootReduce = combineReducers({
    // 创建的action任务需要在这里添加
    showPopove   :   handleAction.popoveReducer as any,
    token        :   handleAction.tokenReducer as any,
    user         :   handleAction.userReducer  as any,
    
})

export default rootReduce;
