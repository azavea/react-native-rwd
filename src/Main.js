import React, { Fragment } from 'react';
import { bool, func } from 'prop-types';
import { connect } from 'react-redux';
import { Header } from 'react-native-elements';

import {
    hideAnalysisView,
} from './actions.ui';

import Map from './components/Map';
import Analysis from './components/Analysis';

function Main({
    analysisViewVisible,
    dispatch,
    fetching,
}) {
    const closeAnalysisButton = analysisViewVisible ? ({
        icon: 'close',
        onPress: () => dispatch(hideAnalysisView()),
        color: '#fff',
    }) : null;

    const insetComponent = analysisViewVisible ? <Analysis /> : <Map />;

    return (
        <Fragment>
            <Header
                statusBarProps={{
                    barStyle: 'light-content',
                    networkActivityIndicatorVisible: fetching,
                }}
                leftComponent={closeAnalysisButton}
                centerComponent={{
                    text: 'RWD',
                    style: {
                        color: '#fff',
                    },
                }}
            />
            {insetComponent}
        </Fragment>
    );
}

Main.defaultProps = {
    analysisViewVisible: false,
    dispatch() {},
    fetching: false,
};

Main.propTypes = {
    analysisViewVisible: bool,
    dispatch: func,
    fetching: bool,
};

function mapStateToProps({
    data: {
        watershed: {
            fetching: fetchingWatershed,
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
