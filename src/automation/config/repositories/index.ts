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

const index = {
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
  customersLambda: index.customers.lambda,
  customersTable: index.customers.table,
  groupName: index.customers.groupName,
  accountingTable: '',
  customersReniecTable: '',
  userPoolId: index.customers.userPoolId,
  applications: {
    internetBanking: index.b2c.personas.clientId,
    backOffice: index.b2b.backoffice.clientId,
    internalOps: '',
  },
  employeeId: index.employees.defaultEmployeeId,
});
export const cognitoRepository = new CognitoRepository({
  cognitoClient,
  userPoolId: index.customers.userPoolId,
  applications: {
    internetBanking: index.b2c.personas.clientId,
    backOffice: index.b2b.backoffice.clientId,
    internalOps: '',
  },
  employeeId: index.employees.defaultEmployeeId,
});

export const leadsRepository = new LeadsRepository({
  lambdaClient,
  dynamoDbClient,
  leadsLambda: index.leads.lambda,
  leadsTable: index.leads.table,
  leadsPromotionsTable: '',
  secretId: '',
  applications: {
    internetBanking: index.b2c.personas.clientId,
    backOffice: index.b2b.backoffice.clientId,
    internalOps: '',
  },
  employeeId: index.employees.defaultEmployeeId,
});

export const loansRepository = new LoansRepository({
  dynamoDbClient,
  lambdaClient,
  loansTable: index.loans.table,
  loansLambda: index.loans.lambda,
  loansInstallmentsTable: '',
  loansSimulationsTable: '',
  mambuLoansTable: '',
  applications: {
    internetBanking: index.b2c.personas.clientId,
    backOffice: index.b2b.backoffice.clientId,
    internalOps: '',
  },
  employeeId: index.employees.defaultEmployeeId,
});

export const notificationsRepository = new NotificationsRepository({
  lambdaClient,
  dynamoDbClient,
  notificationsLambda: index.notifications.lambda,
  cacheTable: index.notifications.cacheTable,
  applications: {
    internetBanking: index.b2c.personas.clientId,
    backOffice: index.b2b.backoffice.clientId,
    internalOps: '',
  },
  employeeId: index.employees.defaultEmployeeId,
});
