import firebase from 'firebase/app';
import React from 'react';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createStore as reduxCreateStore } from 'redux';
import { createFirestoreInstance } from 'redux-firestore';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/functions';

import rootReducer from '../reducers';

const fbConfig = {
  apiKey: 'AIzaSyC-qiJJ9Ieefga2yLO4N85YWGROAvp1tnY',
  authDomain: 'manonet-7f714.firebaseapp.com',
  databaseURL: 'https://manonet-7f714.firebaseio.com',
  projectId: 'manonet-7f714',
  storageBucket: 'manonet-7f714.appspot.com',
  messagingSenderId: '146446290915',
  appId: '1:146446290915:web:64ebb044905d5e98d11ad6',
  measurementId: 'G-J0XT56TPFZ',
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Initialize firebase instance
firebase.initializeApp(fbConfig);
// Initialize other services on firebase instance
firebase.firestore(); // <- needed if using firestore
firebase.functions(); // <- needed if using httpsCallable

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const createStore = () => reduxCreateStore(persistedReducer);

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => {
  // Instantiating store in `wrapRootElement` handler ensures:
  //  - there is fresh store for each SSR page
  //  - it will be called only once in browser, when React mounts
  const store = reduxCreateStore(rootReducer, {});
  const persistor = persistStore(store);

  const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance, // <- needed if using firestore
  };

  console.info('Happy hacking! (۶ૈ ಠ益ಠ)۶ૈ=͟͟͞͞ ⌨');

  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        {element}
        {/* </PersistGate> */}
      </ReactReduxFirebaseProvider>
    </Provider>
  );
};
