import { setWorldConstructor, World } from '@cucumber/cucumber';
import { generateIdentityDocument, generatePhoneNumber } from '@automation/assets/Utils';

class CustomWorld extends World {
  private identityDocument:string = '';

  private mobile: string = '';

  private identityType: string = '';

  constructor(options: any) {
    super(options);
    this.identityDocument = generateIdentityDocument();
    this.mobile = generatePhoneNumber();
  }

  getRandomIdentityNumber() {
    return this.identityDocument;
  }

  getRandomMobile() {
    return this.mobile;
  }

  setRandomIdentityNumber(identityDocument: string) {
    this.identityDocument = identityDocument;
  }

  setRandomMobile(mobile: string) {
    this.mobile = mobile;
  }

  setRandomIdentityType(identityType: string) {
    this.identityType = identityType;
  }

  getIdentityType() {
    return this.identityType;
  }
}

setWorldConstructor(CustomWorld);
