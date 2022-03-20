import { terser } from 'rollup-plugin-terser';
import buble from 'rollup-plugin-buble';
import commonjs from 'rollup-plugin-commonjs';
import minimist from 'minimist';
import resolve from 'rollup-plugin-node-resolve';
import scss from 'rollup-plugin-scss';
import vue from 'rollup-plugin-vue';

const argv = minimist(process.argv.slice(2));

const config = {
  input: './src/index.js',
  output: {
    name: 'VueCookieAcceptDecline',
    exports: 'named',
    globals: {
      vue: 'Vue',
      'tiny-cookie': 'tinyCookie',
    },
  },
  plugins: [
    vue({
      css: false,
      compileTemplate: true,
    }),
    scss({ output: 'dist/vue-cookie-accept-decline.css' }),
    resolve(),
    buble(),
    commonjs(),
  ],
  external: ['vue', 'tiny-cookie'],
};

// Only minify browser (iife) version
if (argv.format === 'iife') {
  config.plugins.push(terser());

  // Here we remove our `external` dependency that we have in this project
  // Be careful with the index here - it has to match any dependency that
  // you want to be built into to the iife output
  config.external.splice(1);
}

export default config;
