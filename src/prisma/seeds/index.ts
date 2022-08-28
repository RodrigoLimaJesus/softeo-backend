import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function generateSeeds() {
  await prisma.$connect();

  try {
    await prisma.installment.deleteMany();
    await prisma.client.deleteMany();

    const clientOne = await prisma.client.create({
      data: {
        cellNumber: '92912345678',
        email: 'test1@gmail.com',
        cpf: '12332112332',
        name: 'Rodrigo Lima',
      },
    });

    const dateOne = new Date();

    await prisma.installment.createMany({
      data: [
        {
          clientId: clientOne.id,
          itsPaid: false,
          paymentDate: new Date(dateOne.setDate(dateOne.getDate() - 30)),
          price: 100,
        },
        {
          clientId: clientOne.id,
          itsPaid: false,
          paymentDate: new Date(dateOne.setDate(dateOne.getDate() + 30)),
          price: 100,
        },
        {
          clientId: clientOne.id,
          itsPaid: false,
          paymentDate: new Date(dateOne.setDate(dateOne.getDate() + 30)),
          price: 100,
        },
      ],
    });

    const clientTwo = await prisma.client.create({
      data: {
        cellNumber: '92912345678',
        email: 'test2@hotmail.com',
        cpf: '45665445665',
        name: 'Rodrigo Jesus',
      },
    });

    const dateTwo = new Date();

    await prisma.installment.createMany({
      data: [
        {
          clientId: clientTwo.id,
          itsPaid: false,
          paymentDate: new Date(dateTwo.setDate(dateTwo.getDate() + 30)),
          price: 150,
        },
        {
          clientId: clientTwo.id,
          itsPaid: false,
          paymentDate: new Date(dateTwo.setDate(dateTwo.getDate() + 30)),
          price: 150,
        },
        {
          clientId: clientTwo.id,
          itsPaid: false,
          paymentDate: new Date(dateTwo.setDate(dateTwo.getDate() + 30)),
          price: 150,
        },
      ],
    });

    prisma.$disconnect();
  } catch (error) {
    console.log(error);
    prisma.$disconnect();
  }
}

generateSeeds();
