import { Router } from 'express';

import { addSession, Session } from '../models/session';
import userValidator from '../validators/user';
import sessionValidator from '../validators/session';

const router = Router();

router.post('/', async (req, res) => {
    console.log(req.query);

    try {
        // @ts-ignore
        const user = await userValidator.authenticate(req.query.id, req.query.password);

        /* adding session */

        const session: Session = await sessionValidator.validateAdding(req.session.id, user.id);
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
