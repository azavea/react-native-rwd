export const rwdAPIkey = process.env.RWD_API_KEY;

const rwdAPIurl = process.env.RWD_API_URL;
export const watershedURL = `${rwdAPIurl}/watershed/`;
export const landURL = `${rwdAPIurl}/analyze/land/`;
export const soilURL = `${rwdAPIurl}/analyze/soil/`;
export const climateURL = `${rwdAPIurl}/analyze/climate/`;
export const terrainURL = `${rwdAPIurl}/analyze/terrain/`;
export const streamsURL = `${rwdAPIurl}/analyze/streams/`;

export function makeJobsUrl(id) {
    return `${rwdAPIurl}/jobs/${id}/`;
}

export const pollingInterval = 2000;
export const jobStartedStatus = 'started';

export const jobRequestTypes = {
    land: 'land',
    soil: 'soil',
    climate: 'climate',
    terrain: 'terrain',
    streams: 'streams',
};

export const initialMapRegion = {
    latitude: 39.961524,
    longitude: -75.154567,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
};

export const polygonZoomPadding = {
    top: 20,
    right: 20,
    bottom: 40,
    left: 20,
};

export const watershedFillColor = 'rgba(0, 0, 255, 0.2)';
