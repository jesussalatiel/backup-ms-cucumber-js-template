import { customersRepository } from '@automation/settings/Configurations';

export class LambdaUtility {
  static async warmUpLambda() {
    await customersRepository.invokeWarmUp();
  }
}
