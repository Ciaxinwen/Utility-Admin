// vite.config.ts
import { defineConfig, loadEnv } from "file:///C:/Users/15918/Desktop/%E5%89%8D%E7%AB%AF%E9%A1%B9%E7%9B%AE/%E5%89%8D%E7%AB%AF%E9%A1%B9%E7%9B%AE%E5%90%88%E9%9B%86/Utility-Admin/node_modules/.pnpm/vite@5.4.0_@types+node@20.14.15_sass@1.77.8/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/15918/Desktop/%E5%89%8D%E7%AB%AF%E9%A1%B9%E7%9B%AE/%E5%89%8D%E7%AB%AF%E9%A1%B9%E7%9B%AE%E5%90%88%E9%9B%86/Utility-Admin/node_modules/.pnpm/@vitejs+plugin-vue@5.1.2_vite@5.4.0_vue@3.4.38/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { createHtmlPlugin } from "file:///C:/Users/15918/Desktop/%E5%89%8D%E7%AB%AF%E9%A1%B9%E7%9B%AE/%E5%89%8D%E7%AB%AF%E9%A1%B9%E7%9B%AE%E5%90%88%E9%9B%86/Utility-Admin/node_modules/.pnpm/vite-plugin-html@3.2.2_vite@5.4.0/node_modules/vite-plugin-html/dist/index.mjs";
import AutoImport from "file:///C:/Users/15918/Desktop/%E5%89%8D%E7%AB%AF%E9%A1%B9%E7%9B%AE/%E5%89%8D%E7%AB%AF%E9%A1%B9%E7%9B%AE%E5%90%88%E9%9B%86/Utility-Admin/node_modules/.pnpm/unplugin-auto-import@0.17.8_@vueuse+core@10.11.1/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///C:/Users/15918/Desktop/%E5%89%8D%E7%AB%AF%E9%A1%B9%E7%9B%AE/%E5%89%8D%E7%AB%AF%E9%A1%B9%E7%9B%AE%E5%90%88%E9%9B%86/Utility-Admin/node_modules/.pnpm/unplugin-vue-components@0.27.4_vue@3.4.38/node_modules/unplugin-vue-components/dist/vite.js";
import { AntDesignVueResolver } from "file:///C:/Users/15918/Desktop/%E5%89%8D%E7%AB%AF%E9%A1%B9%E7%9B%AE/%E5%89%8D%E7%AB%AF%E9%A1%B9%E7%9B%AE%E5%90%88%E9%9B%86/Utility-Admin/node_modules/.pnpm/unplugin-vue-components@0.27.4_vue@3.4.38/node_modules/unplugin-vue-components/dist/resolvers.js";
import { createSvgIconsPlugin } from "file:///C:/Users/15918/Desktop/%E5%89%8D%E7%AB%AF%E9%A1%B9%E7%9B%AE/%E5%89%8D%E7%AB%AF%E9%A1%B9%E7%9B%AE%E5%90%88%E9%9B%86/Utility-Admin/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.4.0/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import vueJsx from "file:///C:/Users/15918/Desktop/%E5%89%8D%E7%AB%AF%E9%A1%B9%E7%9B%AE/%E5%89%8D%E7%AB%AF%E9%A1%B9%E7%9B%AE%E5%90%88%E9%9B%86/Utility-Admin/node_modules/.pnpm/@vitejs+plugin-vue-jsx@4.0.1_vite@5.4.0_vue@3.4.38/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import { visualizer } from "file:///C:/Users/15918/Desktop/%E5%89%8D%E7%AB%AF%E9%A1%B9%E7%9B%AE/%E5%89%8D%E7%AB%AF%E9%A1%B9%E7%9B%AE%E5%90%88%E9%9B%86/Utility-Admin/node_modules/.pnpm/rollup-plugin-visualizer@5.12.0/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import path from "path";
import UnoCSS from "file:///C:/Users/15918/Desktop/%E5%89%8D%E7%AB%AF%E9%A1%B9%E7%9B%AE/%E5%89%8D%E7%AB%AF%E9%A1%B9%E7%9B%AE%E5%90%88%E9%9B%86/Utility-Admin/node_modules/.pnpm/unocss@0.60.4_postcss@8.4.41_vite@5.4.0/node_modules/unocss/dist/vite.mjs";
import dayjs from "file:///C:/Users/15918/Desktop/%E5%89%8D%E7%AB%AF%E9%A1%B9%E7%9B%AE/%E5%89%8D%E7%AB%AF%E9%A1%B9%E7%9B%AE%E5%90%88%E9%9B%86/Utility-Admin/node_modules/.pnpm/dayjs@1.11.12/node_modules/dayjs/dayjs.min.js";
var __vite_injected_original_dirname = "C:\\Users\\15918\\Desktop\\\u524D\u7AEF\u9879\u76EE\\\u524D\u7AEF\u9879\u76EE\u5408\u96C6\\Utility-Admin";
var vite_config_default = defineConfig(({ mode }) => {
  const { VITE_BASE_URL, VITE_SYSTEM_NAME } = loadEnv(mode, process.cwd());
  return {
    base: "./",
    plugins: [
      vue(),
      AutoImport({
        imports: ["vue", "vue-router"],
        dts: "./auto-import.d.ts",
        resolvers: [AntDesignVueResolver()]
      }),
      Components({
        resolvers: [AntDesignVueResolver({ importStyle: false, resolveIcons: true })]
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), "src/assets/svg/icon")],
        // 指定symbolId格式
        symbolId: "icon-[name]"
      }),
      createHtmlPlugin({
        inject: {
          data: {
            // 加载html标题
            title: VITE_SYSTEM_NAME
            // buildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          }
        }
      }),
      UnoCSS(),
      vueJsx(),
      // 打包体积分析
      visualizer({
        open: true,
        filename: "visualizer.html"
        //分析图生成的文件名
      })
    ],
    define: {
      __APP_BUILD_TIME__: JSON.stringify(dayjs().format("YYYY-MM-DD HH:mm:ss"))
    },
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "./src"),
        "~": path.resolve(__vite_injected_original_dirname, "./")
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/styles/variables.scss";'
        }
      }
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
      }
    },
    build: {
      outDir: `./dist${VITE_BASE_URL}`,
      rollupOptions: {
        output: {
          chunkFileNames: "js/[name]-[hash].js",
          // 引入文件名的名称
          entryFileNames: "js/[name]-[hash].js",
          // 包的入口文件名称
          assetFileNames: "[ext]/[name]-[hash].[ext]",
          // 资源文件像 字体，图片等
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id.toString().split("node_modules/")[1].split("/")[0].toString();
            }
          }
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFwxNTkxOFxcXFxEZXNrdG9wXFxcXFx1NTI0RFx1N0FFRlx1OTg3OVx1NzZFRVxcXFxcdTUyNERcdTdBRUZcdTk4NzlcdTc2RUVcdTU0MDhcdTk2QzZcXFxcVXRpbGl0eS1BZG1pblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcMTU5MThcXFxcRGVza3RvcFxcXFxcdTUyNERcdTdBRUZcdTk4NzlcdTc2RUVcXFxcXHU1MjREXHU3QUVGXHU5ODc5XHU3NkVFXHU1NDA4XHU5NkM2XFxcXFV0aWxpdHktQWRtaW5cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzLzE1OTE4L0Rlc2t0b3AvJUU1JTg5JThEJUU3JUFCJUFGJUU5JUExJUI5JUU3JTlCJUFFLyVFNSU4OSU4RCVFNyVBQiVBRiVFOSVBMSVCOSVFNyU5QiVBRSVFNSU5MCU4OCVFOSU5QiU4Ni9VdGlsaXR5LUFkbWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcclxuaW1wb3J0IHsgY3JlYXRlSHRtbFBsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLWh0bWwnO1xyXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJztcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSc7XHJcbmltcG9ydCB7IEFudERlc2lnblZ1ZVJlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJztcclxuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnO1xyXG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnO1xyXG5pbXBvcnQgeyB2aXN1YWxpemVyIH0gZnJvbSAncm9sbHVwLXBsdWdpbi12aXN1YWxpemVyJztcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCBVbm9DU1MgZnJvbSAndW5vY3NzL3ZpdGUnO1xyXG5pbXBvcnQgZGF5anMgZnJvbSAnZGF5anMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xyXG4gIGNvbnN0IHsgVklURV9CQVNFX1VSTCwgVklURV9TWVNURU1fTkFNRSB9ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGJhc2U6ICcuLycsXHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgIHZ1ZSgpLFxyXG4gICAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgICBpbXBvcnRzOiBbJ3Z1ZScsICd2dWUtcm91dGVyJ10sXHJcbiAgICAgICAgZHRzOiAnLi9hdXRvLWltcG9ydC5kLnRzJyxcclxuICAgICAgICByZXNvbHZlcnM6IFtBbnREZXNpZ25WdWVSZXNvbHZlcigpXSxcclxuICAgICAgfSksXHJcbiAgICAgIENvbXBvbmVudHMoe1xyXG4gICAgICAgIHJlc29sdmVyczogW0FudERlc2lnblZ1ZVJlc29sdmVyKHsgaW1wb3J0U3R5bGU6IGZhbHNlLCByZXNvbHZlSWNvbnM6IHRydWUgfSldLFxyXG4gICAgICB9KSxcclxuICAgICAgY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xyXG4gICAgICAgIC8vIFx1NjMwN1x1NUI5QVx1OTcwMFx1ODk4MVx1N0YxM1x1NUI1OFx1NzY4NFx1NTZGRVx1NjgwN1x1NjU4N1x1NEVGNlx1NTkzOVxyXG4gICAgICAgIGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMvYXNzZXRzL3N2Zy9pY29uJyldLFxyXG4gICAgICAgIC8vIFx1NjMwN1x1NUI5QXN5bWJvbElkXHU2ODNDXHU1RjBGXHJcbiAgICAgICAgc3ltYm9sSWQ6ICdpY29uLVtuYW1lXScsXHJcbiAgICAgIH0pLFxyXG4gICAgICBjcmVhdGVIdG1sUGx1Z2luKHtcclxuICAgICAgICBpbmplY3Q6IHtcclxuICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgLy8gXHU1MkEwXHU4RjdEaHRtbFx1NjgwN1x1OTg5OFxyXG4gICAgICAgICAgICB0aXRsZTogVklURV9TWVNURU1fTkFNRSxcclxuICAgICAgICAgICAgLy8gYnVpbGRUaW1lOiBkYXlqcygpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICB9KSxcclxuICAgICAgVW5vQ1NTKCksXHJcbiAgICAgIHZ1ZUpzeCgpLFxyXG4gICAgICAvLyBcdTYyNTNcdTUzMDVcdTRGNTNcdTc5RUZcdTUyMDZcdTY3OTBcclxuICAgICAgdmlzdWFsaXplcih7XHJcbiAgICAgICAgb3BlbjogdHJ1ZSxcclxuICAgICAgICBmaWxlbmFtZTogJ3Zpc3VhbGl6ZXIuaHRtbCcsIC8vXHU1MjA2XHU2NzkwXHU1NkZFXHU3NTFGXHU2MjEwXHU3Njg0XHU2NTg3XHU0RUY2XHU1NDBEXHJcbiAgICAgIH0pLFxyXG4gICAgXSxcclxuICAgIGRlZmluZToge1xyXG4gICAgICBfX0FQUF9CVUlMRF9USU1FX186IEpTT04uc3RyaW5naWZ5KGRheWpzKCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJykpLFxyXG4gICAgfSxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgYWxpYXM6IHtcclxuICAgICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpLFxyXG4gICAgICAgICd+JzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vJyksXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgY3NzOiB7XHJcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgICBzY3NzOiB7XHJcbiAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogJ0BpbXBvcnQgXCJAL3N0eWxlcy92YXJpYWJsZXMuc2Nzc1wiOycsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgaG9zdDogdHJ1ZSxcclxuICAgICAgLy8gb3BlbjogdHJ1ZSxcclxuICAgICAgcG9ydDogODg4OCxcclxuICAgICAgcHJveHk6IHtcclxuICAgICAgICAvLyAnXi9hcGknOiAnaHR0cDovL2V4YW1wbGUuY29tLycsXHJcbiAgICAgICAgLy8gJ14vdXBsb2FkJzoge1xyXG4gICAgICAgIC8vICAgdGFyZ2V0OiAnaHR0cDovL2xvY2FsaG9zdDo0Mzk2LycsXHJcbiAgICAgICAgLy8gICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgLy8gICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvdXBsb2FkLywgJycpLFxyXG4gICAgICAgIC8vIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgb3V0RGlyOiBgLi9kaXN0JHtWSVRFX0JBU0VfVVJMfWAsXHJcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgICBvdXRwdXQ6IHtcclxuICAgICAgICAgIGNodW5rRmlsZU5hbWVzOiAnanMvW25hbWVdLVtoYXNoXS5qcycsIC8vIFx1NUYxNVx1NTE2NVx1NjU4N1x1NEVGNlx1NTQwRFx1NzY4NFx1NTQwRFx1NzlGMFxyXG4gICAgICAgICAgZW50cnlGaWxlTmFtZXM6ICdqcy9bbmFtZV0tW2hhc2hdLmpzJywgLy8gXHU1MzA1XHU3Njg0XHU1MTY1XHU1M0UzXHU2NTg3XHU0RUY2XHU1NDBEXHU3OUYwXHJcbiAgICAgICAgICBhc3NldEZpbGVOYW1lczogJ1tleHRdL1tuYW1lXS1baGFzaF0uW2V4dF0nLCAvLyBcdThENDRcdTZFOTBcdTY1ODdcdTRFRjZcdTUwQ0YgXHU1QjU3XHU0RjUzXHVGRjBDXHU1NkZFXHU3MjQ3XHU3QjQ5XHJcbiAgICAgICAgICBtYW51YWxDaHVua3MoaWQpIHtcclxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMnKSkge1xyXG4gICAgICAgICAgICAgIC8vIFx1OEJBOVx1NkJDRlx1NEUyQVx1NjNEMlx1NEVGNlx1OTBGRFx1NjI1M1x1NTMwNVx1NjIxMFx1NzJFQ1x1N0FDQlx1NzY4NFx1NjU4N1x1NEVGNlxyXG4gICAgICAgICAgICAgIHJldHVybiBpZC50b1N0cmluZygpLnNwbGl0KCdub2RlX21vZHVsZXMvJylbMV0uc3BsaXQoJy8nKVswXS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH07XHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWdhLFNBQVMsY0FBYyxlQUFlO0FBQ3RjLE9BQU8sU0FBUztBQUNoQixTQUFTLHdCQUF3QjtBQUNqQyxPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLDRCQUE0QjtBQUNyQyxTQUFTLDRCQUE0QjtBQUNyQyxPQUFPLFlBQVk7QUFDbkIsU0FBUyxrQkFBa0I7QUFDM0IsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sWUFBWTtBQUNuQixPQUFPLFdBQVc7QUFYbEIsSUFBTSxtQ0FBbUM7QUFhekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDeEMsUUFBTSxFQUFFLGVBQWUsaUJBQWlCLElBQUksUUFBUSxNQUFNLFFBQVEsSUFBSSxDQUFDO0FBRXZFLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxNQUNQLElBQUk7QUFBQSxNQUNKLFdBQVc7QUFBQSxRQUNULFNBQVMsQ0FBQyxPQUFPLFlBQVk7QUFBQSxRQUM3QixLQUFLO0FBQUEsUUFDTCxXQUFXLENBQUMscUJBQXFCLENBQUM7QUFBQSxNQUNwQyxDQUFDO0FBQUEsTUFDRCxXQUFXO0FBQUEsUUFDVCxXQUFXLENBQUMscUJBQXFCLEVBQUUsYUFBYSxPQUFPLGNBQWMsS0FBSyxDQUFDLENBQUM7QUFBQSxNQUM5RSxDQUFDO0FBQUEsTUFDRCxxQkFBcUI7QUFBQTtBQUFBLFFBRW5CLFVBQVUsQ0FBQyxLQUFLLFFBQVEsUUFBUSxJQUFJLEdBQUcscUJBQXFCLENBQUM7QUFBQTtBQUFBLFFBRTdELFVBQVU7QUFBQSxNQUNaLENBQUM7QUFBQSxNQUNELGlCQUFpQjtBQUFBLFFBQ2YsUUFBUTtBQUFBLFVBQ04sTUFBTTtBQUFBO0FBQUEsWUFFSixPQUFPO0FBQUE7QUFBQSxVQUVUO0FBQUEsUUFDRjtBQUFBLE1BQ0YsQ0FBQztBQUFBLE1BQ0QsT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBO0FBQUEsTUFFUCxXQUFXO0FBQUEsUUFDVCxNQUFNO0FBQUEsUUFDTixVQUFVO0FBQUE7QUFBQSxNQUNaLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixvQkFBb0IsS0FBSyxVQUFVLE1BQU0sRUFBRSxPQUFPLHFCQUFxQixDQUFDO0FBQUEsSUFDMUU7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxRQUNwQyxLQUFLLEtBQUssUUFBUSxrQ0FBVyxJQUFJO0FBQUEsTUFDbkM7QUFBQSxJQUNGO0FBQUEsSUFDQSxLQUFLO0FBQUEsTUFDSCxxQkFBcUI7QUFBQSxRQUNuQixNQUFNO0FBQUEsVUFDSixnQkFBZ0I7QUFBQSxRQUNsQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixNQUFNO0FBQUE7QUFBQSxNQUVOLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQU9QO0FBQUEsSUFDRjtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0wsUUFBUSxTQUFTLGFBQWE7QUFBQSxNQUM5QixlQUFlO0FBQUEsUUFDYixRQUFRO0FBQUEsVUFDTixnQkFBZ0I7QUFBQTtBQUFBLFVBQ2hCLGdCQUFnQjtBQUFBO0FBQUEsVUFDaEIsZ0JBQWdCO0FBQUE7QUFBQSxVQUNoQixhQUFhLElBQUk7QUFDZixnQkFBSSxHQUFHLFNBQVMsY0FBYyxHQUFHO0FBRS9CLHFCQUFPLEdBQUcsU0FBUyxFQUFFLE1BQU0sZUFBZSxFQUFFLENBQUMsRUFBRSxNQUFNLEdBQUcsRUFBRSxDQUFDLEVBQUUsU0FBUztBQUFBLFlBQ3hFO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
