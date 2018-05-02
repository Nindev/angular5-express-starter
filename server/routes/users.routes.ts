import { NextFunction, Request, Response, Router } from 'express';
import { Users } from '../models/user.model';
import { User } from '../../declarations';
import { asyncMiddleware } from './utils';

const usersRoutes: Router = Router();

usersRoutes.get('/', asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    const users = await Users.find();
    res.json(users);
}));

usersRoutes.get('/me', asyncMiddleware(async (req, res, next) => {
    const me: User = await Users.findOne({_id: req.user.id});
    return res.json({
        email: me.email,
        name: me.name,
        sysAdmin: me.sysAdmin,
        admin: me.admin
    });
}));

export { usersRoutes };
