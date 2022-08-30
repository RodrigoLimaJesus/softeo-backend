import IDateFilter from '../interfaces/dateFilter';
import IInstallment, {
  IBodyCreateInstallment,
} from '../interfaces/installment';
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
}
