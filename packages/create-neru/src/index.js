import { existsSync, readdirSync } from 'fs';
import { join as desmJoin } from 'desm';
import logSymbols from 'log-symbols';
import minimist from 'minimist';
import { resolve } from 'path';
import prompts from 'prompts';
import kleur from 'kleur';
import cpy from 'cpy';

const frameworks = [
    {
        name: 'Hapi',
        folder: 'hapi',
    },
    {
        name: 'Express',
        folder: 'express',
    },
];

const onCancel = () => {
    console.log(kleur.red(`${logSymbols.error} create-neru exited`));
    process.exit(1);
};

export const run = async () => {
    const args = minimist(process.argv.slice(2));

    const target = resolve(args._[0] || '.');
    const rawTarget = args._[0];

    console.log(kleur.yellow(`create-neru ${kleur.bold('v1')}\n`));

    if (!rawTarget) {
        const { confirm } = await prompts({
            type: 'confirm',
            name: 'confirm',
            message: kleur.red(
                'No directory specified. Create in current directory?',
            ),
        });

        if (!confirm) {
            onCancel();
        }
    }

    if (existsSync(target) && readdirSync(target).length > 0) {
        const { confirm } = await prompts({
            type: 'confirm',
            name: 'confirm',
            message: kleur.red('Directory is not empty, continue?'),
        });

        if (!confirm) {
            onCancel();
        }
    }

    const { framework, useTypeScript } = await prompts(
        [
            {
                type: 'select',
                name: 'framework',
                message: 'Please select the framework you want to use',
                choices: frameworks.map((f) => ({
                    title: f.name,
                    value: f.folder,
                })),
            },
            {
                type: 'confirm',
                name: 'useTypeScript',
                message: 'Would you like to use TypeScript?',
            },
        ],
        { onCancel },
    );

    const templateGlob = desmJoin(
        import.meta.url,
        framework,
        useTypeScript ? 'ts' : 'js',
        '/**',
    );

    await cpy(templateGlob, target);

    console.log(
        `${logSymbols.success} ${kleur.green('Your project has been created!')}`,
    );

    console.log();
    console.log('Now you can:');

    const numbered = [
        rawTarget && `cd ${rawTarget}`,
        'npm install (or pnpm/yarn)',
        'npm run dev',
    ];

    numbered
        .filter(Boolean)
        .forEach((item, index) =>
            console.log(`  ${kleur.gray(index + 1)}) ${item}`),
        );
};
