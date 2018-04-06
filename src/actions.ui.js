export const SET_MARKER_POSITION = 'SET_MARKER_POSITION';
export const CLEAR_MARKER_POSITION = 'CLEAR_MARKER_POSITION';

export function setMarkerPosition(payload) {
    return {
        type: SET_MARKER_POSITION,
        payload,
    };
}

export function clearMarkerPosition() {
    return {
        type: CLEAR_MARKER_POSITION,
    };
}
