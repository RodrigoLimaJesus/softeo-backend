import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function generateSeeds() {
  await prisma.$connect();

  try {
    await prisma.client.deleteMany();
    await prisma.installments.deleteMany();

    const clientOne = await prisma.client.create({
      data: {
        cellNumber: '92 12345678',
        email: 'test1@gmail.com',
        cpf: '12332112332',
        name: 'Rodrigo Lima',
      },
    });

    await prisma.installments.createMany({
      data: [
        {
          clientId: clientOne.id,
          itsPaid: false,
          paymentDate: new Date(),
          price: 100,
        },
        {
          clientId: clientOne.id,
          itsPaid: false,
          paymentDate: new Date(),
          price: 100,
        },
      ],
    });

    const clientTwo = await prisma.client.create({
      data: {
        cellNumber: '92 12345678',
        email: 'test2@hotmail.com',
        cpf: '45665445665',
        name: 'Rodrigo Jesus',
      },
    });

    await prisma.installments.createMany({
      data: [
        {
          clientId: clientTwo.id,
          itsPaid: false,
          paymentDate: new Date(),
          price: 150,
        },
        {
          clientId: clientTwo.id,
          itsPaid: false,
          paymentDate: new Date(),
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
