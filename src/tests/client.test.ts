import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import { Response } from 'superagent';
import app from '../../index';
import IClient from '../interfaces/client';
import { allClients, oneClient } from './expects/clientExpects';

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

  describe('Verifica os retornos ao buscar o cliente pelo Id', () => {
    it('Com id válido', async () => {
      chaiResponse = await chai.request(app).get('/client/all');
      const bodyAllClients: IClient[] = chaiResponse.body;
      const [{ id }] = bodyAllClients;

      chaiResponse = await chai.request(app).get(`/client/${id}`);
      const bodyOneClient: IClient = chaiResponse.body;

      expect(bodyOneClient.id).exist;
      expect(bodyOneClient.cpf).to.be.equal(oneClient.cpf);
      expect(bodyOneClient.name).to.be.equal(oneClient.name);
      expect(bodyOneClient.email).to.be.equal(oneClient.email);
      expect(bodyOneClient.cellNumber).to.be.equal(oneClient.cellNumber);
    });

    it('Com id inválido', async () => {
      chaiResponse = await chai.request(app).get(`/client/xablau`);
      const { message }: Error = chaiResponse.body;

      expect(message).exist;
      expect(message).to.be.equal('Id do cliente deve ser um inteiro');
    });
  });
});
