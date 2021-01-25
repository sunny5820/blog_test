import { all } from 'redux-saga/effects';

export default function* rootSaga() { //function* 제너레이터함수로 여러개 함수를 반환한다.
    yield all([]);
}