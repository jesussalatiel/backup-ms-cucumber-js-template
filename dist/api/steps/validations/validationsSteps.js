"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkStatusCode = exports.readSchema = void 0;
const cucumber_1 = require("@cucumber/cucumber");
const assert_1 = __importDefault(require("assert"));
const Utils_1 = require("@automation/assets/Utils");
const qa_1 = require("@ihf-rivendell/qa");
var HeaderType;
(function (HeaderType) {
    HeaderType["IHF_Correlation_Id"] = "IHF-Correlation-Id";
    HeaderType["IHF_Access_Control"] = "Access-Control-Allow-Headers";
})(HeaderType || (HeaderType = {}));
const readSchema = async (schemas, apiResponse) => {
    await Promise.all(schemas.hashes().map(async (row) => {
        try {
            const { default: schema } = await Promise.resolve(`${`../../schemas/${row.schema_name}.ts`}`).then(s => __importStar(require(s)));
            const validationResult = await schema.validate(apiResponse);
            if (validationResult.error) {
                throw new Error((0, Utils_1.buildFailedOutput)(validationResult, apiResponse));
            }
        }
        catch (error) {
            throw new Error(`Failed to validate schema: ${error.message}`);
        }
    }));
};
exports.readSchema = readSchema;
const checkStatusCode = (apiStatusCode, expectedStatusCode) => {
    if (expectedStatusCode !== undefined || expectedStatusCode !== 0) {
        assert_1.default.equal(apiStatusCode, expectedStatusCode, `Code Received was: ${apiStatusCode}`);
    }
};
exports.checkStatusCode = checkStatusCode;
(0, cucumber_1.Then)('API response status code should be {int}', function (statusCode) {
    assert_1.default.equal(this.response.statusCode, statusCode, JSON.stringify(this.response, null, 2));
});
(0, cucumber_1.Then)('I initiate the JOI validation searching for the schema:', async function (schemas) {
    await (0, exports.readSchema)(schemas, this.response.body);
});
(0, cucumber_1.Then)('API response header {string} should contain the following values:', async function (header, headers) {
    headers.hashes().forEach((row) => {
        const value = row.Content_Type;
        switch (header) {
            case HeaderType.IHF_Access_Control:
                assert_1.default.ok(this.response.headers['Access-Control-Allow-Headers'].includes(value), `Value '${value}' not found in ${header}`);
                break;
            default:
                throw new Error('Header Type is not supported.');
        }
    });
});
(0, cucumber_1.Then)('API response header {string} should be a valid UUID', async function (header) {
    switch (header) {
        case HeaderType.IHF_Correlation_Id:
            /* eslint-disable no-case-declarations */
            const correlationId = this.response.headers[header];
            assert_1.default.ok((0, qa_1.isValidUUID)(correlationId), `Value '${correlationId}' not found in ${header}`);
            break;
        default:
            throw new Error('Header Type is not supported.');
    }
});
(0, cucumber_1.Then)('As a developer print response', function () {
    qa_1.logger.error(JSON.stringify(this.response, null, 2));
});
