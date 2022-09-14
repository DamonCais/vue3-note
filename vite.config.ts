import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Unocss from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { resolve } from 'path';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import vueJsx from '@vitejs/plugin-vue-jsx';

function pathResolve (dir: string) {
  return resolve(process.cwd(), '.', dir);
}
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: /\/#\//,
        replacement: pathResolve('types') + '/'
      },
      {
        find: '@',
        replacement: pathResolve('src') + '/'
      }
    ],
    dedupe: ['vue']
  },
  plugins: [
    Vue({
      reactivityTransform: true
    }),
    vueJsx(),
    AutoImport({
      imports: ['vue', 'vue-router', 'vue-i18n', 'vue/macros'],
      dts: 'src/auto-imports.d.ts',
      vueTemplate: true
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    Unocss()
  ]
});
