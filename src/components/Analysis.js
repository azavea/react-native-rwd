import React from 'react';
import { func } from 'prop-types';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import {
    hideAnalysisView,
} from '../actions.ui';

const styles = {
    container: {
        flex: 1,
    },
};

function Analysis({
    dispatch,
}) {
    return (
        <View style={styles.container}>
            <Button
                onPress={() => dispatch(hideAnalysisView())}
                title="Dismiss"
            />
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
