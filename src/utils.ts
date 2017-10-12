export function range(length: number): number[] {
    return Array.from({length}, (value, key) => key);
}
