import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import authSaga from './authSaga';
import postSaga from './postSaga';

import dotenv from 'dotenv';
dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_BASIC_SERVER_URL

export default function* rootSaga() { //function* 제너레이터함수로 여러개 함수를 반환한다.
    yield all([fork(authSaga), fork(postSaga)]);
};