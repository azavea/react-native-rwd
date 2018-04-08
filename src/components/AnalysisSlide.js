import React, { Component } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { bool, func, object, string } from 'prop-types';
import { connect } from 'react-redux';

import {
    fetchLand,
    fetchSoil,
    fetchClimate,
    fetchStreams,
    fetchTerrain,
} from '../actions.data';

import {
    jobRequestTypes,
} from '../constants';

const styles = {
    slide: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingIndicatorStyle: {
    },
    dataDisplayStyle: {
    },
};

class AnalysisSlide extends Component {
    componentDidMount() {
        const {
            data,
            fetching,
            error,
            dispatch,
            analysisType,
        } = this.props;

        if (analysisType === jobRequestTypes.watershed) {
            return null;
        }

        if (!data && !fetching && !error) {
            switch (analysisType) {
                case jobRequestTypes.land:
                    return dispatch(fetchLand());
                case jobRequestTypes.soil:
                    return dispatch(fetchSoil());
                case jobRequestTypes.climate:
                    return dispatch(fetchClimate());
                case jobRequestTypes.terrain:
                    return dispatch(fetchTerrain());
                case jobRequestTypes.streams:
                    return dispatch(fetchStreams());
                default:
                    throw new Error('invalid jobRequestType');
            }
        }

        return null;
    }

    render() {
        const {
            data,
            fetching,
            error,
        } = this.props;

        const insetComponent = (() => {
            if (fetching) {
                return <ActivityIndicator size="small" />;
            }

            if (error) {
                return (
                    <View style={styles.dataDisplayStyle}>
                        <Text>
                            Error!
                        </Text>
                    </View>
                );
            }

            if (data) {
                return (
                    <View style={styles.dataDisplayStyle}>
                        <Text>
                            {JSON.stringify(data)}
                        </Text>
                    </View>
                );
            }

            return null;
        })();

        return (
            <View style={styles.slide}>
                {insetComponent}
            </View>
        );
    }
}

AnalysisSlide.defaultProps = {
    analysisType: '',
    data: null,
    fetching: false,
    error: false,
    dispatch() {},
};

AnalysisSlide.propTypes = {
    analysisType: string,
    data: object, // eslint-disable-line
    fetching: bool,
    error: bool,
    dispatch: func,
};

function mapStateToProps({
    data: appData,
}, {
    analysisType,
}) {
    const {
        [analysisType]: {
            data,
            fetching,
            error,
        },
    } = appData;

    return {
        data,
        fetching,
        error,
    };
}

export default connect(mapStateToProps)(AnalysisSlide);
