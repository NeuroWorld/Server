import {clamp} from "lodash";

export function between(value: number, min: number = 0, max: number = 1) {
    return clamp(value, min, max);
}
