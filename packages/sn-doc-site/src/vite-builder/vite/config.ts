import { join } from "path";
import { InlineConfig } from "vite";
import { SITE_DIR } from "../constants.js";
import { siteInjectPlugin } from "./site-inject-plugin.js";
import vitePluginVue from '@vitejs/plugin-vue';
import vitePluginMd from 'vite-plugin-md';
import type { SiteConfig } from "../site-config.js";
import userOption from './md-plugin-option.js';

export function getViteConfigForDev(contentRoot: string, siteConfig: SiteConfig): InlineConfig {
    return {
        root: SITE_DIR,
        plugins:[
            siteInjectPlugin(contentRoot, siteConfig),
            vitePluginVue({
                include: [/\.vue$/, /\.md$/],
            }),
            vitePluginMd(userOption)
        ],
        server: {
            host: '0.0.0.0',
        },
    }
}

export function getViteConfigForProd(contentRoot: string, siteConfig: SiteConfig): InlineConfig {
    const dev = getViteConfigForDev(contentRoot, siteConfig);
    const outDir = siteConfig.outDir;
    const publicPath = siteConfig.publicPath ?? '/';
    return {
        ...dev,
        base: publicPath,
        build:{
            outDir,
            brotliSize: false,
            emptyOutDir: true,
            rollupOptions: {
                input: {
                    main: join(SITE_DIR, 'index.html')
                },
                output: {
                    manualChunks: {
                        'vue-libs': ['vue', 'vue-router']
                    }
                }
            }
        }
    }
}