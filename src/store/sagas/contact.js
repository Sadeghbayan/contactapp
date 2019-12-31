import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios'
import { CONFIG } from '../../Config'
import {
    FETCH_CONTACTS,
    FETCH_CONTACTS_SUCCESS,
    FETCH_CONTACTS_FAILED
} from '../actions/names'

const fetchContactsRequest = () => {
    return axios
        .get( `${CONFIG.userUrl}/?results=${CONFIG.numberCards}`)
        .then(response => response)
        .catch(error => ({ error }));
}


function* fetchContacts() {
    try {
        const requestResponse = yield call(fetchContactsRequest);
        if (requestResponse.error != null) {
            yield put({type: FETCH_CONTACTS_FAILED, message: requestResponse.error});
        } else {
            yield put({type: FETCH_CONTACTS_SUCCESS, data: requestResponse.data});
        }
    } catch (e) {
        yield put({type: FETCH_CONTACTS_FAILED, message: e.message});
    }
}

export default function* contactSaga() {
    yield takeLatest(FETCH_CONTACTS, fetchContacts);
}

