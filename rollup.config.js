import babel from 'rollup-plugin-babel';
import pkg from './package.json';
const banner = `/*
 * ${pkg.name} ${pkg.version}
 * ${pkg.description}
 * (c) 2013-2020, S. Andrew Sheppard
 * https://wq.io/license
 */
`;

export default [
    // ESM & UMD
    {
        input: 'index.js',
        plugins: [
            babel({
                configFile: false,
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            targets: {
                                esmodules: true
                            }
                        }
                    ]
                ]
            })
        ],
        external: ['d3', 'mustache'],
        output: [
            {
                banner,
                file: 'dist/index.es.js',
                format: 'esm',
                exports: 'named'
            },
            {
                name: 'chart',
                exports: 'named',
                globals: { d3: 'd3', mustache: 'Mustache' },
                banner,
                file: 'dist/chart.js',
                format: 'umd',
                sourcemap: true,
                indent: false
            }
        ]
    },
    // CJS
    {
        input: 'index.js',
        plugins: [
            babel({
                configFile: false,
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            targets: {
                                node: 8
                            }
                        }
                    ]
                ]
            })
        ],
        external: ['d3', 'mustache'],
        output: {
            banner: banner,
            file: 'dist/index.js',
            format: 'cjs',
            exports: 'named'
        }
    }
];
