import { NextFunction, Request, Response } from 'express';

const errors = {
  clientNotFound: {
    message: 'Cliente não encontrado',
    code: 404,
  },
};

export default (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const message = err.message || err;
  const personalError = errors[message as keyof typeof errors];

  if (personalError) {
    const { code, message } = personalError;
    return res.status(code).json({ message });
  }

  return res.status(500).json({ message: 'Erro inesperado' });
};
