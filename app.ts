import express, { Express } from 'express';
import cors from 'cors';
import logger from 'morgan';
import session from 'express-session';

import corsOptions from './configs/cors-config';
import sessionOptions from './configs/session-config';
import Db from './utils/db';

/* routes */
import signUpRouter from './routes/signup';
import signInRouter from './routes/signin';
import infoRouter from './routes/info';
import latencyRouter from './routes/latency';
import logoutRouter from './routes/logout';

const app: Express = express();
const port: number = 8888;

/* db setup */
Db.initialize()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

app.use(logger('dev'));
app.use(express.json());
app.use(cors(corsOptions));
app.use(session(sessionOptions));

/* routes setup */
app.use('/signup',  signUpRouter);
app.use('/signin',  signInRouter);
app.use('/info',    infoRouter);
app.use('/latency', latencyRouter);
app.use('/logout',  logoutRouter);
