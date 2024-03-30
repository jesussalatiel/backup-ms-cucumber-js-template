"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = require("@automation/assets/Utils");
class RandomValueGenerator {
    getRandomValueBasedOnHeader(header, worldType, cell) {
        switch (header) {
            case 'mobile':
                return worldType.getRandomMobile();
            case 'document_number':
                return worldType.getRandomIdentityNumber();
            case 'email':
                return (0, Utils_1.generateRandomGlobantEmail)();
            default:
                return cell;
        }
    }
    setRandomValueBasedOnHeader(row, worldType) {
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
exports.default = new RandomValueGenerator();
