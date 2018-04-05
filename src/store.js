import {
    createStore,
    applyMiddleware,
} from 'redux';

import thunk from 'redux-thunk';

import {
    createLogger,
} from 'redux-logger';

const createStoreWithMiddleware =
      applyMiddleware(
          thunk,
          createLogger(),
      )(createStore);

export default createStoreWithMiddleware;
