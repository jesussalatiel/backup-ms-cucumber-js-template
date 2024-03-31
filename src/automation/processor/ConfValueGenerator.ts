import { generateRandomEmail } from '@automation/assets/Utils';

class ConfValueGenerator {
  getRandomValueBasedOnHeader(header: string, worldType: any, cell: string):string {
    switch (header) {
      case 'mobile':
        return worldType.getRandomMobile();
      case 'document_number':
        return worldType.getRandomIdentityNumber();
      case 'email':
        return generateRandomEmail();
      default:
        return cell;
    }
  }

  setRandomValueBasedOnHeader(row: any, worldType: any) {
    /* eslint-disable-next-line */
    const { document_number, mobile, document_type } = row;

    if (document_number !== undefined) {
      worldType.setRandomIdentityNumber(document_number);
    }

    if (mobile !== undefined) {
      worldType.setRandomMobile(mobile);
    }

    if (document_type !== undefined) {
      worldType.setRandomIdentityType(document_type);
    }
  }
}

export default new ConfValueGenerator();
