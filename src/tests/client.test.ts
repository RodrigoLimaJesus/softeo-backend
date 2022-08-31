import app from '../../index';
import { Response } from 'superagent';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import IClient from '../interfaces/client';
import { allClients } from './expects/clientExpects';

chai.use(chaiHttp);

let chaiResponse: Response;

describe('Testes para rotas de cliente', () => {
  it('Verifica se é possível buscar todos os clientes', async () => {
    chaiResponse = await chai.request(app).get('/client/all');
    const body: IClient[] = chaiResponse.body;

    body.forEach((client, index) => {
      const currentExpect = allClients[index];

      expect(client.id).exist;
      expect(client.cpf).to.be.equal(currentExpect.cpf);
      expect(client.name).to.be.equal(currentExpect.name);
      expect(client.email).to.be.equal(currentExpect.email);
      expect(client.cellNumber).to.be.equal(currentExpect.cellNumber);
    });
  });
});
