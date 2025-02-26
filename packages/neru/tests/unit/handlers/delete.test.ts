import assert from 'assert';
import { test } from 'uvu';

import { importRouteHandlers } from '../../../src/handlers/import';

test('imported handlers with del contain delete property', async () => {
    const { handlers } = await importRouteHandlers(
        'tests/unit/handlers/delete.mjs',
    );

    assert.ok(handlers.delete, 'Has delete property');
});

test('imported handlers with del do not have a del property', async () => {
    const { handlers } = await importRouteHandlers(
        'tests/unit/handlers/delete.mjs',
    );

    if (handlers['del']) throw Error('Has del property');
});

test.run();
