import { PrismaClient } from '@prisma/client';
import IClient from '../../src/interfaces/client';

export default class Client {
  _model;
  _prisma;

  constructor(_prisma = new PrismaClient()) {
    this._prisma = _prisma;
    this._model = _prisma.client;
  }

  public async create(userData: IClient) {
    try {
      await this._prisma.$connect();

      const insertData = await this._model.create({ data: { ...userData } });

      await this._prisma.$disconnect();

      return insertData;
    } catch (error) {
      console.log(error);

      await this._prisma.$disconnect();

      return { message: 'Algum erro aconteceu' };
    }
  }

  public async getAll() {
    try {
      await this._prisma.$connect();

      const allUsers = await this._model.findMany();

      await this._prisma.$disconnect();

      return allUsers;
    } catch (error) {
      console.log(error);

      await this._prisma.$disconnect();

      return { message: 'Algum erro aconteceu' };
    }
  }

  public async getOneByCpf(cpf: string) {
    try {
      await this._prisma.$connect();

      const allUsers = await this._model.findUnique({ where: { cpf } });

      await this._prisma.$disconnect();

      return allUsers;
    } catch (error) {
      console.log(error);

      await this._prisma.$disconnect();

      return { message: 'Algum erro aconteceu' };
    }
  }
}
