import { Location, Permissions } from 'expo';
import axios, { CancelToken } from 'axios';

import {
    rwdAPIkey,
    watershedURL,
    landURL,
    soilURL,
    climateURL,
    terrainURL,
    streamsURL,
    makeJobsUrl,
    pollingInterval,
    jobStartedStatus,
    jobRequestTypes,
} from './constants';

import {
    setMarkerPosition,
} from './actions.ui';

const axiosOptions = {
    headers: {
        Authorization: rwdAPIkey,
    },
};

export const START_FETCH_WATERSHED = 'START_FETCH_WATERSHED';
export const FAIL_FETCH_WATERSHED = 'FAIL_FETCH_WATERSHED';
export const COMPLETE_FETCH_WATERSHED = 'COMPLETE_FETCH_WATERSHED';

export const START_FETCH_LAND = 'START_FETCH_LAND';
export const FAIL_FETCH_LAND = 'FAIL_FETCH_LAND';
export const COMPLETE_FETCH_LAND = 'COMPLETE_FETCH_LAND';

export const START_FETCH_SOIL = 'START_FETCH_SOIL';
export const FAIL_FETCH_SOIL = 'FAIL_FETCH_SOIL';
export const COMPLETE_FETCH_SOIL = 'COMPLETE_FETCH_SOIL';

export const START_FETCH_CLIMATE = 'START_FETCH_CLIMATE';
export const FAIL_FETCH_CLIMATE = 'FAIL_FETCH_CLIMATE';
export const COMPLETE_FETCH_CLIMATE = 'COMPLETE_FETCH_CLIMATE';

export const START_FETCH_TERRAIN = 'START_FETCH_TERRAIN';
export const FAIL_FETCH_TERRAIN = 'FAIL_FETCH_TERRAIN';
export const COMPLETE_FETCH_TERRAIN = 'COMPLETE_FETCH_TERRAIN';

export const START_FETCH_STREAMS = 'START_FETCH_STREAMS';
export const FAIL_FETCH_STREAMS = 'FAIL_FETCH_STREAMS';
export const COMPLETE_FETCH_STREAMS = 'COMPLETE_FETCH_STREAMS';

export const CLEAR_SHAPE = 'CLEAR_SHAPE';

let cancelWatershedRequest = null;
let cancelSoilRequest = null;
let cancelLandRequest = null;
let cancelClimateRequest = null;
let cancelStreamsRequest = null;
let cancelTerrainRequest = null;

function maybeCancelPriorRequest(type) {
    switch (type) {
        case jobRequestTypes.watershed:
            if (!cancelWatershedRequest) {
                return null;
            }

            cancelWatershedRequest('Canceling watershed request');
            cancelWatershedRequest = null;

            return null;
        case jobRequestTypes.soil:
            if (!cancelSoilRequest) {
                return null;
            }

            cancelSoilRequest('Canceling soil request');
            cancelSoilRequest = null;

            return null;
        case jobRequestTypes.land:
            if (!cancelLandRequest) {
                return null;
            }

            cancelLandRequest('Canceling land request');
            cancelLandRequest = null;

            return null;
        case jobRequestTypes.climate:
            if (!cancelClimateRequest) {
                return null;
            }

            cancelClimateRequest('Canceling climate request');
            cancelClimateRequest = null;

            return null;
        case jobRequestTypes.streams:
            if (!cancelStreamsRequest) {
                return null;
            }

            cancelStreamsRequest('Canceling streams request');
            cancelStreamsRequest = null;
            return null;
        case jobRequestTypes.terrain:
            if (!cancelTerrainRequest) {
                return null;
            }

            cancelTerrainRequest('Canceling terrain request');
            cancelTerrainRequest = null;

            return null;
        default:
            throw new Error('invalid request type');
    }
}

function maybeCancelAllPriorRequests() {
    maybeCancelPriorRequest(jobRequestTypes.watershed);
    maybeCancelPriorRequest(jobRequestTypes.soil);
    maybeCancelPriorRequest(jobRequestTypes.land);
    maybeCancelPriorRequest(jobRequestTypes.climate);
    maybeCancelPriorRequest(jobRequestTypes.streams);
    maybeCancelPriorRequest(jobRequestTypes.terrain);
}

function startFetchWatershed() {
    return {
        type: START_FETCH_WATERSHED,
    };
}

function failFetchWatershed() {
    return {
        type: FAIL_FETCH_WATERSHED,
    };
}

