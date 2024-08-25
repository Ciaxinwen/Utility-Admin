import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createHtmlPlugin } from 'vite-plugin-html';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';
import UnoCSS from 'unocss/vite';
import dayjs from 'dayjs';

export default defineConfig(({ mode }) => {
  const { VITE_BASE_URL, VITE_SYSTEM_NAME } = loadEnv(mode, process.cwd());

  return {
    base: VITE_BASE_URL,
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue', 'vue-router'],
        dts: './auto-import.d.ts',
        resolvers: [AntDesignVueResolver()],
      }),
      Components({
        resolvers: [AntDesignVueResolver({ importStyle: false, resolveIcons: true })],
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/svg/icon')],
        // 指定symbolId格式
        symbolId: 'icon-[name]',
      }),
      createHtmlPlugin({
        inject: {
          data: {
            // 加载html标题
            title: VITE_SYSTEM_NAME,
            // buildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          },
        },
      }),
      UnoCSS(),
      vueJsx(),
      // 打包体积分析
      visualizer({
        open: true,
        filename: 'visualizer.html', //分析图生成的文件名
      }),
    ],
    define: {
      __APP_BUILD_TIME__: JSON.stringify(dayjs().format('YYYY-MM-DD HH:mm:ss')),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '~': path.resolve(__dirname, './'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/styles/variables.scss";',
        },
      },
    },
    server: {
      host: true,
      // open: true,
      port: 8888,
      proxy: {
        // '^/api': 'http://example.com/',
        // '^/upload': {
        //   target: 'http://localhost:4396/',
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/upload/, ''),
        // },
      },
    },
    build: {
      // outDir: `./dist/Utility-Admin`,
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
          entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
          assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
          manualChunks(id) {
            if (id.includes('node_modules')) {
              //使用pnpm打包
              return id.toString().split('node_modules/')[2].split('/')[0].toString();
            }
          },
        },
      },
    },
  };
});
