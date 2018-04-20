import React from 'react';
import { object } from 'prop-types';
import {
    VictoryPie,
    VictoryTheme,
} from 'victory-native';

export default function LandChart({
    data: {
        survey: {
            categories,
        },
    },
}) {
    return (
        <VictoryPie
            theme={VictoryTheme.material}
            data={
                categories.map(({ type: x, coverage: y }) => ({ x, y }))
            }
            labels={() => ''}
        />
    );
}

LandChart.defaultProps = {
    data: {},
};

LandChart.propTypes = {
    data: object, // eslint-disable-line
};
