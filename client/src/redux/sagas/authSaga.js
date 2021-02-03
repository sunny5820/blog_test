import axios from 'axios';
import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS } from '../types';

//LOGIN
const loginUserAPI = (loginData) => {
    console.log(loginData, "loginData");
    const config = {
        headers: {
            "Content-Type": "application/json" //postman에서의 설정
        }
    }
    return axios.post('api/auth', loginData, config)
};

function* loginUser(action) {
    try {
        const result = yield call(loginUserAPI, action.payload)
        console.log(result);
        yield put({
            type: LOGIN_SUCCESS,
            payload: result.data
        })
    } catch (e) {
        yield put({
            type: LOGIN_FAILURE,
            payload: e.response
        })
    }
};

function* watchLoginUser() {
    yield takeEvery(LOGIN_REQUEST, loginUser) //매번 감시
};

//LOGOUT
function* logout(action) {
    try {
        yield put({
            type: LOGOUT_SUCCESS,
        });
    } catch (e) {
        yield put({
            type: LOGOUT_FAILURE,
        });
        console.log(e);
    }
}

function* watchlogout() {
    yield takeEvery(LOGOUT_REQUEST, logout); //매번 감시
};

export default function* authSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchlogout),
    ])
};
