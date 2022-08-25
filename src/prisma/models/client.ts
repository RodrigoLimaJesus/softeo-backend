import { PrismaClient } from '@prisma/client';
import IClient from '../../interfaces/client';

export default class Client {
  _model;
  _prisma;

  constructor(_prisma = new PrismaClient()) {
    this._prisma = _prisma;
    this._model = _prisma.client;
  }

  public async create(userData: IClient) {
    await this._prisma.$connect();

    const insertData = await this._model.create({ data: { ...userData } });

    await this._prisma.$disconnect();

    return insertData;
  }

  public async getAll() {
    await this._prisma.$connect();

    const allUsers = await this._model.findMany();

    await this._prisma.$disconnect();

    return allUsers;
  }

  public async getOneByCpf(cpf: string) {
    await this._prisma.$connect();

    const oneUser = await this._model.findUnique({ where: { cpf } });

    await this._prisma.$disconnect();

    return oneUser;
  }
}
