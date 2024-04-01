import {
  After, AfterAll, AfterStep, Before, BeforeAll, BeforeStep,
} from '@cucumber/cucumber';
import Environment from '@automation/config/Environment';
import { LambdaUtility } from '@automation/config/LambdaUtility';

Before(function () {
});

After(async function () {
  await Environment.cleanEnvironment({
    mobile: this.getRandomMobile(),
    identityDocument: {
      type: this.getIdentityType(),
      number: this.getRandomIdentityNumber(),
    },
  });
});

BeforeAll(async function () {
  await LambdaUtility.warmUpLambda();
});

AfterAll(function () {
});

AfterStep(function () {
});

BeforeStep(function () {
});
