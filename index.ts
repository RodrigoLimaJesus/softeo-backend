import cors from 'cors';
import 'dotenv/config';
import express, { Request, Response } from 'express';
import 'express-async-errors';
import handleErrors from './src/middlewares/handleErrors';
import clientRouter from './src/routers/clientRouter';
import installmentRouter from './src/routers/installmentRouter';

const PORT = process.env.PORT || '3001';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/client', clientRouter);
app.use('/installment', installmentRouter);

app.use(handleErrors);

app.all('*', (_req: Request, res: Response) => {
  return res.status(404).json({
    message:
      'Rota não encontrada, por favor leia a documentação para ver as rotas disponíveis.',
    docs: 'https://github.com/RodrigoLimaJesus/softeo-backend',
  });
});

app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}`);
});

export default app;
