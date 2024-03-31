import { ICustomer } from '@ihf-rivendell/qa';

export class CustomerBuilder {
  buildDynamo(row: any): Partial<ICustomer> {
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

  buildCognito(row: any): any {
    return {
      email: row.email,
      mobile: row.mobile,
      status: row.status,
    };
  }
}

export function createCustomerBuilder(): CustomerBuilder {
  return new CustomerBuilder();
}
