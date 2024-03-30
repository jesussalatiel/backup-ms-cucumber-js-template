import Joi from 'joi';

interface IdentityDocument {
  number: string;
  type: 'DNI';
}

interface Data {
  id: string;
  type: 'INDIVIDUAL';
  name: string;
  lastName: string;
  motherLastName: string;
  email: string;
  mobile: string;
  identityDocument: IdentityDocument;
  status: 'INVITED';
  creationDate: number;
}

const schema = Joi.object<Data>({
  id: Joi.string().guid().required(),
  type: Joi.string().valid('INDIVIDUAL').required(),
  name: Joi.string().required(),
  lastName: Joi.string().required(),
  motherLastName: Joi.string().required(),
  email: Joi.string().email().required(),
  mobile: Joi.string().pattern(/^\+\d{11}$/).required(),
  identityDocument: Joi.object<IdentityDocument>({
    number: Joi.string().required(),
    type: Joi.string().valid('DNI').required(),
  }).required(),
  status: Joi.string().valid('INVITED').required(),
  creationDate: Joi.number().integer().required(),
}).meta({ className: 'Data' });

export default schema;
