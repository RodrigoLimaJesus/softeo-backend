import { Router } from 'express';
import ClientController from '../controllers/clientController';
import ClientMiddleware from '../middlewares/clientMiddleware';

const clientRouter = Router();

const clientController = new ClientController();
const clientMiddleware = new ClientMiddleware();

clientRouter.get('/all', clientController.getAll);

clientRouter.get(
  '/:cpf',
  clientMiddleware.validateCpf,
  clientController.getOneByCpf,
);

clientRouter.post(
  '/create',
  clientMiddleware.validateCpf,
  clientMiddleware.validateEmail,
  clientMiddleware.validateCellNumber,
  clientMiddleware.validateName,
  clientController.create,
);

export default clientRouter;
