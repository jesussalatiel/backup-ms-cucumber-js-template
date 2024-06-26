import { sleep } from '@ihf-rivendell/qa';
import { customersRepository } from '@automation/config/repositories';
import assert from 'assert';

interface ICustomer {
  mobile: string
  identityDocument: {
    number: string,
    type: string
  },
}
class Environment {
  async cleanEnvironment(params: ICustomer) {
    await sleep(600);

    const identityType = params.identityDocument.type;
    const identityNumber = params.identityDocument.number;
    const exists = await customersRepository.findByIdentityDocument(identityType, identityNumber);

    if (exists.statusCode === 200) {
      await customersRepository.deleteByIdentityDocument(identityType, identityNumber);
    }

    const updatedExists = await customersRepository.findByIdentityDocument(
      identityType,
      identityNumber,
    );

    assert.ok(updatedExists.statusCode !== 200);
  }
}

export default new Environment();
