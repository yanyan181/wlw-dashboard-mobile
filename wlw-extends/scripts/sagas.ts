import { takeEvery, call, put, delay } from "redux-saga/effects";
import { getCastList } from "./actions";

import { mycast, castDetail, CastData } from "./util";
import { storeCastList, pushCastDetail, completeGetCastList } from "./actions";

import { createCastData } from "./createCastData";

function* handleGetCastList(action: ReturnType<typeof getCastList>) {
  const { payload, error } = yield call(mycast);
  if (payload && !error) {
    yield put(storeCastList(payload));
    for (const cast of payload.cast) {
      //TODO エラーハンドリング
      const castDom: Document = yield call(castDetail, cast.id);
      const castData: CastData = yield createCastData(
        castDom,
        cast.id,
        cast.na,
        cast.crc >= 4 ? String(+cast.cr + 100) : String(+cast.cr),
        cast.ci,
        cast.rt
      );
      yield delay(500);
      yield put(pushCastDetail({ castData }));
    }
    yield put(completeGetCastList({}));
  } else {
    //TODO エラーハンドリング
  }
}

function* execGetCastListSaga() {
  yield takeEvery("GET_CAST_LIST", handleGetCastList);
}

export default execGetCastListSaga;
