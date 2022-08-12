import { Router } from 'express';

import { addUser, User } from '../models/user';
import { addSession, Session } from '../models/session';

import userValidator from '../validators/user';
import sessionValidator from '../validators/session';

const router = Router();

router.post('/', async (req, res) => {
    console.log(req.query);
    console.log(req.session.id);

    try {
        /* adding user */

        // @ts-ignore
        const user: User = await userValidator.validateAdding(req.query.id, req.query.password);
        // @ts-ignore
        const newUser: User = await addUser(user.id, user.type, user.password);
        console.log(newUser);
        console.log(`User ${newUser.id} was added`);

        /* adding session */

        const session: Session = await sessionValidator.validateAdding(req.session.id, user.id);

        // @ts-ignore
        const newSession = await addSession(session.id, session.user_id, session.time_limit);
        // @ts-ignore
        console.log(`Session ${newSession.id} was added`);
        // @ts-ignore
        res.status(200).send(newSession.id);

    } catch (err: any) {
        res.status(400).send(err.message);
    }
});

export default router;
