import { call, put, takeLatest } from "redux-saga/effects";
import { Event, getAllEvents, getAllEventsSuccess } from "./eventSlice";

const URL = "https://run.mocky.io/v3/86ba5ad4-c45e-4f3d-9a07-83ce9a345833";

async function fetchAllEventsApi() {
  const response = await fetch(URL);
  const data = await response.json();

  return data;
}

function* fetchAllEvents() {
  try {
    const response: Event[] = yield call(fetchAllEventsApi);
    yield put(getAllEventsSuccess(response));
  } catch (error) {
    console.log(`Failed to fetch city list`, error);
  }
}

export default function* citySaga() {
  yield takeLatest(getAllEvents.type, fetchAllEvents);
}
