import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import moduleEntry from './package.json' with {type: 'json'}
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
    input: [moduleEntry.mainEntryFile, moduleEntry.rendererEntryFile],
    output: {
        dir: 'scripts',
        format: 'es',
        entryFileNames: '[name].mjs',
        chunkFileNames: '[name]_[hash:6].mjs',
    },
    plugins: [json(), typescript(), nodeResolve(), commonjs()],
};