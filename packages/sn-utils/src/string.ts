export function camelize(str: string): string {
    return str.replace(/-(\w)/g, (_, c) => c.toUpperCase());
}

export function pascalize(str: string): string {
    return camelize(str).replace(
        /(\w)(\w*)/g,
        (_, c1, c2) => c1.toUpperCase() + c2
    );
}

export function decamelize(str: string, sep: string = '-'): string {
    return str
        .replace(/([a-z\d])([A-Z])/g, '$1' + sep + '$2')
        .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + sep + '$2')
        .toLowerCase();
}

export function normalizePath(path: string): string {
    return path.replace(/\\/g, '/');
}