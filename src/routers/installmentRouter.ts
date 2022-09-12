import { Router } from 'express';
import InstallmentController from '../controllers/installmentController';
import InstallmentMiddleware from '../middlewares/installmentMiddleware';

const installmentRouter = Router();
const installmentController = new InstallmentController();
const installmentMiddleware = new InstallmentMiddleware();

installmentRouter.get('/all', installmentController.getAll);

installmentRouter.put('/', installmentController.updatePayment);

installmentRouter.delete(
  '/:id',
  installmentMiddleware.validateId,
  installmentController.exclude,
);

installmentRouter.use(
  installmentMiddleware.validateClientId,
  installmentMiddleware.validateStartDate,
  installmentMiddleware.validatePrice,
  installmentMiddleware.validateQuantity,
  installmentMiddleware.validateIntervalDay,
);

installmentRouter.post('/create', installmentController.createMany);

export default installmentRouter;
