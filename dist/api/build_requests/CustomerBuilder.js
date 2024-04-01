"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomerBuilder = exports.CustomerBuilder = void 0;
class CustomerBuilder {
    buildDynamo(row) {
        return {
            name: row.name,
            lastName: row.last_name,
            motherLastName: row.mother_last_name,
            identityDocument: {
                type: row.document_type || '',
                number: row.document_number || '',
            },
        };
    }
    buildCognito(row) {
        return {
            email: row.email,
            mobile: row.mobile,
            status: row.status,
        };
    }
}
exports.CustomerBuilder = CustomerBuilder;
function createCustomerBuilder() {
    return new CustomerBuilder();
}
exports.createCustomerBuilder = createCustomerBuilder;
