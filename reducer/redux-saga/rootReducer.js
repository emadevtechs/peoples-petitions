import { combineReducers } from 'redux';
import { userReducer as user } from './modules/user';
import {postReducer as post } from './modules/post';
import {generalReducer as general } from './modules/general';
import {adminReducer as admin} from './modules/admin';

export default combineReducers({
  general,
  user,
  post,
  admin
});
