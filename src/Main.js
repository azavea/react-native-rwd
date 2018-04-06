import React, { Fragment } from 'react';
import { bool } from 'prop-types';
import { connect } from 'react-redux';

import Header from './components/Header';
import Map from './components/Map';
import Analysis from './components/Analysis';

function Main({
    analysisViewVisible,
}) {
    const insetComponent = analysisViewVisible ? <Analysis /> : <Map />;

    return (
        <Fragment>
            <Header title="rwd" />
            {insetComponent}
        </Fragment>
    );
}

Main.defaultProps = {
    analysisViewVisible: false,
};

Main.propTypes = {
    analysisViewVisible: bool,
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
