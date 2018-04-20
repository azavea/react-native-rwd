import { Clipboard, Vibration } from 'react-native';

import {
    jobRequestTypes,
} from './constants';

export const SET_MARKER_POSITION = 'SET_MARKER_POSITION';
export const CLEAR_MARKER_POSITION = 'CLEAR_MARKER_POSITION';
export const SHOW_ANALYSIS_VIEW = 'SHOW_ANALYSIS_VIEW';
export const HIDE_ANALYSIS_VIEW = 'HIDE_ANALYSIS_VIEW';
export const CHANGE_VISIBLE_ANALYSIS_VIEW = 'CHANGE_VISIBLE_ANALYSIS_VIEW';
export const COPY_WATERSHED_TO_CLIPBOARD = 'COPY_WATERSHED_TO_CLIPBOARD';

export function setMarkerPosition(payload) {
    Vibration.vibrate([400]);

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

export function showAnalysisView() {
    return {
        type: SHOW_ANALYSIS_VIEW,
    };
}

export function hideAnalysisView() {
    return {
        type: HIDE_ANALYSIS_VIEW,
    };
}

export function changeVisibleAnalysisView(index) {
    return {
        type: CHANGE_VISIBLE_ANALYSIS_VIEW,
        payload: Object.values(jobRequestTypes)[index],
    };
}

export function copyWatershedToClipboard() {
    return (dispatch, getState) => {
        const {
            data: {
                watershed: {
                    data,
                },
            },
        } = getState();

        Clipboard
            .setString(JSON.stringify(data));

        return dispatch({
            type: COPY_WATERSHED_TO_CLIPBOARD,
        });
    }
}
