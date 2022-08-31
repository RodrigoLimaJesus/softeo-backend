import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import { Response } from 'superagent';
import app from '../../index';
import IClient from '../interfaces/client';

import {
  allClients,
  clientInvalidCpf,
  clientInvalidEmail,
  clientInvalidName,
  clientInvalidNumber,
  clientNoCpf,
  clientNoEmail,
  clientNoName,
  clientNoNumber,
  oneClient,
  validClient,
} from './expects/clientExpects';

chai.use(chaiHttp);

let chaiResponse: Response;

describe('Testes para rotas de cliente', () => {
  it('Verifica se é possível buscar todos os clientes', async () => {
    chaiResponse = await chai.request(app).get('/client/all');
    const body: IClient[] = chaiResponse.body;

    body.forEach((client) => {
      const currentExpect = allClients.find(({ id }) => id === client.id);

      if (currentExpect) {
        expect(client.id).exist;
        expect(client.cpf).to.be.equal(currentExpect.cpf);
        expect(client.name).to.be.equal(currentExpect.name);
        expect(client.email).to.be.equal(currentExpect.email);
        expect(client.cellNumber).to.be.equal(currentExpect.cellNumber);
      }
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

  describe('Verifica os retornos ao criar um cliente', () => {
    it('Verifica se é possível criar um cliente com os dados corretos', async () => {
      chaiResponse = await chai
        .request(app)
        .post('/client/create')
        .send(validClient);

      const body: IClient = chaiResponse.body;

      expect(body.id).exist;
      expect(body.cpf).to.be.equal(validClient.cpf);
      expect(body.name).to.be.equal(validClient.name);
      expect(body.email).to.be.equal(validClient.email);
      expect(body.cellNumber).to.be.equal(validClient.cellNumber);
    });

    it('Verifica o retorno correto para CPF ausente', async () => {
      chaiResponse = await chai
        .request(app)
        .post('/client/create')
        .send(clientNoCpf);

      const { message }: Error = chaiResponse.body;

      expect(message).exist;
      expect(message).to.be.equal('CPF do cliente não informado');
    });

    it('Verifica o retorno correto para CPF inválido', async () => {
      chaiResponse = await chai
        .request(app)
        .post('/client/create')
        .send(clientInvalidCpf);

      const { message }: Error = chaiResponse.body;

      expect(message).exist;
      expect(message).to.be.equal('CPF do cliente deve conter 11 caracteres');
    });

    it('Verifica o retorno correto para EMAIL ausente', async () => {
      chaiResponse = await chai
        .request(app)
        .post('/client/create')
        .send(clientNoEmail);

      const { message }: Error = chaiResponse.body;

      expect(message).exist;
      expect(message).to.be.equal('Email do cliente não informado');
    });

    it('Verifica o retorno correto para EMAIL inválido', async () => {
      chaiResponse = await chai
        .request(app)
        .post('/client/create')
        .send(clientInvalidEmail);

      const { message }: Error = chaiResponse.body;

      expect(message).exist;
      expect(message).to.be.equal('Email do cliente deve conter: "@", ".com"');
    });

    it('Verifica o retorno correto para NÚMERO ausente', async () => {
      chaiResponse = await chai
        .request(app)
        .post('/client/create')
        .send(clientNoNumber);

      const { message }: Error = chaiResponse.body;

      expect(message).exist;
      expect(message).to.be.equal(
        'Número de telefone do cliente não informado',
      );
    });

    it('Verifica o retorno correto para NÚMERO inválido', async () => {
      chaiResponse = await chai
        .request(app)
        .post('/client/create')
        .send(clientInvalidNumber);

      const { message }: Error = chaiResponse.body;

      expect(message).exist;
      expect(message).to.be.equal(
        'Número de telefone do cliente deve conter 11 caracteres,incluindo DDD',
      );
    });

    it('Verifica o retorno correto para NOME ausente', async () => {
      chaiResponse = await chai
        .request(app)
        .post('/client/create')
        .send(clientNoName);

      const { message }: Error = chaiResponse.body;

      expect(message).exist;
      expect(message).to.be.equal('Nome do cliente não informado');
    });

    it('Verifica o retorno correto para NOME inválido', async () => {
      chaiResponse = await chai
        .request(app)
        .post('/client/create')
        .send(clientInvalidName);

      const { message }: Error = chaiResponse.body;

      expect(message).exist;
      expect(message).to.be.equal(
        'Nome do cliente deve conter pelo menos 3 caracteres',
      );
    });
  });
});
