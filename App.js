import React from 'react';
import { Provider } from 'react-redux';

import createStoreWithMiddleware from './src/store';

import reducers from './src/reducers';

import Main from './src/Main';

export default function App() {
    return (
        <Provider store={createStoreWithMiddleware(reducers)}>
            <Main />
        </Provider>
    );
}
