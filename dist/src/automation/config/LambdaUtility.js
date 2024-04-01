"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LambdaUtility = void 0;
const repositories_1 = require("@automation/config/repositories");
class LambdaUtility {
    static async warmUpLambda() {
        await repositories_1.customersRepository.invokeWarmUp();
    }
}
exports.LambdaUtility = LambdaUtility;
