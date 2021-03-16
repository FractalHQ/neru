const Router = require('./Router.js');
const config = require('../helpers/config.js');
const express = require('express');
const fs = require('fs');

module.exports = (options = {}) => {
    const cnf = config(options);

    if (!fs.existsSync(path.resolve(options.routesDir)))
        throw new Error(
            `The given routes dir ( ${options.routesDir} ) was unable to be found`,
        );

    const server = express(options);
    const router = new Router(server, cnf);

    return router;
};
