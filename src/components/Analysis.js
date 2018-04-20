import React from 'react';
import { func } from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';

import {
    jobRequestTypes,
} from '../constants';

import {
    changeVisibleAnalysisView,
} from '../actions.ui';

import AnalysisSlide from './AnalysisSlide';

const styles = {
    container: {
        flex: 1,
    },
    slide: {
        flex: 1,
        backgroundColor: '#fff',
    },
};

function Analysis({
    dispatch,
}) {
    const analysisSlides = Object
        .keys(jobRequestTypes)
        .filter(analysisType => analysisType !== jobRequestTypes.watershed)
        .map(analysisType => (
            <AnalysisSlide
                key={analysisType}
                analysisType={analysisType}
            />));

    return (
        <View style={styles.container}>
            <Swiper
                style={{}}
                loadMinimal
                loadMinimalSize={0}
                onIndexChanged={index => dispatch(changeVisibleAnalysisView(index))}
            >
                {analysisSlides}
            </Swiper>
        </View>
    );
}

Analysis.defaultProps = {
    dispatch() {},
};

Analysis.propTypes = {
    dispatch: func,
};

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps)(Analysis);
