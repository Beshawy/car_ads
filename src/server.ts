import app from './app';
import dotenv from 'dotenv';
import prisma from './shared/prisma';

dotenv.config();

const PORT = process.env.PORT || 7000;

async function startServer() {
  try {
    // database connection
    await prisma.$connect();
    console.log(' Database connection established successfully');

    app.listen(PORT, () => {
      console.log(` Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error(' Failed to connect to the database:', error);
    process.exit(1);
  }
}


process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION!  Shutting down...');
  console.log(err);
  process.exit(1);
});

startServer();
