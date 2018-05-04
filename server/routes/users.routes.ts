import { NextFunction, Request, Response, Router } from 'express';
import { Users } from '../models/user.model';
import { asyncMiddleware, userIsAdminMiddleware } from './utils';
import { User } from '../declarations';
import { Config } from '../config';
import { pbkdf2Sync } from 'crypto';

const usersRoutes: Router = Router();

usersRoutes.get('/', asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    const users = await Users.find();
    res.json(users);
}));

usersRoutes.post('/', userIsAdminMiddleware, asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.password) {
        const err = new Error('No password supplied!');
        return next(err);
    }

    const count = await Users.count({ email: req.body.email });
    if (count > 0) {
        return next(new Error('User already exists'));
    }

    const salt = new Buffer(Config.OB_CRYPT_SALT).toString('base64');
    const hash = pbkdf2Sync(req.body.password, salt, 10000, Config.OB_CRYPTO_KEY_LENGTH, Config.OB_CRYPTO_DIGEST);
    const hashedPassword = hash.toString('hex');
    Users.create({
        email: req.body.email,
        name: req.body.name,
        admin: req.body.admin,
        hashedPassword
    }).then(user => {
        res.json({
            hash: hashedPassword
        });
    }).catch(err => next(err));
}));

usersRoutes.get('/me', asyncMiddleware(async (req, res, next) => {
    const me: User = await Users.findOne({_id: req.user.id});
    if (!me) {
        return next(new Error('User not found'));
    }
    return res.json({
        email: me.email,
        name: me.name,
        sysAdmin: me.sysAdmin,
        admin: me.admin
    });
}));

const userDetailAuthCheck = (req, res, next) => {
    if (req.params.id === req.user.id) {
        return next();
    }

   return userIsAdminMiddleware(req, res, next);
};

usersRoutes.get('/:id', userDetailAuthCheck, asyncMiddleware(async (req, res, next) => {
    const user: User = await Users.findOne({ _id: req.params.id });
    if (!user) {
        return next(new Error('User not found'));
    }

    return res.json({
        _id: user.id,
        email: user.email,
        name: user.name,
        sysAdmin: user.sysAdmin,
        admin: user.admin
    });
}));

usersRoutes.post('/:id', userIsAdminMiddleware, asyncMiddleware(async (req, res, next) => {
    const data = Object.assign({}, req.body);
    delete data._id;
    const user = await Users.updateOne({ _id: req.body._id}, data);

    return res.json({
        _id: user.id,
        email: user.email,
        name: user.name,
        sysAdmin: user.sysAdmin,
        admin: user.admin
    });
}));

usersRoutes.delete('/:id', userIsAdminMiddleware, asyncMiddleware(async (req, res, next) => {
    const ret = await Users.deleteOne({_id: req.params.id});

    res.json(ret);
}));

export { usersRoutes };
