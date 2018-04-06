import React, { Component } from 'react';
import { func, object } from 'prop-types';
import { MapView } from 'expo';
import { connect } from 'react-redux';

import {
    fetchWatershed,
} from '../actions.data';

import {
    setMarkerPosition,
} from '../actions.ui';

import {
    initialMapRegion,
    polygonZoomPadding,
    watershedFillColor,
} from '../constants';

import mapPolygonToLatLngs from '../utils';

const styles = {
    map: {
        flex: 1,
    },
};

class Map extends Component {
    constructor(props) {
        super(props);
        this.handleLongPress = this.handleLongPress.bind(this);
    }

    componentDidUpdate({ watershed }) {
        if (this.props.watershed && !watershed) {
            this.mapRef.fitToCoordinates(
                mapPolygonToLatLngs(this.props.watershed.geometry.coordinates),
                {
                    animated: true,
                    edgePadding: polygonZoomPadding,
                },
            );
        }
    }

    handleLongPress({
        nativeEvent: {
            coordinate,
        },
    }) {
        const {
            dispatch,
        } = this.props;

        dispatch(setMarkerPosition(coordinate));

        return this.props.dispatch(fetchWatershed({
            lat: coordinate.latitude,
            lng: coordinate.longitude,
        }));
    }

    render() {
        const {
            handleLongPress,
            props: {
                markerPosition,
                watershed,
            },
        } = this;

        const marker = markerPosition ? (
            <MapView.Marker
                coordinate={markerPosition}
                description={JSON.stringify(markerPosition)}
            />) : null;

        const watershedShape = watershed ? (
            <MapView.Polygon
                strokeColor={watershedFillColor}
                fillColor={watershedFillColor}
                coordinates={mapPolygonToLatLngs(watershed.geometry.coordinates)}
            />) : null;

        return (
            <MapView
                ref={(m) => { this.mapRef = m; }}
                style={styles.map}
                initialRegion={initialMapRegion}
                onLongPress={handleLongPress}

            >
                {marker}
                {watershedShape}
            </MapView>
        );
    }
}

Map.defaultProps = {
    dispatch() {},
    markerPosition: null,
    watershed: null,
};

Map.propTypes = {
    dispatch: func,
    markerPosition: object, // eslint-disable-line
    watershed: object, // eslint-disable-line
};

function mapStateToProps({
    ui: {
        markerPosition,
    },
    data: {
        watershed: {
            data,
        },
    },
}) {
    return {
        markerPosition,
        watershed: data ? data.watershed : null,
    };
}

export default connect(mapStateToProps)(Map);
