import {
  After, AfterAll, AfterStep, Before, BeforeAll, BeforeStep,
} from '@cucumber/cucumber';
import { LambdaUtility } from '@automation/settings/LambdaUtility';
import Environment from '@automation/Environment';

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
