import {
    SET_MARKER_POSITION,
    CLEAR_MARKER_POSITION,
    SHOW_ANALYSIS_VIEW,
    HIDE_ANALYSIS_VIEW,
} from './actions.ui';

import {
    CLEAR_SHAPE,
} from './actions.data';

const initialState = {
    markerPosition: null,
    analysisViewVisible: false,
};

export default function ui(state = initialState, { type, payload }) {
    switch (type) {
        case CLEAR_SHAPE:
            return initialState;
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
        case SHOW_ANALYSIS_VIEW:
            return {
                ...state,
                analysisViewVisible: true,
            };
        case HIDE_ANALYSIS_VIEW:
            return {
                ...state,
                analysisViewVisible: false,
            };
        default:
            return state;
    }
}
