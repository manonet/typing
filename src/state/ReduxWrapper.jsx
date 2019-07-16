import React from 'react'
import { Provider } from 'react-redux'
import { createStore as reduxCreateStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { PersistGate } from 'redux-persist/integration/react'

import rootReducer from '../reducers'
import initialState from './initialState'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const createStore = () => reduxCreateStore(persistedReducer)


// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => {
  // Instantiating store in `wrapRootElement` handler ensures:
  //  - there is fresh store for each SSR page
  //  - it will be called only once in browser, when React mounts
  const store = createStore()
  const persistor = persistStore(store)

  return <Provider store={store}><PersistGate loading={null} persistor={persistor}>{element}</PersistGate></Provider>
}
