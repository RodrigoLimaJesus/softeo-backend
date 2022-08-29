import { Router } from 'express';
import InstallmentController from '../controllers/installmentController';

const installmentRouter = Router();
const installmentController = new InstallmentController();

installmentRouter.get('/all', installmentController.getAll);

export default installmentRouter;
