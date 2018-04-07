import {
    START_FETCH_WATERSHED,
    FAIL_FETCH_WATERSHED,
    COMPLETE_FETCH_WATERSHED,
    START_FETCH_LAND,
    FAIL_FETCH_LAND,
    COMPLETE_FETCH_LAND,
    START_FETCH_SOIL,
    FAIL_FETCH_SOIL,
    COMPLETE_FETCH_SOIL,
    START_FETCH_TERRAIN,
    FAIL_FETCH_TERRAIN,
    COMPLETE_FETCH_TERRAIN,
    START_FETCH_CLIMATE,
    FAIL_FETCH_CLIMATE,
    COMPLETE_FETCH_CLIMATE,
    START_FETCH_STREAMS,
    FAIL_FETCH_STREAMS,
    COMPLETE_FETCH_STREAMS,
    CLEAR_SHAPE,
} from './actions.data';

const initialState = {
    watershed: {
        data: null,
        fetching: false,
        error: false,
    },
    land: {
        data: null,
        fetching: false,
        error: false,
    },
    soil: {
        data: null,
        fetching: false,
        error: false,
    },
    terrain: {
        data: null,
        fetching: false,
        error: false,
    },
    climate: {
        data: null,
        fetching: false,
        error: false,
    },
    streams: {
        data: null,
        fetching: false,
        error: false,
    },
};

export default function dataReducer(state = initialState, { type, payload }) {
    switch (type) {
        case CLEAR_SHAPE:
            return initialState;
        case START_FETCH_WATERSHED:
            return {
                ...state,
                watershed: {
                    ...state.watershed,
                    fetching: true,
                    data: null,
                },
                soil: initialState.soil,
                land: initialState.land,
                terrain: initialState.terrain,
                climate: initialState.climate,
                streams: initialState.streams,
            };
        case FAIL_FETCH_WATERSHED:
            return {
                ...state,
                watershed: {
                    ...state.watershed,
                    fetching: false,
                    error: true,
                },
            };
        case COMPLETE_FETCH_WATERSHED:
            return {
                ...state,
                watershed: {
                    ...state.watershed,
                    fetching: false,
                    data: payload,
                },
            };
        case START_FETCH_LAND:
            return {
                ...state,
                land: {
                    ...state.land,
                    fetching: true,
                    data: null,
                },
            };
        case FAIL_FETCH_LAND:
            return {
                ...state,
                land: {
                    ...state.land,
                    fetching: false,
                    error: true,
                },
            };
        case COMPLETE_FETCH_LAND:
            return {
                ...state,
                land: {
                    ...state.land,
                    fetching: false,
                    data: payload,
                },
            };
        case START_FETCH_SOIL:
            return {
                ...state,
                soil: {
                    ...state.soil,
                    fetching: true,
                    data: null,
                },
            };
        case FAIL_FETCH_SOIL:
            return {
                ...state,
                soil: {
                    ...state.soil,
                    fetching: false,
                    error: true,
                },
            };
        case COMPLETE_FETCH_SOIL:
            return {
                ...state,
                soil: {
                    ...state.soil,
                    fetching: false,
                    data: payload,
                },
            };
        case START_FETCH_TERRAIN:
            return {
                ...state,
                terrain: {
                    ...state.terrain,
                    fetching: true,
                    data: null,
                },
            };
        case FAIL_FETCH_TERRAIN:
            return {
                ...state,
                terrain: {
                    ...state.terrain,
                    fetching: false,
                    error: true,
                },
            };
        case COMPLETE_FETCH_TERRAIN:
            return {
                ...state,
                terrain: {
                    ...state.terrain,
                    fetching: false,
                    data: payload,
                },
            };
        case START_FETCH_CLIMATE:
            return {
                ...state,
                climate: {
                    ...state.climate,
                    fetching: true,
                    data: null,
                },
            };
        case FAIL_FETCH_CLIMATE:
            return {
                ...state,
                climate: {
                    ...state.climate,
                    fetching: false,
                    error: true,
                },
            };
        case COMPLETE_FETCH_CLIMATE:
            return {
                ...state,
                climate: {
                    ...state.climate,
                    fetching: false,
                    data: payload,
                },
            };
        case START_FETCH_STREAMS:
            return {
                ...state,
                streams: {
                    ...state.streams,
                    fetching: true,
                    data: null,
                },
            };
        case FAIL_FETCH_STREAMS:
            return {
                ...state,
                streams: {
                    ...state.streams,
                    fetching: false,
                    error: true,
                },
            };
        case COMPLETE_FETCH_STREAMS:
            return {
                ...state,
                streams: {
                    ...state.streams,
                    fetching: false,
                    data: payload,
                },
            };
        default:
            return state;
    }
}
