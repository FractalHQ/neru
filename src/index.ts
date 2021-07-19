import { createConfig } from './helpers/config.js';
import defaultOptions from './config.defaults';
import Router from './core/Router.js';

import type { Express } from 'express';

export function router(app: Express, options?: typeof defaultOptions) {
    const config = createConfig(options || {});

    // if (app.neru && app.neru instanceof Router)
    //     throw new Error(
    //         'Unable to bind to your express app as neru is already detected on this app',
    //     );

    if (!app) throw new SyntaxError('Expected a express app to be passed');

    return new Router(app, config);
}

export default {
    router,
};

