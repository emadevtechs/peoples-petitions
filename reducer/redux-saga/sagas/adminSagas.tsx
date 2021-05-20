import {
    all,
    fork,
    race,
    call,
    put,
    takeLatest,
    select,
  } from 'redux-saga/effects';
  import * as Admin from '../modules/admin';
  import {
    adminLoginUtils
  } from '../../Utils/Admin';

  export function* adminLoginSaga(action: any) {
    const params = action.payload;
    console.log('........ saga calling',params)
    try {
      const {response} = yield race({
        response: call(adminLoginUtils, params),
      });
      if (response && response.message === "District login Successfully") {
        yield put(
          Admin.actions.adminLoginSuccess({
            data: response,
          }),
        );
      } else {
        yield put(
          Admin.actions.adminLoginFailure({data: {message: response.message, data: null}}),
        );
      }
    } catch (err) {
      yield put(
        Admin.actions.adminLoginFailure({message: 'Fetch failure'}),
      );
    }
  }



  export function* watchadminLogin() {
    yield takeLatest(
      Admin.constants.ADMIN_LOGIN,
      adminLoginSaga,
    );
  }

  
  export default function* root() {
    yield all([
      fork(watchadminLogin),
    ]);
  }
  