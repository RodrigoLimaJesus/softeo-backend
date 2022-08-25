import { Router } from 'express';
import ClientController from '../controllers/clientController';

const clientRouter = Router();

const clientController = new ClientController();

clientRouter.get('/all', clientController.getAll);
clientRouter.get('/:cpf', clientController.getOneByCpf);

clientRouter.post('/create', clientController.create);

export default clientRouter;
