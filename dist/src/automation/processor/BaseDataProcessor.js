"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const RandomValueGenerator_1 = __importDefault(require("@automation/processor/RandomValueGenerator"));
class BaseDataProcessor {
    static replaceRandomTextFromFields(worldType, table) {
        const headers = table.raw()[0];
        const updatedData = table.raw().map((row) => row.map((cell, colIndex) => {
            const header = headers[colIndex];
            const regex = /local:default:random/;
            if (regex.test(cell)) {
                return RandomValueGenerator_1.default.getRandomValueBasedOnHeader(header, worldType, cell);
            }
            return cell;
        }));
        const newTable = new cucumber_1.DataTable(updatedData);
        newTable.hashes().forEach((row) => {
            RandomValueGenerator_1.default.setRandomValueBasedOnHeader(row, worldType);
        });
        return newTable;
    }
}
exports.default = BaseDataProcessor;
