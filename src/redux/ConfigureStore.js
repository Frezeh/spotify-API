import { createStore, combineReducers, applyMiddleware } from 'redux';
import { library } from './Reducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            library: library,
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}