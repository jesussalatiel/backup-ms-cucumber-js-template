import { When, DataTable } from '@cucumber/cucumber';
import assert from 'assert';
import { buildFailedOutput } from '@automation/assets/Utils';

When('API response status code should be {int}', function (statusCode: number) {
  assert.equal(this.response.statusCode, statusCode, JSON.stringify(this.response, null, 2));
});

When('I have the following Joi schema:', async function (schemas: DataTable) {
  const apiResponse = this.response.body;

  await Promise.all(schemas.hashes().map(async (row) => {
    try {
      const { default: schema } = await import(`../../schemas/${row.schemaName}.ts`);
      const validationResult = await schema.validate(apiResponse);

      if (validationResult.error) {
        throw new Error(buildFailedOutput(validationResult, apiResponse));
      }
    } catch (error: any) {
      throw new Error(`Failed to validate schema: ${error.message}`);
    }
  }));
});
