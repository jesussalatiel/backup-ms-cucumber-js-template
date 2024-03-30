import {
  DataTable, When,
} from '@cucumber/cucumber';
import BaseDataProcessor from '@automation/processor/BaseDataProcessor';
import { customersRepository } from '@automation/settings/Configurations';

When('I remove a customer with the following params:', async function (customers: DataTable) {
  const table = BaseDataProcessor.replaceRandomTextFromFields(this, customers);
  const rows = table.hashes();

  await Promise.all(rows.map(async (row) => {
    const customer = await customersRepository.findByIdentityDocument(
      row.document_type,
      row.document_number,
    );
    if (customer.statusCode === 200) {
      await customersRepository.deleteByIdentityDocument(
        row.document_type,
        row.document_number,
      );
    }
  }));
});

When('I request to find a customer using the following params:', async function (customers: DataTable) {
  const table = BaseDataProcessor.replaceRandomTextFromFields(this, customers);
  const buildPromise = table.hashes().map((row) => customersRepository.findByIdentityDocument(
    row.document_type,
    row.document_number,
  ));
  [this.response] = await Promise.all(buildPromise);
});

When('I request to create customer on Dynamo', async function (customers: DataTable) {
  const table = BaseDataProcessor.replaceRandomTextFromFields(this, customers);
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

    const customer = await customersRepository.createCustomer(buildDynamo);

    const buildCognito = {
      email: row.email,
      mobile: row.mobile,
      status: 'INVITED',
    };

    this.response = await customersRepository.sendInvitation(customer.body.id, buildCognito);
  }));
});
