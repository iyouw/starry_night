import { Encoding } from "crypto";
import { existsSync } from "fs";
import { readdir, readFile, stat } from "fs/promises";
import { join } from "path";

export async function findFileByExt(root: string, ext: string): Promise<Array<string>> {
    let res =  new Array<string>();
    if(!existsSync(root)){
        return res;
    }
    const names = await readdir(root, 'utf8');
    for (const name of names) {
        const path = join(root,name);

        if(name.endsWith(ext)){
            res.push(path);
            continue;
        }

        const info = await stat(path);
        if(info.isDirectory()){
            res = res.concat( await findFileByExt(path,ext));
        }
    }
    return res;
}

export async function readJson<T= Record<string, any>>(file: string, encoding: Encoding = 'utf8'): Promise<T> {
    try {
        const content = await readFile(file, encoding);
        return JSON.parse(content);
    } catch (error) {
        return {} as T; 
    }
}