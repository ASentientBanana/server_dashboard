export const sanitizeInclude = (source: any, fields: string[]) => {
    const newObject = { ...source };
    const keys = Object.keys(source);
    for (let i = 0; i < keys.length; i++) {
        if (!fields.includes(keys[i])) {
            delete newObject[keys[i]]
        }
    }
    return newObject;
}

export const sanitizeExclude = (source: any, fields: string[]) => {
    const newObject = { ...source };
    for (let i = 0; i < fields.length; i++) {
        delete newObject[fields[i]];
    }
    return newObject;
}