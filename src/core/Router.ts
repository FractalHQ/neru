import defaults from '../config.defaults';
import type { Express } from 'express';


export default class Router {
    private options;
    private server;

    constructor(server: Express, options: typeof defaults) {
        this.options = options;
        this.server = server;
    }
}
