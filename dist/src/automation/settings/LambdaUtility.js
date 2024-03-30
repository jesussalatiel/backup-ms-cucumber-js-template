"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LambdaUtility = void 0;
const Configurations_1 = require("@automation/settings/Configurations");
class LambdaUtility {
    static async warmUpLambda() {
        await Configurations_1.customersRepository.invokeWarmUp();
    }
}
exports.LambdaUtility = LambdaUtility;
