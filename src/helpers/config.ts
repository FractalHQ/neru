import { configent } from 'configent';
import defaults from '../config.defaults.js';

export const createConfig = (inp: object) =>
    configent(defaults, inp, {
        name: 'neru',
    });
