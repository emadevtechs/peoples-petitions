import { fork, all } from 'redux-saga/effects';
import UserSagas from './userSagas';
import PostSagas from './postSagas';
import AdminSagas from './adminSagas';

export default function* root() {
  yield all([fork(UserSagas)]);
  yield all([fork(PostSagas)]);
  yield all([fork(AdminSagas)]);
}
