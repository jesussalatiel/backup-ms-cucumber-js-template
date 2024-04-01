"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const qa_1 = require("@ihf-rivendell/qa");
const repositories_1 = require("@automation/config/repositories");
const assert_1 = __importDefault(require("assert"));
class Environment {
    async cleanEnvironment(params) {
        await (0, qa_1.sleep)(600);
        const identityType = params.identityDocument.type;
        const identityNumber = params.identityDocument.number;
        const exists = await repositories_1.customersRepository.findByIdentityDocument(identityType, identityNumber);
        if (exists.statusCode === 200) {
            await repositories_1.customersRepository.deleteByIdentityDocument(identityType, identityNumber);
        }
        const updatedExists = await repositories_1.customersRepository.findByIdentityDocument(identityType, identityNumber);
        assert_1.default.ok(updatedExists.statusCode !== 200);
    }
}
exports.default = new Environment();
