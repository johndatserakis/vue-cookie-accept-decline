// rollup.config.js
import vue from 'rollup-plugin-vue';
import css from 'rollup-plugin-css-only'
import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify-es';
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));

const config = {
    input: 'src/index.js',
    output: {
        name: 'VueCookieAcceptDecline',
        exports: 'named',
        globals: {
            'tiny-cookie': 'tinyCookie'
        }
    },
    plugins: [
        vue({
            css: false,
            compileTemplate: true,
        }),
        css({ output: 'dist/vue-cookie-accept-decline.css' }),
        buble(),
    ],
    external: ['tiny-cookie']
};

config.plugins.push(uglify());

// Only minify browser (iife) version
if (argv.format === 'iife') {
    config.plugins.push(uglify());
}

export default config;
