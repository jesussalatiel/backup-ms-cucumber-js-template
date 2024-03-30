"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomGlobantEmail = exports.buildFailedOutput = exports.generatePhoneNumber = exports.generateIdentityDocument = void 0;
const generateIdentityDocument = () => {
    let identityNumber = '';
    for (let i = 0; i < 8; i += 1) {
        identityNumber += Math.floor(Math.random() * 10).toString();
    }
    return identityNumber;
};
exports.generateIdentityDocument = generateIdentityDocument;
const generatePhoneNumber = () => {
    const countryCode = '+52';
    const min = 9000;
    const max = 9999;
    const firstFourDigits = Math.floor(Math.random() * (max - min + 1)) + min;
    const randomNumber = Math.floor(Math.random() * 90000) + 10000;
    return `${countryCode}${firstFourDigits}${randomNumber}`;
};
exports.generatePhoneNumber = generatePhoneNumber;
const buildFailedOutput = (joiResponse, apiResponse) => ''
    .concat(JSON.stringify(joiResponse.error.details, null, 2))
    .concat('\n')
    .concat('-------------------------------------------------------------')
    .concat('\n')
    .concat('API Response: ')
    .concat('\n')
    .concat(JSON.stringify(apiResponse, null, 2))
    .concat('\n')
    .concat('-------------------------------------------------------------');
exports.buildFailedOutput = buildFailedOutput;
const generateRandomGlobantEmail = () => {
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
exports.generateRandomGlobantEmail = generateRandomGlobantEmail;
