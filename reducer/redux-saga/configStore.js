import devTools from 'remote-redux-devtools';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';
import reducer from './rootReducer';

export default function configureStore(onCompletion){
  // ======================================================
  // Middleware Configuration
  // ======================================================

  const middleware = [];
  const sagaMiddleware = createSagaMiddleware(sagas);

  middleware.push(sagaMiddleware);

  const enhancer = compose(
    applyMiddleware(...middleware),
    devTools({
      name: 'foodcourt',
      realtime: true,
    }),
  );
  const store = createStore(reducer, enhancer);

  if (sagaMiddleware) {
    sagaMiddleware.run(sagas);
  }
  return { store };
}