function completeFetchWatershed({ result: payload }) {
    return {
        type: COMPLETE_FETCH_WATERSHED,
        payload,
    };
}

function startFetchLand() {
    return {
        type: START_FETCH_LAND,
    };
}

function failFetchLand() {
    return {
        type: FAIL_FETCH_LAND,
    };
}

function completeFetchLand({ result: payload }) {
    return {
        type: COMPLETE_FETCH_LAND,
        payload,
    };
}

function startFetchSoil() {
    return {
        type: START_FETCH_SOIL,
    };
}

function failFetchSoil() {
    return {
        type: FAIL_FETCH_SOIL,
    };
}

function completeFetchSoil({ result: payload }) {
    return {
        type: COMPLETE_FETCH_SOIL,
        payload,
    };
}

function startFetchClimate() {
    return {
        type: START_FETCH_CLIMATE,
    };
}

function failFetchClimate() {
    return {
        type: FAIL_FETCH_CLIMATE,
    };
}

function completeFetchClimate({ result: payload }) {
    return {
        type: COMPLETE_FETCH_CLIMATE,
        payload,
    };
}

function startFetchTerrain() {
    return {
        type: START_FETCH_TERRAIN,
    };
}

function failFetchTerrain() {
    return {
        type: FAIL_FETCH_TERRAIN,
    };
}

function completeFetchTerrain({ result: payload }) {
    return {
        type: COMPLETE_FETCH_TERRAIN,
        payload,
    };
}

function startFetchStreams() {
    return {
        type: START_FETCH_STREAMS,
    };
}

function failFetchStreams() {
    return {
        type: FAIL_FETCH_STREAMS,
    };
}

function completeFetchStreams({ result: payload }) {
    return {
        type: COMPLETE_FETCH_STREAMS,
        payload,
    };
}

function pollJobUrl(jobId, jobType, count = 1) {
    /* eslint-disable no-console */
    console.log(`polling for ${jobType} at ${jobId} attempt ${count}`);
    /* eslint-enable no-console */

    return dispatch =>
        axios
            .get(
                makeJobsUrl(jobId),
                {
                    ...axiosOptions,
                },
            )
            .then(({ data }) => {
                if (data.status === jobStartedStatus) {
                    return setTimeout(
                        () => dispatch(pollJobUrl(jobId, jobType, count + 1)),
                        pollingInterval,
                    );
                }

                switch (jobType) {
                    case jobRequestTypes.watershed:
                        return dispatch(completeFetchWatershed(data));
                    case jobRequestTypes.land:
                        return dispatch(completeFetchLand(data));
                    case jobRequestTypes.soil:
                        return dispatch(completeFetchSoil(data));
                    case jobRequestTypes.terrain:
                        return dispatch(completeFetchTerrain(data));
                    case jobRequestTypes.climate:
                        return dispatch(completeFetchClimate(data));
                    case jobRequestTypes.streams:
                        return dispatch(completeFetchStreams(data));
                    default:
                        throw new Error('Invalid job request type');
                }
            })
            .catch(() => {
                switch (jobType) {
                    case jobRequestTypes.watershed:
                        return dispatch(failFetchWatershed());
                    case jobRequestTypes.land:
                        return dispatch(failFetchLand());
                    case jobRequestTypes.soil:
                        return dispatch(failFetchSoil());
                    case jobRequestTypes.terrain:
                        return dispatch(failFetchTerrain());
                    case jobRequestTypes.climate:
                        return dispatch(failFetchClimate());
                    case jobRequestTypes.straems:
                        return dispatch(failFetchStreams());
                    default:
                        throw new Error('Invalid job request type');
                }
            });
}

export function fetchWatershed({ lat, lng }) {
    return (dispatch) => {
        maybeCancelAllPriorRequests();
        dispatch(startFetchWatershed());

        return axios
            .post(
                watershedURL,
                {
                    location: [
                        Number(lat),
                        Number(lng),
                    ],
                    snappingOn: true,
                    dataSource: 'nhd',
                },
                {
                    ...axiosOptions,
                    cancelToken: new CancelToken((c) => { cancelWatershedRequest = c; }),
                },
            )
            .then(({ data: { job } }) =>
                dispatch(pollJobUrl(job, jobRequestTypes.watershed)))
            .catch(() => dispatch(failFetchWatershed()));
    };
}

