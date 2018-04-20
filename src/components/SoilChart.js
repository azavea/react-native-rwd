import React from 'react';
import { object } from 'prop-types';
import {
    VictoryPie,
} from 'victory-native';

export default function SoilChart({
    data: {
        survey: {
            categories,
        },
    },
}) {
    return (
        <VictoryPie
            colorScale="warm"
            data={
                categories.map(({ type: x, coverage: y }) => ({ x, y }))
            }
            labels={() => ''}
        />
    );
}

SoilChart.defaultProps = {
    data: {},
};

SoilChart.propTypes = {
    data: object, // eslint-disable-line
};
