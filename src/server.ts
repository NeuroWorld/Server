// import Web from "./web";
//
// const socket = new Web();

import Victor = require("victor");
import Eye from "./eye";

const forward = Eye.forward(new Victor(10.5, 10.5), (new Victor(1, 0)).normalize(), 2);
console.log(forward);
