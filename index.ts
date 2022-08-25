import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import handleErrors from './src/middlewares/handleErrors';
import clientRouter from './src/routers/clientRouter';

const PORT = process.env.port || '3001';

const app = express();
app.use(express.json());

app.use('/client', clientRouter);

app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}`);
});
