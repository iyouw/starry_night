import { join } from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log(__dirname);

export const SITE_DIR = join(__dirname, '..', '..', 'site');