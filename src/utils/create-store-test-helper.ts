import { applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

const setupStore = (initialState: object): Store =>
  createStore(rootReducer, { ...initialState }, applyMiddleware(thunk));

export default setupStore;
