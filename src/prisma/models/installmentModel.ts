import { PrismaClient } from '@prisma/client';
import IInstallment from '../../interfaces/installment';
import { IDateFilter } from '../../interfaces/queryParams';

export default class InstallmentModel {
  private _model;

  constructor(private _prisma = new PrismaClient()) {
    this._prisma = _prisma;
    this._model = _prisma.installment;
  }

  getAll = async ({ startDate, endDate }: IDateFilter) => {
    await this._prisma.$connect();

    let start = undefined;
    let end = undefined;

    if (startDate) {
      start = new Date(startDate);
    }

    if (endDate) {
      end = new Date(endDate);
    }

    const allInstallments = await this._model.findMany({
      where: { paymentDate: { gte: start, lte: end } },
    });

    await this._prisma.$disconnect();

    return allInstallments;
  };

  createMany = async (installments: IInstallment[]) => {
    await this._prisma.$connect();

    const allInstallments = this._model.createMany({ data: installments });

    await this._prisma.$disconnect();

    return allInstallments;
  };

  updatePayment = async (id: number, status: boolean) => {
    await this._prisma.$connect();

    const updatedStatus = this._model.update({
      where: { id },
      data: { itsPaid: status },
    });

    await this._prisma.$disconnect();

    return updatedStatus;
  };

  exclude = async (id: number) => {
    await this._prisma.$connect();

    const deleteStatus = this._model.delete({
      where: { id },
    });

    await this._prisma.$disconnect();

    return deleteStatus;
  };
}
