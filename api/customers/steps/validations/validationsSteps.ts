import { Then, DataTable } from '@cucumber/cucumber';
import assert from 'assert';
import { buildFailedOutput } from '@automation/assets/Utils';
import {
  isValidUUID,
  logger,
} from '@ihf-rivendell/qa';

enum HeaderType {
  IHF_Correlation_Id = 'IHF-Correlation-Id',
  IHF_Access_Control = 'Access-Control-Allow-Headers',
}

export const readSchema = async (schemas: DataTable, apiResponse: any) => {
  await Promise.all(schemas.hashes().map(async (row) => {
    try {
      const { default: schema } = await import(`../../schemas/${row.schema_name}.ts`);
      const validationResult = await schema.validate(apiResponse);

      if (validationResult.error) {
        throw new Error(buildFailedOutput(validationResult, apiResponse));
      }
    } catch (error: any) {
      throw new Error(`Failed to validate schema: ${error.message}`);
    }
  }));
};

export const checkStatusCode = (apiStatusCode: any, expectedStatusCode: number) => {
  if (expectedStatusCode !== undefined || expectedStatusCode !== 0) {
    assert.equal(apiStatusCode, expectedStatusCode, `Code Received was: ${apiStatusCode}`);
  }
};
Then('API response status code should be {int}', function (statusCode: number) {
  assert.equal(this.response.statusCode, statusCode, JSON.stringify(this.response, null, 2));
});

Then('I initiate the JOI validation searching for the schema:', async function (schemas: DataTable) {
  await readSchema(schemas, this.response.body);
});

Then('API response header {string} should contain the following values:', async function (header: string, headers: DataTable) {
  headers.hashes().forEach((row) => {
    const value = row.Content_Type;
    switch (header) {
      case HeaderType.IHF_Access_Control:
        assert.ok(
          this.response.headers['Access-Control-Allow-Headers'].includes(value),
          `Value '${value}' not found in ${header}`,
        );
        break;
      default:
        throw new Error('Header Type is not supported.');
    }
  });
});

Then('API response header {string} should be a valid UUID', async function (header: string) {
  switch (header) {
    case HeaderType.IHF_Correlation_Id:
      /* eslint-disable no-case-declarations */
      const correlationId = this.response.headers[header];
      assert.ok(
        isValidUUID(correlationId),
        `Value '${correlationId}' not found in ${header}`,
      );
      break;
    default:
      throw new Error('Header Type is not supported.');
  }
});

Then('As a developer print response', function () {
  logger.error(JSON.stringify(this.response, null, 2));
});
