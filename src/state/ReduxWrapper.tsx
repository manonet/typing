import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createStore as reduxCreateStore } from 'redux';

import rootReducer from '../reducers';

const createStore = () => {
  if (typeof window === 'object') {
    return reduxCreateStore(
      rootReducer,
      (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    );
  }

  return reduxCreateStore(rootReducer /* TODO - , initialState */);
};

// TODO what's the proper type?
export default ({ element }: { element: ReactNode }) => {
  // Instantiating store in `wrapRootElement` handler ensures:
  //  - there is fresh store for each SSR page
  //  - it will be called only once in browser, when React mounts
  const store = createStore();

  console.info('Happy hacking! (۶ૈ ಠ益ಠ)۶ૈ=͟͟͞͞ ⌨');

  return <Provider store={store}>{element}</Provider>;
};
