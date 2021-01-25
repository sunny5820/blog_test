import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import createRootReducer from './redux/reducers/index';
import rootSaga from './redux/sagas/index';

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const initialState = {};//초기상태값 0

const middlewares = [sagaMiddleware, routerMiddleware(history)];
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE_;

const composeEnhancer = process.env.NODE_ENV === "production" ? compose : devtools || compose;

const store = createStore(   //store를 만들어주세요
    createRootReducer(history),
    initialState,
    composeEnhancer(applyMiddleware(...middlewares)) //middlewares를 얕은 복사해서
);
sagaMiddleware.run(rootSaga);  //sagaMiddleware를 작동해주세요

export default store;