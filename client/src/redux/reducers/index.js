import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import authReducer from './authReducer';

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history), //connected-react-router를 사용할 connectRouter을 router로 사용
    auth: authReducer,
    //향후에 router  이름 명명...
});

export default createRootReducer;