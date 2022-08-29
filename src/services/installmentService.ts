import IDateFilter from '../interfaces/dateFilter';
import InstallmentModel from '../prisma/models/installmentModel';

export default class InstallmentService {
  constructor(private _model = new InstallmentModel()) {}

  getAll = async ({ startDate, endDate }: IDateFilter) => {
    return this._model.getAll({ startDate, endDate });
  };
}
