import 'webpack-node-externals';
import * as sourceMapSupport from 'source-map-support';

// import * as Lodash from 'lodash';

import { initServer } from './server';

function initSourceMap(): void {
    if (process.env.NODE_ENV === 'development') {
        sourceMapSupport.install();
        console.log('ENV_LOG:', 'SOURCE MAP ENABLED');
    }
}

async function main(): Promise<void> {
    initSourceMap();
    await initServer();
}
main();
