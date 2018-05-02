import { Router } from 'express';
import { usersRoutes } from './users.routes';

const apiRoutes: Router = Router();

apiRoutes.use('/users', usersRoutes);

export { apiRoutes };
