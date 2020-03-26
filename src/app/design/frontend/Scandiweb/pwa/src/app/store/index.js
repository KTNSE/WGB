import {
    createStore, combineReducers
} from 'redux';

import { reducers as SourceReducers } from 'SourceStore/index';
import { ContactFormReducer } from 'Store/ContactForm';
import { SliderReducer } from 'Store/Slider';

export const reducers = {
    ...SourceReducers,
    ContactFormReducer,
    SliderReducer
};

const store = createStore(
    combineReducers(reducers),
    ( // enable Redux dev-tools only in development
        process.env.NODE_ENV === 'development'
        && window.__REDUX_DEVTOOLS_EXTENSION__
    ) && window.__REDUX_DEVTOOLS_EXTENSION__({
        trace: true
    })
);

export default store;
