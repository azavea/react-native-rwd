import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';

import {
    jobRequestTypes,
} from '../constants';

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

function Analysis() {
    const analysisSlides = Object
        .keys(jobRequestTypes)
        .map(analysisType => (
            <AnalysisSlide
                key={analysisType}
                analysisType={analysisType}
            />));

    return (
        <View style={styles.container}>
            <Swiper
                style={{}}
                showsButtons
                loadMinimal
                loadMinimalSize={0}
            >
                {analysisSlides}
            </Swiper>
        </View>
    );
}

Analysis.defaultProps = {};

Analysis.propTypes = {};

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps)(Analysis);
