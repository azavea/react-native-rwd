export default function mapPolygonToLatLngs([outerRing]) {
    return outerRing
        .map(([longitude, latitude]) => ({
            latitude,
            longitude,
        }));
}
