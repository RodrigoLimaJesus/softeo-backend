import { Request, Response } from 'express';
import IClient from '../interfaces/client';
import ClientService from '../services/clientService';

export default class ClientController {
  constructor(private _service = new ClientService()) {}

  create = async (req: Request, res: Response) => {
    const clientData: IClient = req.body;

    const newClient = await this._service.create(clientData);

    return res.status(201).json(newClient);
  };

  getAll = async (_req: Request, res: Response) => {
    const allClients = await this._service.getAll();

    return res.status(200).json(allClients);
  };

  getOneById = async (req: Request, res: Response) => {
    const id = req.params.id as string;

    const clientData = await this._service.getOneById(id);

    return res.status(200).json(clientData);
  };

  exclude = async (req: Request, res: Response) => {
    const id = req.params.id as string;

    const clientData = await this._service.exclude(id);

    return res.status(200).json(clientData);
  };
}
