import { all } from "redux-saga/effects";
import eventSaga from "../features/event/eventSaga";

export default function* rootSaga() {
  yield all([eventSaga()]);
}
