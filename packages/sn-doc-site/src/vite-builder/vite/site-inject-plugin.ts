import { PluginOption } from "vite";
import type { SiteConfig } from "../site-config.js";
import { injectSite } from "../site-inject-generator.js";

export function siteInjectPlugin(contentRoot: string, siteConfig: SiteConfig): PluginOption {
    const virtualInjectModuleId = 'site-inject'
    const resolveInjectVirtualModuleId = `\0sn-doc-site:${virtualInjectModuleId}`;

    return {
        name:`vite-plugin-site-inject`,
        resolveId(id){
            if(id === virtualInjectModuleId){
                return resolveInjectVirtualModuleId;
            }
        },
        load(id){
            if(id === resolveInjectVirtualModuleId) {
                return injectSite(contentRoot, siteConfig);
            }
        }
    }
}