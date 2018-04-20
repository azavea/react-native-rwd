import React, { Fragment } from 'react';
import { bool, func, string } from 'prop-types';
import { connect } from 'react-redux';
import { Header } from 'react-native-elements';

import {
    hideAnalysisView,
    showAnalysisView,
    clearMarkerPosition,
    copyWatershedToClipboard,
} from './actions.ui';

import {
    clearShape,
    fetchUserLocationForWatershed,
} from './actions.data';

import Map from './components/Map';
import Analysis from './components/Analysis';

const headerButtonColor = '#fff';
const headerButtonPressColor = 'transparent';

function Main({
    analysisViewVisible,
    visibleAnalysisView,
    dispatch,
    fetching,
    watershedData,
}) {
    const leftHeaderComponent = (() => {
        if (analysisViewVisible) {
            return {
                icon: 'map',
                onPress: () => dispatch(hideAnalysisView()),
                color: headerButtonColor,
                underlayColor: headerButtonPressColor,
            };
        }

        if (watershedData) {
            return {
                icon: 'assessment',
                onPress: () => dispatch(showAnalysisView()),
                color: headerButtonColor,
                underlayColor: headerButtonPressColor,
            };
        }

        return null;
    })();

    const rightHeaderComponent = (() => {
        if (analysisViewVisible) {
            return {
                icon: 'content-copy',
                onPress: () => dispatch(copyWatershedToClipboard()),
                color: headerButtonColor,
                underlayColor: headerButtonPressColor,
            };
        }

        if (watershedData || fetching) {
            return {
                icon: 'close',
                onPress: () => {
                    dispatch(clearShape());
                    dispatch(clearMarkerPosition());
                },
                color: headerButtonColor,
                underlayColor: headerButtonPressColor,
            };
        }

        return {
            icon: 'near-me',
            onPress: () => dispatch(fetchUserLocationForWatershed()),
            color: headerButtonColor,
            underlayColor: headerButtonPressColor,
        };
    })();

    const insetComponent = analysisViewVisible ? <Analysis /> : <Map />;

    const headerText = analysisViewVisible ?
        visibleAnalysisView
            .slice(0, 1)
            .toUpperCase()
            .concat(visibleAnalysisView.slice(1)) :
        'RWD';

    return (
        <Fragment>
            <Header
                statusBarProps={{
                    barStyle: 'light-content',
                    networkActivityIndicatorVisible: fetching,
                }}
                leftComponent={leftHeaderComponent}
                centerComponent={{
                    text: headerText,
                    style: {
                        color: headerButtonColor,
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
    visibleAnalysisView: '',
    dispatch() {},
    fetching: false,
    watershedData: false,
};

Main.propTypes = {
    analysisViewVisible: bool,
    visibleAnalysisView: string,
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
        visibleAnalysisView,
    },
}) {
    return {
        analysisViewVisible,
        visibleAnalysisView,
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
