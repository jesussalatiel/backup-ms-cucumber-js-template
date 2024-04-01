"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const Utils_1 = require("@automation/assets/Utils");
class CustomWorld extends cucumber_1.World {
    identityDocument = '';
    mobile = '';
    identityType = '';
    constructor(options) {
        super(options);
        this.identityDocument = (0, Utils_1.generateIdentityDocument)();
        this.mobile = (0, Utils_1.generatePhoneNumber)();
    }
    getRandomIdentityNumber() {
        return this.identityDocument;
    }
    getRandomMobile() {
        return this.mobile;
    }
    setRandomIdentityNumber(identityDocument) {
        this.identityDocument = identityDocument;
    }
    setRandomMobile(mobile) {
        this.mobile = mobile;
    }
    setRandomIdentityType(identityType) {
        this.identityType = identityType;
    }
    getIdentityType() {
        return this.identityType;
    }
}
(0, cucumber_1.setWorldConstructor)(CustomWorld);
