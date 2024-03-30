import { LambdaClient } from '@aws-sdk/client-lambda';
import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  CognitoRepository,
  CustomersRepository,
  LeadsRepository,
  LoansRepository,
  NotificationsRepository,
  CUSTOMERS_USER_POOL_ID,
  EMPLOYEES_USER_POOL_ID,
  B2C_CLIENT_ID,
  B2B_CLIENT_ID,
} from '@ihf-rivendell/qa';

const configurations = {
  customers: {
    userPoolId: CUSTOMERS_USER_POOL_ID,
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
    userPoolId: EMPLOYEES_USER_POOL_ID,
  },
  b2c: {
    personas: { clientId: B2C_CLIENT_ID },
  },
  b2b: {
    backoffice: { clientId: B2B_CLIENT_ID },
  },
  contracts: {
    lambda: 'ContractsLambdaDev',
  },
  notifications: {
    lambda: 'NotificationsLambdaDev',
    cacheTable: 'NotificationsCacheDev',
  },
};

const dynamoDbClient = DynamoDBDocumentClient.from(new DynamoDBClient({}), {
  marshallOptions: {
    removeUndefinedValues: true,
  },
});

const lambdaClient = new LambdaClient({});
const cognitoClient = new CognitoIdentityProviderClient({});

export const customersRepository = new CustomersRepository({
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
export const cognitoRepository = new CognitoRepository({
  cognitoClient,
  userPoolId: configurations.customers.userPoolId,
  applications: {
    internetBanking: configurations.b2c.personas.clientId,
    backOffice: configurations.b2b.backoffice.clientId,
    internalOps: '',
  },
  employeeId: configurations.employees.defaultEmployeeId,
});

export const leadsRepository = new LeadsRepository({
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

export const loansRepository = new LoansRepository({
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

export const notificationsRepository = new NotificationsRepository({
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
