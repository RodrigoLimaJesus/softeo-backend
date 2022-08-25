import { PrismaClient } from '@prisma/client';
import IClient from '../../interfaces/client';

export default class ClientModel {
  private _model;

  constructor(private _prisma = new PrismaClient()) {
    this._prisma = _prisma;
    this._model = _prisma.client;
  }

  create = async (clientData: IClient) => {
    await this._prisma.$connect();

    const insertData = await this._model.create({ data: { ...clientData } });

    await this._prisma.$disconnect();

    return insertData;
  };

  getAll = async () => {
    await this._prisma.$connect();

    const allClients = await this._model.findMany();

    await this._prisma.$disconnect();

    return allClients;
  };

  getOneByCpf = async (cpf: string) => {
    await this._prisma.$connect();

    const clientData = await this._model.findUnique({ where: { cpf } });

    await this._prisma.$disconnect();

    return clientData;
  };
}
