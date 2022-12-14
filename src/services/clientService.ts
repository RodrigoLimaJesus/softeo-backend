import IClient from '../interfaces/client';
import ClientModel from '../prisma/models/clientModel';

export default class ClientService {
  constructor(private _model = new ClientModel()) {}

  create = async (clientData: IClient) => {
    return this._model.create(clientData);
  };

  getAll = async () => {
    return this._model.getAll();
  };

  getOneById = async (id: string) => {
    const clientData = await this._model.getOneById(id);

    if (!clientData) {
      throw new Error('clientNotFound');
    }

    return clientData;
  };

  exclude = async (id: string) => {
    const numericId = Number(id);
    const excludeData = this._model.exclude(numericId);

    return excludeData;
  };
}
