const request = require('supertest');
const app = require('../src/app')();
const yup = require('yup');
const { sequelize } = require('../src/models');
const mongoose = require('../src/dbMongo/mongoose');
const CONSTANTS = require("../src/constants");

const appRequest = request(app);

function createUser(index = 0) {
  return {
    firstName: `User${index}`,
    lastName: `User${index}`,
    displayName: `User${index}`,
    email: `user${index}@user.user`,
    password: "sadsadsadsaa",
    role: CONSTANTS.CUSTOMER,
  }
}

beforeAll(async () => {
  return sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
  await mongoose.connection.close();
});

const REGISTRATION_SUCCESS_SCHEMA = yup.object({
  user: yup.object().required(),
  tokenPair: yup.object({
    accessToken: yup.string().required(),
    refreshToken: yup.string().required(),
  }).required()
});

describe('user registration tests', () => {
  test('пользователь с корректными данным должен успешно зарегистрироваться', async () => {
    const response = await appRequest.post('/auth/registration').send(createUser(1));

    expect(response.statusCode).toBe(201);
    expect(REGISTRATION_SUCCESS_SCHEMA.isValidSync(response.body)).toBe(true);
  });

  test('пользователь с некорректными данным не должен успешно зарегистрироваться', async () => {
    const response = await appRequest.post('/auth/registration').send({ dssada: 'asdsadsa' });

    expect(response.statusCode).toBe(400);
    expect(REGISTRATION_SUCCESS_SCHEMA.isValidSync(response.body)).toBe(false);
  });

  test('нельзя создать пользователей с одинаковыми почтами', async () => {
    const response = await appRequest.post('/auth/registration').send(createUser(1));

    expect(response.statusCode).toBe(409);
    expect(REGISTRATION_SUCCESS_SCHEMA.isValidSync(response.body)).toBe(false);
  });
});
