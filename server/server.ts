import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as mongoose from 'mongoose';
import { join, resolve } from 'path';
import { readFileSync } from 'fs';
import * as jwt from 'express-jwt';
import { Config } from './config';
import { authRoutes } from './routes/auth.routes';
import { Seeds } from './models/seeds';
import { apiRoutes } from './routes/api.routes';

// Express server
const app = express();

console.log('Environment:', app.get('env'));

if (app.get('env') !== 'production') {
    require('dotenv').config();
}

mongoose.connect(`mongodb://${Config.OB_MONGODB_HOST}:${Config.OB_MONGODB_PORT}/${Config.OB_MONGODB_NAME}`)
    .then(() => {
        console.log(`Connected to MongoDB ${Config.OB_MONGODB_NAME} on ${Config.OB_MONGODB_HOST}:${Config.OB_MONGODB_PORT} `);
        Seeds.createSystemAdmin();
        // mongoose.set('debug', true)
    })
    .catch(err => console.error(err));

app.use(bodyParser.json());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));

// app.get('/', (req, res) => res.json('Server running ' + new Date()));
app.use('/auth', authRoutes);
app.use('/api', jwt({
    secret: Config.OB_JWT_SECRET
}), apiRoutes);

if (app.get('env') === 'production') {
    console.log("serving from client", join(__dirname, '/../client'));
    // in production mode run application from dist folder
    app.use(express.static(join(__dirname, '/../client')));
    // rewrite virtual urls to angular app to enable refreshing of internal pages
    app.get('*', function (req, res, next) {
        res.sendFile(resolve(join(__dirname, '/../client/index.html')));
    });
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    (<any>err).status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    // console.log(req.app.get('env')); 'development' 'production'
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    const error: any = { message: err.message };
    error.stack = req.app.get('env') === 'development' ? err.stack : '';
    res.json({...error});
});

// Start up the Node server
app.listen(Config.OB_SERVER_PORT, () => {
    console.log(`Node Express server listening on http://localhost:${Config.OB_SERVER_PORT}`);
});
