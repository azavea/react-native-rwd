import React, { Component } from 'react';
import { func, object } from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';

import {
    fetchWatershed,
    fetchSoil,
    fetchLand,
    fetchTerrain,
    fetchClimate,
    fetchStreams,
} from './actions.data';

class Main extends Component {
    componentDidMount() {
        this.props.dispatch(fetchWatershed({
            lat: 39.67185812402583,
            lng: -75.76742706298828,
        }));
    }

    componentWillReceiveProps({ data }) {
        if (data && !this.props.data) {
            this.props.dispatch(fetchSoil());
            this.props.dispatch(fetchStreams());
            this.props.dispatch(fetchTerrain());
            this.props.dispatch(fetchLand());
            this.props.dispatch(fetchClimate());
        }
    }

    render() {
        return (
            <View>
                Hello
            </View>
        );
    }
}

Main.defaultProps = {
    dispatch() {},
    data: {},
};

Main.propTypes = {
    dispatch: func,
    data: object, // eslint-disable-line
};

function mapStateToProps({
    data: {
        watershed: {
            data,
        },
    },
}) {
    return {
        data,
    };
}

export default connect(mapStateToProps)(Main);
