import axios from 'axios';
import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import {
    CLEAR_ERROR_FAILURE,
    CLEAR_ERROR_REQUEST,
    CLEAR_ERROR_SUCCESS,
    LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS,
    LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    USER_LOADING_FAILURE, USER_LOADING_REQUEST, USER_LOADING_SUCCESS
} from '../types';

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
};

function* watchlogout() {
    yield takeEvery(LOGOUT_REQUEST, logout); //매번 감시
};

//USER LOADING
const userLoadingAPI = (token) => {
    console.log(token);
    const config = {
        headers: {
            "Content-Type": "application/json" //postman에서의 설정
        },
    };
    if (token) {
        config.headers["x-auth-token"] = token
    };
    return axios.get('api/auth/user', config);
};

function* userLoading(action) {
    try {
        console.log(action, "UserLoading");
        const result = yield call(userLoadingAPI, action.payload)

        yield put({
            type: USER_LOADING_SUCCESS,
            payload: result.data
        })
    } catch (e) {
        yield put({
            type: USER_LOADING_FAILURE,
            payload: e.response
        });
    }
};

function* watchuserLoading() {
    yield takeEvery(USER_LOADING_REQUEST, userLoading) //매번 감시
};

//REGISTER
const registerUserAPI = (req) => {
    console.log(req, "req");

    return axios.post('api/user', req);
};

function* registerUser(action) {
    try {
        const result = yield call(registerUserAPI, action.payload);
        console.log(result, "RegisterUser Data");
        yield put({
            type: REGISTER_SUCCESS,
            payload: result.data
        })
    } catch (e) {
        yield put({
            type: REGISTER_FAILURE,
            payload: e.response
        })
    }
};

function* watchregisterUser() {
    yield takeEvery(REGISTER_REQUEST, registerUser) //매번 감시
};

//CLEAR ERROR
function* clearError(action) {
    try {
        yield put({
            type: CLEAR_ERROR_SUCCESS,
        });
    } catch (e) {
        yield put({
            type: CLEAR_ERROR_FAILURE,
        });
    }
};

function* watchclearError() {
    yield takeEvery(CLEAR_ERROR_REQUEST, clearError) //매번 감시
};

export default function* authSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchlogout),
        fork(watchuserLoading),
        fork(watchregisterUser),
        fork(watchclearError),

    ]);
};
