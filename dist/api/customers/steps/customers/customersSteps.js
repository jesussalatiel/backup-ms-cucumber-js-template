"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const BaseDataProcessor_1 = __importDefault(require("@automation/processor/BaseDataProcessor"));
const Configurations_1 = require("@automation/settings/Configurations");
(0, cucumber_1.When)('there are no existing customers', async function (customers) {
    const table = BaseDataProcessor_1.default.replaceRandomTextFromFields(this, customers);
    const rows = table.hashes();
    await Promise.all(rows.map(async (row) => {
        const customer = await Configurations_1.customersRepository.findByIdentityDocument(row.document_type, row.document_number);
        if (customer.statusCode === 200) {
            await Configurations_1.customersRepository.deleteByIdentityDocument(row.document_type, row.document_number);
        }
    }));
});
(0, cucumber_1.When)('I request to find a customer using the following params:', async function (customers) {
    const table = BaseDataProcessor_1.default.replaceRandomTextFromFields(this, customers);
    const buildPromise = table.hashes().map((row) => Configurations_1.customersRepository.findByIdentityDocument(row.document_type, row.document_number));
    [this.response] = await Promise.all(buildPromise);
});
(0, cucumber_1.When)('I request to create customer on Dynamo', async function (customers) {
    const table = BaseDataProcessor_1.default.replaceRandomTextFromFields(this, customers);
    const rows = table.hashes();
    await Promise.all(rows.map(async (row) => {
        const buildDynamo = {
            name: row.name,
            lastName: row.lastName,
            motherLastName: row.motherLastName,
            status: 'INVITED',
            identityDocument: {
                type: row.document_type,
                number: row.document_number,
            },
        };
        const customer = await Configurations_1.customersRepository.createCustomer(buildDynamo);
        const buildCognito = {
            email: row.email,
            mobile: row.mobile,
            status: 'INVITED',
        };
        this.response = await Configurations_1.customersRepository.sendInvitation(customer.body.id, buildCognito);
    }));
});
