export const generateIdentityDocument = () => {
  let identityNumber: string = '';
  for (let i = 0; i < 8; i += 1) {
    identityNumber += Math.floor(Math.random() * 10).toString();
  }
  return identityNumber;
};

export const generatePhoneNumber = () => {
  const countryCode:string = '+52';
  const min:number = 9000;
  const max:number = 9999;
  const firstFourDigits:number = Math.floor(Math.random() * (max - min + 1)) + min;
  const randomNumber:number = Math.floor(Math.random() * 90000) + 10000;
  return `${countryCode}${firstFourDigits}${randomNumber}`;
};

export const buildFailedOutput = (joiResponse: any, apiResponse: any) => ''
  .concat(JSON.stringify(joiResponse.error.details, null, 2))
  .concat('\n')
  .concat('-------------------------------------------------------------')
  .concat('\n')
  .concat('API Response: ')
  .concat('\n')
  .concat(JSON.stringify(apiResponse, null, 2))
  .concat('\n')
  .concat('-------------------------------------------------------------');

export const generateRandomGlobantEmail = () => {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let username = '';
  const usernameLength = Math.floor(Math.random() * 10) + 5;

  for (let i = 0; i < usernameLength; i += 1) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    username += characters[randomIndex];
  }

  const domain = 'globant.com';
  const email = `${username}@${domain}`;
  return email;
};
