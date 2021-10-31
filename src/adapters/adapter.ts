import Joi from 'joi';

// @todo add jsdoc

export interface Adapter<ServerType = unknown> {
    name: string;

    getParamRoute: (slug: string) => string;
    getSpreadRoute: (slug: string) => string;

    addRoute: (server: ServerType) => Promise<void> | void;
}

export const adapterSchema = Joi.object({
    name: Joi.string().required(),

    getParamRoute: Joi.function().required(),
    getSpreadRoute: Joi.function().required(),

    addRoute: Joi.function().required(),
});
