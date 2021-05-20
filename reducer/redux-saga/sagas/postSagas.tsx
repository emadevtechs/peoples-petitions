import {
    all,
    fork,
    race,
    call,
    put,
    takeLatest,
    select,
  } from 'redux-saga/effects';
  import * as Post from '../modules/post';
  import {
    getMyPosts, createNewPost,getPostsByDistrict,updatePost
  } from '../../Utils/Post';
  
  
  export function* getMyPostSaga(action: any) {
    const params = action.payload;
    try {
      const {response} = yield race({
        response: call(getMyPosts, params),
      });
      if (response && response.message === "Get Post By User Successfully") {
        yield put(
          Post.actions.getMyPostsSuccess({
            data: response,
          }),
        );
      } else {
        yield put(
          Post.actions.getMyPostsFailure({message: response.message, data: null}),
        );
      }
    } catch (err) {
      yield put(
        Post.actions.getMyPostsFailure({message: 'Fetch failure'}),
      );
    }
  }

  export function* getPostByDistrictSaga(action: any) {
    const params = action.payload;
    try {
      const {response} = yield race({
        response: call(getPostsByDistrict, params),
      });
      if (response && response.message === "Get Post By District Successfully") {
        yield put(
          Post.actions.getPostsByDistrictSuccess({
            data: response,
          }),
        );
      } else {
        yield put(
          Post.actions.getPostsByDistrictFailure({message: response.message, data: null}),
        );
      }
    } catch (err) {
      yield put(
        Post.actions.getPostsByDistrictFailure({message: 'Fetch failure'}),
      );
    }
  }

  export function* createMyPostSaga(action: any) {
    const params = action.payload;
    try {
      const {response} = yield race({
        response: call(createNewPost, params),
      });
      console.log('create post response', response)
      if (response && response.message === "Create Post Successfully") {
        yield put(
          Post.actions.createMyPostSuccess({
            data: response,
          }),
        );
      } else {
        yield put(
          Post.actions.createMyPostFailure({data:{message: response.message, data: null}}),
        );
      }
    } catch (err) {
      yield put(
        Post.actions.createMyPostFailure({message: 'Fetch failure'}),
      );
    }
  }

  export function* updatePostSaga(action: any) {
    const params = action.payload;
    console.log('update saga calling')
    try {
      const {response} = yield race({
        response: call(updatePost, params),
      });
      console.log('update post response', response)
      if (response && response.message === "Update Post Successfully") {
        yield put(
          Post.actions.updatePostSuccess({
            data: response,
          }),
        );
      } else {
        yield put(
          Post.actions.updatePostFailure({data:{message: response.message, data: null}}),
        );
      }
    } catch (err) {
      yield put(
        Post.actions.updatePostFailure({message: 'Fetch failure'}),
      );
    }
  }

  export function* watchgetMyPost() {
    yield takeLatest(
        Post.constants.GET_MY_POSTS,
      getMyPostSaga,
    );
  }

  export function* watchgetPostByDistrict(){
    yield takeLatest(
      Post.constants.GET_POSTS_BY_DISTRICT,
      getPostByDistrictSaga
    )
  }

  export function* watchcreateMyPost() {
    yield takeLatest(
        Post.constants.CREATE_MY_POST,
      createMyPostSaga,
    );
  }

  export function* watchupdatePost() {
    yield takeLatest(
        Post.constants.UPDATE_POST,
        updatePostSaga,
    );
  }

  export default function* root() {
    yield all([
      fork(watchgetMyPost),
      fork(watchcreateMyPost),
      fork(watchgetPostByDistrict),
      fork(watchupdatePost),
    ]);
  }
  