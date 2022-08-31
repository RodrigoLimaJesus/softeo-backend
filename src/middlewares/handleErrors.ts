import { NextFunction, Request, Response } from 'express';

const errors = {
  clientNotFound: {
    message: 'Cliente não encontrado',
    code: 404,
  },
  nameNotProvided: {
    message: 'Nome do cliente não informado',
    code: 400,
  },
  nameInvalidLength: {
    message: 'Nome do cliente deve conter pelo menos 3 caracteres',
    code: 400,
  },
  idNotProvided: {
    message: 'Id do cliente não informado',
    code: 400,
  },
  idInvalidType: {
    message: 'Id do cliente deve ser um inteiro',
    code: 400,
  },
  cpfNotProvided: {
    message: 'CPF do cliente não informado',
    code: 400,
  },
  cpfInvalidLength: {
    message: 'CPF do cliente deve conter 11 caracteres',
    code: 400,
  },
  emailNotProvided: {
    message: 'Email do cliente não informado',
    code: 400,
  },
  emailInvalidFormat: {
    message: 'Email do cliente deve conter: "@", ".com"',
    code: 400,
  },
  cellNumberNotProvided: {
    message: 'Número de telefone do cliente não informado',
    code: 400,
  },
  cellNumberInvalidLength: {
    message:
      'Número de telefone do cliente deve conter 11 caracteres,incluindo DDD',
    code: 400,
  },
  invalidInstallmentsNumber: {
    message: 'O número de parcelas tem que ser maior que 1',
    code: 400,
  },
  invalidInfoToUpdate: {
    message: 'O status de pagamento e o id da parcela devem ser informados.',
    code: 400,
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

  console.log(err.message);

  return res.status(500).json({ message: 'Erro inesperado' });
};
