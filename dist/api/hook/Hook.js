"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const Environment_1 = __importDefault(require("@automation/config/Environment"));
const LambdaUtility_1 = require("@automation/config/LambdaUtility");
(0, cucumber_1.Before)(function () {
});
(0, cucumber_1.After)(async function () {
    await Environment_1.default.cleanEnvironment({
        mobile: this.getRandomMobile(),
        identityDocument: {
            type: this.getIdentityType(),
            number: this.getRandomIdentityNumber(),
        },
    });
});
(0, cucumber_1.BeforeAll)(async function () {
    await LambdaUtility_1.LambdaUtility.warmUpLambda();
});
(0, cucumber_1.AfterAll)(function () {
});
(0, cucumber_1.AfterStep)(function () {
});
(0, cucumber_1.BeforeStep)(function () {
});
