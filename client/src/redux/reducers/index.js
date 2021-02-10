import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import authReducer from './authReducer';
import postReducer from './postReducer';

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history), //connected-react-router를 사용할 connectRouter을 router로 사용
    auth: authReducer,
    post: postReducer,

});

export default createRootReducer;