import 'reflect-metadata';
import 'express-async-errors';
import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import routes from './routes';
import AppError from '../../errors/AppError';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});
const port = process.env.PORT;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running - Port:${port} Env:${process.env.ENV}...`);
});
