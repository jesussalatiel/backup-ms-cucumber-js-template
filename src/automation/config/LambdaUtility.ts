import { customersRepository } from '@automation/config/repositories';

export class LambdaUtility {
  static async warmUpLambda() {
    await customersRepository.invokeWarmUp();
  }
}
