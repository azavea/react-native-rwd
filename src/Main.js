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
};

Main.propTypes = {
    analysisViewVisible: bool,
    dispatch: func,
};

function mapStateToProps({
    ui: {
        analysisViewVisible,
    },
}) {
    return {
        analysisViewVisible,
    };
}

export default connect(mapStateToProps)(Main);
