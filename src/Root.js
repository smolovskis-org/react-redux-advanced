import React from 'react';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import reduxPromise from 'redux-promise';
import reducers from 'reducers';

export default ({children, initialState = {}}) => {
    let store = createStore(
        reducers,
        initialState,
        applyMiddleware(reduxPromise)
    );

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}