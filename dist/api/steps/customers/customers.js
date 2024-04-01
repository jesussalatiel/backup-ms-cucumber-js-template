"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const BaseDataProcessor_1 = __importDefault(require("@automation/processor/BaseDataProcessor"));
const CustomerBuilder_1 = require("@automation/utils/requests/CustomerBuilder");
const validations_1 = require("@validations/validations");
const index_1 = require("@automation/config/repositories/index");
(0, cucumber_1.When)('I remove a customer with the following params:', async function (customers) {
    const table = BaseDataProcessor_1.default.replaceRandomTextFromFields(this, customers);
    const rows = table.hashes();
    await Promise.all(rows.map(async (row) => {
        const customer = await index_1.customersRepository.findByIdentityDocument(row.document_type, row.document_number);
        if (customer.statusCode === 200) {
            await index_1.customersRepository.deleteByIdentityDocument(row.document_type, row.document_number);
        }
    }));
});
(0, cucumber_1.When)('I request to find a customer using the following params:', async function (customers) {
    const table = BaseDataProcessor_1.default.replaceRandomTextFromFields(this, customers);
    const buildPromise = table.hashes().map((row) => index_1.customersRepository.findByIdentityDocument(row.document_type, row.document_number));
    [this.response] = await Promise.all(buildPromise);
});
(0, cucumber_1.When)('I request to create customer on Dynamo', async function (customers) {
    const table = BaseDataProcessor_1.default.replaceRandomTextFromFields(this, customers);
    const rows = table.hashes();
    await Promise.all(rows.map(async (row) => {
        const customer = await index_1.customersRepository.createCustomer((0, CustomerBuilder_1.createCustomerBuilder)().buildDynamo(row));
        this.response = await index_1.customersRepository.sendInvitation(customer.body.id, (0, CustomerBuilder_1.createCustomerBuilder)().buildCognito(row));
        (0, validations_1.checkStatusCode)(this.response.statusCode, Number(row.status_code));
    }));
});
