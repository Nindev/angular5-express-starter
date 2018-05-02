import { pbkdf2Sync, pbkdf2, randomBytes } from 'crypto';
import { NextFunction, Request, Response, Router } from 'express';
import { sign } from 'jsonwebtoken';
import * as moment from 'moment';

import { Config } from '../config';
import { Users } from '../models/user.model';
import { User } from '../../declarations';
import { asyncMiddleware } from './utils';

const authRoutes: Router = Router();

authRoutes.get('/', (req, res) => res.send('Auth service running ' + new Date()));

authRoutes.post('/signup', (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.password) {
        const err = new Error('No password');
        return next(err);
    }
    const salt = new Buffer(Config.OB_CRYPT_SALT).toString('base64');
    const hash = pbkdf2Sync(req.body.password, salt, 10000, Config.OB_CRYPTO_KEY_LENGTH, Config.OB_CRYPTO_DIGEST);
    const hashedPassword = hash.toString('hex');
    Users.create({
        email: req.body.email,
        hashedPassword
    }).then(user => {
        res.json({
            hash: hashedPassword
        });
    }).catch(err => next(err));
});

authRoutes.post('/signin', asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    const salt = new Buffer(Config.OB_CRYPT_SALT).toString('base64');
    const hash = pbkdf2Sync(req.body.password, salt, 10000, Config.OB_CRYPTO_KEY_LENGTH, Config.OB_CRYPTO_DIGEST);
    const user: User = await Users.findOne({ email: req.body.email });
    if (!user) {
        return next(new Error('User does not exist'));
    }
    if (hash.toString('hex') !== user.hashedPassword) {
        return next(new Error('Wrong password'));
    }
    const toSign = Object.assign({}, {
        id: user.id,
        sysAdmin: user.sysAdmin,
        admin: user.admin
    });
    const token = sign(toSign, Config.OB_JWT_SECRET, { expiresIn: '1d' });
    const expiresAt = moment().add(1, 'day').toJSON();
    return res.json({ jwtToken: token, expiresAt: expiresAt });
}));

export { authRoutes };
