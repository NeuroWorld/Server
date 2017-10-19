import mathjs = require("mathjs");
import Brain from "./brain/brain";
import DummyTest from "./brain/dummy-test";
import Web from "./web";

const socket = new Web();

const dummyTest = new DummyTest();
dummyTest.test();
