import { buildSite, previewSite } from 'starn-doc-site';
import { SRC_DIR, CLI_CONFIG } from '../env/index.js';

export async function site(options: any): Promise<void> {
    console.log('start preview');
    if(options.prod){
        await buildSite(SRC_DIR, CLI_CONFIG.site);
    }else {
        await previewSite(SRC_DIR, CLI_CONFIG.site);
    }
}