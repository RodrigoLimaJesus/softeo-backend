import IInstallments from './installments';

export default interface IClient {
  id: number;
  cpf: string;
  name: string;
  email: string;
  cellNumber: string;
  installments?: IInstallments[];
}