export function fetchSoil() {
    return (dispatch, getState) => {
        maybeCancelPriorRequest(jobRequestTypes.soil);
        dispatch(startFetchSoil());

        const {
            data: {
                watershed: {
                    data: {
                        watershed,
                    } = {},
                },
            },
        } = getState();

        return !watershed ?
            dispatch(failFetchSoil()) :
            axios
                .post(
                    soilURL,
                    watershed,
                    {
                        ...axiosOptions,
                        cancelToken: new CancelToken((c) => { cancelSoilRequest = c; }),
                    },
                )
                .then(({ data: { job } }) =>
                    dispatch(pollJobUrl(job, jobRequestTypes.soil)))
                .catch(() => dispatch(failFetchSoil()));
    };
}

export function fetchLand() {
    return (dispatch, getState) => {
        maybeCancelPriorRequest(jobRequestTypes.land);
        dispatch(startFetchLand());

        const {
            data: {
                watershed: {
                    data: {
                        watershed,
                    } = {},
                },
            },
        } = getState();

        return !watershed ?
            dispatch(failFetchLand()) :
            axios
                .post(
                    landURL,
                    watershed,
                    {
                        ...axiosOptions,
                        cancelToken: new CancelToken((c) => { cancelLandRequest = c; }),
                    },
                )
                .then(({ data: { job } }) =>
                    dispatch(pollJobUrl(job, jobRequestTypes.land)))
                .catch(() => dispatch(failFetchLand()));
    };
}

export function fetchClimate() {
    return (dispatch, getState) => {
        maybeCancelPriorRequest(jobRequestTypes.climate);
        dispatch(startFetchClimate());

        const {
            data: {
                watershed: {
                    data: {
                        watershed,
                    } = {},
                },
            },
        } = getState();

        return !watershed ?
            dispatch(failFetchClimate()) :
            axios
                .post(
                    climateURL,
                    watershed,
                    {
                        ...axiosOptions,
                        cancelToken: new CancelToken((c) => { cancelClimateRequest = c; }),
                    },
                )
                .then(({ data: { job } }) =>
                    dispatch(pollJobUrl(job, jobRequestTypes.climate)))
                .catch(() => dispatch(failFetchClimate()));
    };
}

export function fetchTerrain() {
    return (dispatch, getState) => {
        maybeCancelPriorRequest(jobRequestTypes.terrain);
        dispatch(startFetchTerrain());

        const {
            data: {
                watershed: {
                    data: {
                        watershed,
                    } = {},
                },
            },
        } = getState();

        return !watershed ?
            dispatch(failFetchTerrain()) :
            axios
                .post(
                    terrainURL,
                    watershed,
                    {
                        ...axiosOptions,
                        cancelToken: new CancelToken((c) => { cancelTerrainRequest = c; }),
                    },
                )
                .then(({ data: { job } }) =>
                    dispatch(pollJobUrl(job, jobRequestTypes.terrain)))
                .catch(() => dispatch(failFetchTerrain()));
    };
}

export function fetchStreams() {
    return (dispatch, getState) => {
        maybeCancelPriorRequest(jobRequestTypes.streams);
        dispatch(startFetchStreams());

        const {
            data: {
                watershed: {
                    data: {
                        watershed,
                    } = {},
                },
            },
        } = getState();

        return !watershed ?
            dispatch(failFetchStreams()) :
            axios
                .post(
                    streamsURL,
                    watershed,
                    {
                        ...axiosOptions,
                        cancelToken: new CancelToken((c) => { cancelStreamsRequest = c; }),
                    },
                )
                .then(({ data: { job } }) =>
                    dispatch(pollJobUrl(job, jobRequestTypes.streams)))
                .catch(() => dispatch(failFetchStreams()));
    };
}

export function clearShape() {
    maybeCancelAllPriorRequests();

    return {
        type: CLEAR_SHAPE,
    };
}

// TODO use async/await
export function fetchUserLocationForWatershed() {
    return dispatch =>
        Permissions
            .askAsync(Permissions.LOCATION)
            .then(() => Location
                .getCurrentPositionAsync()
                .then(({
                    coords: {
                        latitude,
                        longitude,
                    },
                }) => {
                    dispatch(setMarkerPosition({ latitude, longitude }));
                    return dispatch(fetchWatershed({
                        lat: latitude,
                        lng: longitude,
                    }));
                }))
            .catch(() => dispatch(failFetchWatershed()));
}
