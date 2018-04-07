import React, { Component } from 'react';
import { bool, func, object } from 'prop-types';
import { Vibration, View } from 'react-native';
import { MapView } from 'expo';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import {
    fetchWatershed,
    clearShape,
} from '../actions.data';

import {
    setMarkerPosition,
    showAnalysisView,
} from '../actions.ui';

import {
    initialMapRegion,
    polygonZoomPadding as edgePadding,
    watershedFillColor,
} from '../constants';

import mapPolygonToLatLngs from '../utils';

const styles = {
    container: {
        flex: 1,
    },
    map: {
        height: '100%',
        width: '100%',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 25,
        width: '100%',
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: 'transparent',
    },
    button: {
        backgroundColor: 'purple',
        borderRadius: 25,
    },
};

class Map extends Component {
    constructor(props) {
        super(props);
        this.handleLongPress = this.handleLongPress.bind(this);
    }

    componentDidMount() {
        const {
            mapRef,
            props: {
                watershed,
            },
        } = this;

        if (watershed && mapRef) {
            mapRef.fitToCoordinates(
                mapPolygonToLatLngs(watershed.geometry.coordinates),
                {
                    animated: false,
                    edgePadding,
                },
            );
        }
    }

    componentDidUpdate({ watershed }) {
        if (this.props.watershed && !watershed) {
            this.mapRef.fitToCoordinates(
                mapPolygonToLatLngs(this.props.watershed.geometry.coordinates),
                {
                    animated: true,
                    edgePadding,
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
            fetching,
        } = this.props;

        if (fetching) {
            return null;
        }

        dispatch(setMarkerPosition(coordinate));

        Vibration.vibrate([400]);

        return this.props.dispatch(fetchWatershed({
            lat: coordinate.latitude,
            lng: coordinate.longitude,
        }));
    }

    render() {
        const {
            handleLongPress,
            props: {
                dispatch,
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

        const analyzeButtons = watershed ? (
            <View style={styles.buttonContainer}>
                <Button
                    buttonStyle={styles.button}
                    onPress={() => dispatch(showAnalysisView())}
                    title="Analyze"
                />
                <Button
                    buttonStyle={styles.button}
                    onPress={() => dispatch(clearShape())}
                    title="Clear"
                />
            </View>) : null;

        return (
            <View style={styles.container}>
                <MapView
                    ref={(m) => { this.mapRef = m; }}
                    style={styles.map}
                    initialRegion={initialMapRegion}
                    onLongPress={handleLongPress}
                >
                    {marker}
                    {watershedShape}
                </MapView>
                {analyzeButtons}
            </View>
        );
    }
}

Map.defaultProps = {
    dispatch() {},
    fetching: false,
    markerPosition: null,
    watershed: null,
};

Map.propTypes = {
    dispatch: func,
    fetching: bool,
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
            fetching,
        },
    },
}) {
    return {
        markerPosition,
        fetching,
        watershed: data ? data.watershed : null,
    };
}

export default connect(mapStateToProps)(Map);
