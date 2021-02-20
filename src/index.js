const Router = require('./core/Router.js');
const polka = require('polka');

module.exports = (options = {}) => {
    const server = polka(options);
    const router = new Router(server, options);

    return router;
};
