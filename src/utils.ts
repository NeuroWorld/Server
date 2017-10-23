import {clamp} from "lodash";
import Victor = require("victor");

export function between(value: number, min: number = 0, max: number = 1) {
    return clamp(value, min, max);
}

export function isVictorEqual(a: Victor, b: Victor) {
    return a.isEqualTo(b);
}

export function sigmoid(x: number): number {
    return 1 / ( 1 + Math.pow(Math.E, -x));
}
