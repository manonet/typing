import React from 'react'
import { Provider } from 'react-redux'
import { createStore as reduxCreateStore } from 'redux'

import reducers from '../reducers'
import initialState from './initialState'

const createStore = () => reduxCreateStore(reducers, initialState)

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => {
  // Instantiating store in `wrapRootElement` handler ensures:
  //  - there is fresh store for each SSR page
  //  - it will be called only once in browser, when React mounts
  const store = createStore()
  return <Provider store={store}>{element}</Provider>
}
