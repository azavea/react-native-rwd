import {
    SET_MARKER_POSITION,
    CLEAR_MARKER_POSITION,
} from './actions.ui';

const initialState = {
    markerPosition: null,
};

export default function ui(state = initialState, { type, payload }) {
    switch (type) {
        case SET_MARKER_POSITION:
            return {
                ...state,
                markerPosition: payload,
            };
        case CLEAR_MARKER_POSITION:
            return {
                ...state,
                markerPosition: null,
            };
        default:
            return state;
    }
}
