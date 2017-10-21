import {intersectionWith, range} from "lodash";
import Victor = require("victor");
import Field from "./field";
import {Properties} from "./properties";
import WORLD_SIZE = Properties.WORLD_SIZE;

const {pow, sqrt} = Math;

export default class Eye {
    public static forward(position: Victor, direction: Victor, distance: number) {
        const near = Eye.nearby(position, distance);

        const heads = range(distance).map((i) => {
            const pos = position.clone().add(direction.clone().multiplyScalar(distance));
            return Eye.nearby(pos, distance - i);
        });

        console.log(near, heads);

        return intersectionWith(near, ...heads, (a: Victor, b: Victor) => a.x === b.x && a.y === b.y);
    }

    public static fieldsFromVictors(coords: Victor[], fields: Field[]): Field[] {
        return coords.map((coord) => fields[(coord.x + WORLD_SIZE) % WORLD_SIZE][(coord.y + WORLD_SIZE) % WORLD_SIZE]);
    }

    public static nearby(position: Victor, distance: number) {
        const points: Victor[] = [];
        for (let x = position.x - distance; x < position.x + distance; x++) {
            for (let y = position.y - distance; y < position.y + distance; y++) {
                if (sqrt(pow(x - position.x, 2) + pow(y - position.y, 2)) <= distance) {
                    points.push(new Victor(Math.floor(x), Math.floor(y)));
                }
            }
        }
        return points;
    }
}
