import { PrismaClient } from '@prisma/client';
import IInstallment from '../../interfaces/installment';

export default class Installment {
  private _model;
  private _prisma;

  constructor(_prisma = new PrismaClient()) {
    this._prisma = _prisma;
    this._model = _prisma.installment;
  }

  public async createMany(installments: IInstallment[]) {
    await this._prisma.$connect();

    const insertData = await this._model.createMany({ data: installments });

    await this._prisma.$disconnect();

    return insertData;
  }

  public async getAll() {
    await this._prisma.$connect();

    const allInstallments = await this._model.findMany();

    await this._prisma.$disconnect();

    return allInstallments;
  }

  public async getOneByUserId(clientId: number) {
    await this._prisma.$connect();

    const installments = await this._model.findMany({ where: { clientId } });

    await this._prisma.$disconnect();

    return installments;
  }
}
