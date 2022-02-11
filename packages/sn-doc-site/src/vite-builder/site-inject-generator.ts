import { basename, dirname } from "path";
import type { MdDocument } from './md-document.js';
import { findFileByExt } from 'starn-node-utils';
import { SiteConfig } from "./site-config.js";
import { pascalize, normalizePath } from 'starn-utils';

function getDocumentName(path: string): string {
    return pascalize(basename(dirname(path)));
}


async function findDocuments(contentRoot:string): Promise<Array<MdDocument>> {
    const res = new Array<MdDocument>();
    const pathes = await findFileByExt(contentRoot, '.md');
    for await (const path of pathes) {
        const doc: MdDocument = {
            path,
            name: getDocumentName(path)
        };
        res.push(doc);   
    }
    return res;
}

function importDocuments(docs: Array<MdDocument>): string {
    return docs.map(doc=>`import ${doc.name} from '${normalizePath(doc.path)}'`)
               .join('\n');
}

function exportConfig(config: SiteConfig): string {
    return `export const config = ${JSON.stringify(config)} `;

}

function exportDocuments(docs: Array<MdDocument>): string {
    return `
export const documents = {
    ${docs.map(doc=>`${doc.name}`).join(',\n')}
}
    `;
}


export async function injectSite(contentRoot: string, siteConfig: SiteConfig): Promise<string> {
    const docs = await findDocuments(contentRoot);
    const code = `
${importDocuments(docs)}
${exportConfig(siteConfig)}
${exportDocuments(docs)}
    `;
    return code;
}