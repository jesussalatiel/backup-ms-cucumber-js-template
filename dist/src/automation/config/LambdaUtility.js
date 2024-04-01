"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LambdaUtility = void 0;
const index_1 = require("@automation/config/index");
class LambdaUtility {
    static async warmUpLambda() {
        await index_1.customersRepository.invokeWarmUp();
    }
}
exports.LambdaUtility = LambdaUtility;
