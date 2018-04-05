import {
    combineReducers,
} from 'redux';

const initialAppState = {};

function app(state = initialAppState, { type }) {
    switch (type) {
        default:
            return state;
    }
}

export default combineReducers({
    app,
});
