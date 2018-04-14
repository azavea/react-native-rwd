import React from 'react';
import { object } from 'prop-types';
import {
    VictoryBar,
    VictoryChart,
    VictoryGroup,
    VictoryLegend,
} from 'victory-native';

const slopeFill = '#f1c40f';
const elevationFill = '#8e44ad';

export default function TerrainChart({
    data: {
        survey: {
            categories,
        },
    },
}) {
    const [
        slopeData,
        elevationData,
    ] = categories
        .reduce(([slopeAcc, elevationAcc], {
            slope,
            elevation,
            type: x,
        }) => ([
            slopeAcc.concat({
                x,
                y: slope,
            }),
            elevationAcc.concat({
                x,
                y: elevation,
            }),
        ]), [[], []]);

    return (
        <VictoryChart>
            <VictoryGroup offset={20}>
                <VictoryBar
                    data={slopeData}
                    style={{
                        data: {
                            fill: slopeFill,
                        },
                    }}
                />
                <VictoryBar
                    data={elevationData}
                    style={{
                        data: {
                            fill: elevationFill,
                        },
                    }}
                />
            </VictoryGroup>
            <VictoryLegend
                orientation="horizontal"
                x={20}
                data={[
                    {
                        name: 'Slope',
                        symbol: {
                            fill: slopeFill,
                        },
                    },
                    {
                        name: 'Elevation',
                        symbol: {
                            fill: elevationFill,
                        },
                    },
                ]}
            />
        </VictoryChart>
    );
}

TerrainChart.defaultProps = {
    data: {},
};

TerrainChart.propTypes = {
    data: object, // eslint-disable-line
};
