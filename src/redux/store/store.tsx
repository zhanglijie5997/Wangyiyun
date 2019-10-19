import { applyMiddleware, Store } from 'redux';

import { createStore } from 'redux';

import  thunkMiddleware  from "redux-thunk";

import { routerMiddleware } from 'react-router-redux';

import { History } from 'history';

import rootReduce from "../reducer/reducer";

function configureStore(history:History,initalState?: string):Store {
    const middleware = applyMiddleware(
        thunkMiddleware,
        routerMiddleware(history)
    )
    // 创建其他的reducer只需要往里面添加就可以
    return createStore(
        rootReduce,
        middleware 
    ) as Store
}

export default configureStore;
