import React, { Fragment } from 'react';

import Header from './components/Header';
import Map from './components/Map';

export default function Main() {
    return (
        <Fragment>
            <Header title="rwd" />
            <Map />
        </Fragment>
    );
}
