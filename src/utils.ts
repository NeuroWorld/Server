export function range(length: number): number[] {
    return Array.from({length}, (value, key) => key);
}

export function between(value: number, min: number = 0, max: number = 1) {
    return Math.min(max, Math.max(min, value));
}
