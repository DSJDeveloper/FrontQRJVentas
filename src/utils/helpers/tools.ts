export function isNullOrUndefined(value: any) {
    return value === null || value === undefined;
}
export function isNullOrEmpty(value: any) {
    return (isNullOrUndefined(value) ? true : value.length == 0);
}