import React from 'react';
import { object } from 'prop-types';
import { VictoryAxis, VictoryChart, VictoryLegend, VictoryLine } from 'victory-native';

const pptFill = '#0984e3';
const tempFill = '#e17055';

export default function ClimateChart({
    data: {
        survey: {
            categories,
        },
    },
}) {
    const precipitationData = categories
        .map(({ monthidx: x, ppt: y }) => ({ x, y }));

    const [
        pptMin,
        pptMax,
    ] = categories
        .map(({ ppt }) => ppt)
        .reduce(([min, max], next) => {
            if (next < min) {
                return [next, max];
            } else if (next > max) {
                return [min, next];
            }

            return [min, max];
        }, [0, 0]);

    const temperatureData = categories
        .map(({ monthidx: x, tmean: y }) => ({ x, y }));

    const [
        tempMin,
        tempMax,
    ] = categories
        .map(({ tmean }) => tmean)
        .reduce(([min, max], next) => {
            if (next < min) {
                return [next, max];
            } else if (next > max) {
                return [min, next];
            }

            return [min, max];
        }, [0, 0]);

    return (
        <VictoryChart>
            <VictoryAxis
                domain={[pptMin, pptMax]}
                dependentAxis
                label="Average precipitation"
            />
            <VictoryLine
                data={precipitationData}
                style={{
                    data: {
                        stroke: pptFill,
                    },
                }}
            />
            <VictoryAxis
                domain={[tempMin, tempMax]}
                dependentAxis
                label="Average temperature"
                orientation="right"
            />
            <VictoryLine
                data={temperatureData}
                style={{
                    data: {
                        stroke: tempFill,
                    },
                }}
            />
            <VictoryAxis
                domain={[1, 12]}
                label="Month"
            />
            <VictoryLegend
                orientation="horizontal"
                x={20}
                data={[
                    {
                        name: 'Temperature',
                        symbol: {
                            fill: tempFill,
                        },
                    },
                    {
                        name: 'Precipitation',
                        symbol: {
                            fill: pptFill,
                        },
                    },
                ]}
            />
        </VictoryChart>
    );
}

ClimateChart.defaultProps = {
    data: {},
};

ClimateChart.propTypes = {
    data: object, // eslint-disable-line
};
