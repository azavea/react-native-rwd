import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

const styles = {
    container: {
        flex: 1,
    },
};

function Analysis() {
    return (
        <View style={styles.container}>
            <Text>
                Analyze tabs
            </Text>
        </View>
    );
}

Analysis.defaultProps = {};

Analysis.propTypes = {};

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps)(Analysis);
