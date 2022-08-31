import IClient from '../../interfaces/client';

export const allClients: IClient[] = [
  {
    id: 1,
    cpf: '12332112332',
    name: 'Rodrigo Lima',
    email: 'test1@gmail.com',
    cellNumber: '92912345678',
  },
  {
    id: 2,
    cpf: '45665445665',
    name: 'Rodrigo Jesus',
    email: 'test2@hotmail.com',
    cellNumber: '92912345678',
  },
];

export const oneClient = {
  id: 1,
  cpf: '12332112332',
  name: 'Rodrigo Lima',
  email: 'test1@gmail.com',
  cellNumber: '92912345678',
};

export const validClient = {
  cpf: '12345678912',
  name: 'Karolayne Limoeiro',
  email: 'test3@gmail.com',
  cellNumber: '92912345678',
};

export const clientNoCpf = {
  name: 'Karolayne Limoeiro',
  email: 'test3@gmail.com',
  cellNumber: '92912345678',
};

export const clientInvalidCpf = {
  cpf: '21',
  name: 'Karolayne Limoeiro',
  email: 'test3@gmail.com',
  cellNumber: '92912345678',
};

export const clientNoEmail = {
  cpf: '12345678912',
  name: 'Karolayne Limoeiro',
  cellNumber: '92912345678',
};

export const clientInvalidEmail = {
  cpf: '12345678912',
  name: 'Karolayne Limoeiro',
  email: 'test3@batinhaSemPontoCom',
  cellNumber: '92912345678',
};

export const clientNoNumber = {
  cpf: '12345678912',
  name: 'Karolayne Limoeiro',
  email: 'test3@gmail.com',
};

export const clientInvalidNumber = {
  cpf: '12345678912',
  name: 'Karolayne Limoeiro',
  email: 'test3@gmail.com',
  cellNumber: '21',
};

export const clientNoName = {
  cpf: '12345678912',
  email: 'test3@gmail.com',
  cellNumber: '92912345678',
};

export const clientInvalidName = {
  cpf: '12345678912',
  name: 'Ka',
  email: 'test3@gmail.com',
  cellNumber: '92912345678',
};
