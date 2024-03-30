"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const schema = joi_1.default.object({
    id: joi_1.default.string().guid().required(),
    type: joi_1.default.string().valid('INDIVIDUAL').required(),
    name: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    motherLastName: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    mobile: joi_1.default.string().pattern(/^\+\d{11}$/).required(),
    identityDocument: joi_1.default.object({
        number: joi_1.default.string().required(),
        type: joi_1.default.string().valid('DNI').required(),
    }).required(),
    status: joi_1.default.string().valid('INVITED').required(),
    creationDate: joi_1.default.number().integer().required(),
}).meta({ className: 'Data' });
exports.default = schema;
