import React from 'react';
import { object } from 'prop-types';
import {
    VictoryAxis,
    VictoryChart,
    VictoryBar,
} from 'victory-native';

export default function StreamChart({
    data: {
        survey: {
            categories,
        },
    },
}) {
    return (
        <VictoryChart width={350}>
            <VictoryAxis
                dependentAxis
                domain={
                    categories
                        .reduce(([min, max], { order, lengthkm }) => {
                            if (order === 999) {
                                return [min, max];
                            }

                            return [
                                min,
                                lengthkm > max ? lengthkm : max,
                            ];
                        }, [0, 0])
                }
                label="Length (km)"
            />
            <VictoryBar
                data={
                    categories
                        .reduce((acc, { order, lengthkm }) => {
                            if (order === 999) {
                                return acc;
                            }

                            return acc
                                .concat({
                                    x: order,
                                    y: lengthkm,
                                });
                        }, [])
                }
                style={{
                    data: {
                        fill: '#c43a31',
                    },
                }}
            />
            <VictoryAxis
                domain={[1, 10]}
                label="Stream Order"
            />
        </VictoryChart>
    );
}

StreamChart.defaultProps = {
    data: {},
};

StreamChart.propTypes = {
    data: object, // eslint-disable-line
};
