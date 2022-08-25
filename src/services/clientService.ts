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

  getOneByCpf = async (cpf: string) => {
    const clientData = await this._model.getOneByCpf(cpf);

    if (!clientData) {
      throw new Error('clientNotFound');
    }

    return clientData;
  };
}
