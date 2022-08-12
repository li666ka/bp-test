import { Router } from 'express';

import { getUserById, User } from '../models/user';
import { updateSessionTimeLimit, Session } from "../models/session";
import sessionUtils from "../utils/session";
import sessionValidator from '../validators/session';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const session: Session = await sessionValidator.authenticate(req.session.id);
        await updateSessionTimeLimit(session.id, sessionUtils.limitTime());
        // @ts-ignore
        const user: User = await getUserById(session.user_id);
        let info: object = {
            id: user.id,
            type: user.type
        };
        res.json(info);
    } catch (err: any) {
        res.status(400).send(err.message);
    }
});

export default router;
