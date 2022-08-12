import { Router } from "express";

import allParamValidator from '../validators/all-param';
import sessionValidator from '../validators/session';
import { deleteAllSessions, deleteSession, Session } from '../models/session';

const router = Router();

router.get('/', async (req, res) => {
    console.log(req.query);
    try {
        // @ts-ignore
        const all: boolean = allParamValidator.validate(req.query.all)

        if (all) {
            await deleteAllSessions();
            res.status(200).send('All sessions were deleted');
        } else {
            const session: Session = await sessionValidator.validateDeleting(req.session.id);
            await deleteSession(session.id);
            res.status(200).send('Session was deleted');
        }
    } catch (err: any) {
        res.status(400).send(err.message);
    }
});

export default router;
