import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors'; 
import helmet from 'helmet';

const app: Express = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


import { errorMiddleware } from "./shared/middleware/errorMiddleware";
import authRoutes from "./modules/auth/authRoutes";
import passport from "./shared/config/passport";

app.use(passport.initialize());


import { swaggerSpecs } from "./shared/config/swagger";
import swaggerUi from "swagger-ui-express";

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'success', message: 'API is running successfully' });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));


app.use('/api/v1/auth', authRoutes);

app.use(errorMiddleware);

export default app;
