"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationsRepository = exports.loansRepository = exports.leadsRepository = exports.cognitoRepository = exports.customersRepository = void 0;
const client_lambda_1 = require("@aws-sdk/client-lambda");
const client_cognito_identity_provider_1 = require("@aws-sdk/client-cognito-identity-provider");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const qa_1 = require("@ihf-rivendell/qa");
const configurations = {
    customers: {
        userPoolId: qa_1.CUSTOMERS_USER_POOL_ID,
        lambda: 'CustomersLambdaDev',
        groupName: 'DocumentKeyValidated',
        table: 'CustomersDev',
    },
    leads: {
        lambda: 'LeadsLambdaDev',
        table: 'LeadsDev',
    },
    loans: {
        lambda: 'LoansLambdaDev',
        table: 'LoansDev',
    },
    employees: {
        defaultEmployeeId: 'rivendell',
        userPoolId: qa_1.EMPLOYEES_USER_POOL_ID,
    },
    b2c: {
        personas: { clientId: qa_1.B2C_CLIENT_ID },
    },
    b2b: {
        backoffice: { clientId: qa_1.B2B_CLIENT_ID },
    },
    contracts: {
        lambda: 'ContractsLambdaDev',
    },
    notifications: {
        lambda: 'NotificationsLambdaDev',
        cacheTable: 'NotificationsCacheDev',
    },
};
const dynamoDbClient = lib_dynamodb_1.DynamoDBDocumentClient.from(new client_dynamodb_1.DynamoDBClient({}), {
    marshallOptions: {
        removeUndefinedValues: true,
    },
});
const lambdaClient = new client_lambda_1.LambdaClient({});
const cognitoClient = new client_cognito_identity_provider_1.CognitoIdentityProviderClient({});
exports.customersRepository = new qa_1.CustomersRepository({
    lambdaClient,
    dynamoDbClient,
    cognitoClient,
    customersLambda: configurations.customers.lambda,
    customersTable: configurations.customers.table,
    groupName: configurations.customers.groupName,
    accountingTable: '',
    customersReniecTable: '',
    userPoolId: configurations.customers.userPoolId,
    applications: {
        internetBanking: configurations.b2c.personas.clientId,
        backOffice: configurations.b2b.backoffice.clientId,
        internalOps: '',
    },
    employeeId: configurations.employees.defaultEmployeeId,
});
exports.cognitoRepository = new qa_1.CognitoRepository({
    cognitoClient,
    userPoolId: configurations.customers.userPoolId,
    applications: {
        internetBanking: configurations.b2c.personas.clientId,
        backOffice: configurations.b2b.backoffice.clientId,
        internalOps: '',
    },
    employeeId: configurations.employees.defaultEmployeeId,
});
exports.leadsRepository = new qa_1.LeadsRepository({
    lambdaClient,
    dynamoDbClient,
    leadsLambda: configurations.leads.lambda,
    leadsTable: configurations.leads.table,
    leadsPromotionsTable: '',
    secretId: '',
    applications: {
        internetBanking: configurations.b2c.personas.clientId,
        backOffice: configurations.b2b.backoffice.clientId,
        internalOps: '',
    },
    employeeId: configurations.employees.defaultEmployeeId,
});
exports.loansRepository = new qa_1.LoansRepository({
    dynamoDbClient,
    lambdaClient,
    loansTable: configurations.loans.table,
    loansLambda: configurations.loans.lambda,
    loansInstallmentsTable: '',
    loansSimulationsTable: '',
    mambuLoansTable: '',
    applications: {
        internetBanking: configurations.b2c.personas.clientId,
        backOffice: configurations.b2b.backoffice.clientId,
        internalOps: '',
    },
    employeeId: configurations.employees.defaultEmployeeId,
});
exports.notificationsRepository = new qa_1.NotificationsRepository({
    lambdaClient,
    dynamoDbClient,
    notificationsLambda: configurations.notifications.lambda,
    cacheTable: configurations.notifications.cacheTable,
    applications: {
        internetBanking: configurations.b2c.personas.clientId,
        backOffice: configurations.b2b.backoffice.clientId,
        internalOps: '',
    },
    employeeId: configurations.employees.defaultEmployeeId,
});
