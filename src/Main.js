import React, { Fragment } from 'react';
import { bool, func } from 'prop-types';
import { connect } from 'react-redux';
import { Header } from 'react-native-elements';

import {
    hideAnalysisView,
    showAnalysisView,
    clearMarkerPosition,
} from './actions.ui';

import {
    clearShape,
} from './actions.data';

import Map from './components/Map';
import Analysis from './components/Analysis';

function Main({
    analysisViewVisible,
    dispatch,
    fetching,
    watershedData,
}) {
    const leftHeaderComponent = (() => {
        if (analysisViewVisible) {
            return {
                icon: 'map',
                onPress: () => dispatch(hideAnalysisView()),
                color: '#fff',
            };
        }

        if (watershedData) {
            return {
                icon: 'assessment',
                onPress: () => dispatch(showAnalysisView()),
                color: '#fff',
            };
        }

        return null;
    })();

    const rightHeaderComponent = (() => {
        if (analysisViewVisible || fetching) {
            return null;
        }

        if (watershedData) {
            return {
                icon: 'close',
                onPress: () => {
                    dispatch(clearShape());
                    dispatch(clearMarkerPosition());
                },
                color: '#fff',
            };
        }

        return {
            icon: 'near-me',
            onPress: () => { console.log('locate me pressed'); },
            color: '#fff',
        };
    })();

    const insetComponent = analysisViewVisible ? <Analysis /> : <Map />;

    return (
        <Fragment>
            <Header
                statusBarProps={{
                    barStyle: 'light-content',
                    networkActivityIndicatorVisible: fetching,
                }}
                leftComponent={leftHeaderComponent}
                centerComponent={{
                    text: 'RWD',
                    style: {
                        color: '#fff',
                    },
                }}
                rightComponent={rightHeaderComponent}
            />
            {insetComponent}
        </Fragment>
    );
}

Main.defaultProps = {
    analysisViewVisible: false,
    dispatch() {},
    fetching: false,
    watershedData: false,
};

Main.propTypes = {
    analysisViewVisible: bool,
    dispatch: func,
    fetching: bool,
    watershedData: bool,
};

function mapStateToProps({
    data: {
        watershed: {
            fetching: fetchingWatershed,
            data,
        },
        land: {
            fetching: fetchingLand,
        },
        soil: {
            fetching: fetchingSoil,
        },
        terrain: {
            fetching: fetchingTerrain,
        },
        climate: {
            fetching: fetchingClimate,
        },
        streams: {
            fetching: fetchingStreams,
        },
    },
    ui: {
        analysisViewVisible,
    },
}) {
    return {
        analysisViewVisible,
        watershedData: !!data,
        fetching: [
            fetchingWatershed,
            fetchingLand,
            fetchingSoil,
            fetchingTerrain,
            fetchingClimate,
            fetchingStreams,
        ].some(Boolean),
    };
}

export default connect(mapStateToProps)(Main);
