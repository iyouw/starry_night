
import type { SiteConfig } from "./site-config.js";
import { getViteConfigForDev, getViteConfigForProd } from "./vite/config.js";
import { build, createServer } from "vite";


export async function buildSite(contentRoot: string, siteConfig: SiteConfig) {
    const config = getViteConfigForProd(contentRoot, siteConfig);
    await build(config);
}

export async function previewSite(contentRoot: string, siteConfig: SiteConfig) {
    const config = getViteConfigForDev(contentRoot, siteConfig);
    const server = await createServer(config);
    await server.listen();
    server.printUrls();
}