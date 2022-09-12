import IInstallment, {
  IBodyCreateInstallment,
} from '../interfaces/installment';
import { IDateFilter, IUpdateInfo } from '../interfaces/queryParams';
import InstallmentModel from '../prisma/models/installmentModel';

export default class InstallmentService {
  constructor(private _model = new InstallmentModel()) {}

  getAll = async ({ startDate, endDate }: IDateFilter) => {
    return this._model.getAll({ startDate, endDate });
  };

  createMany = async (infoToCreate: IBodyCreateInstallment) => {
    const { startDate, quantity, clientId, intervalDay, price } = infoToCreate;
    let start: Date = new Date();

    if (startDate) {
      start = new Date(startDate);
    }

    const newInstallments: IInstallment[] = [];

    for (let i = 0; i < quantity; i++) {
      newInstallments.push({
        clientId,
        paymentDate: new Date(start.setDate(start.getDate() + intervalDay)),
        price,
      });
    }

    return this._model.createMany(newInstallments);
  };

  updatePayment = async (infoToUpdate: IUpdateInfo) => {
    if (!infoToUpdate.id || !infoToUpdate.status) {
      throw new Error('invalidInfoToUpdate');
    }
    const { id, status } = infoToUpdate;

    const boolStatus: boolean = JSON.parse(status);

    return this._model.updatePayment(Number(id), boolStatus);
  };

  exclude = async (id: string) => {
    const numericId = Number(id);
    const excludeData = this._model.exclude(numericId);

    return excludeData;
  };
}
