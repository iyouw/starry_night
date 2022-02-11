import { pathToFileURL } from "url";
import process from "process";
import { join } from "path";
import type { SiteConfig } from "starn-doc-site";

export interface CliConfig {
    site: SiteConfig
}

async function getCliConfig(): Promise<CliConfig>{
    try {
        return (await import(pathToFileURL(CLI_CONFIG_FILE).href)).default as CliConfig;
    } catch {
        return {} as CliConfig;
    }
}

export const CWD = process.cwd();
export const SRC_DIR = join(CWD, 'src');
export const SITE_DIR = join(CWD, 'site');
export const CLI_CONFIG_FILE = join(CWD, 'sn.config.mjs');

export const CLI_CONFIG = await getCliConfig();

