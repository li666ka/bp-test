import { Router } from 'express';
import axios from 'axios';
// @ts-ignore
import axiosTime from 'axios-time';

import { updateSessionTimeLimit, Session } from '../models/session';
import sessionValidator from '../validators/session';
import sessionUtils from '../utils/session';

const router = Router();
axiosTime(axios);

router.get('/', async (req, res) => {
    try {
        const session: Session = await sessionValidator.authenticate(req.session.id);
        await updateSessionTimeLimit(session.id, sessionUtils.limitTime());

        const response = await axios.get('https://www.google.com/');
        // @ts-ignore
        const latencyInSeconds = response.timings.elapsedTime / 1000;
        // @ts-ignore
        res.send(latencyInSeconds.toString());
    } catch(err: any) {
        res.status(400).send(err.message);
    }
});

export default router;
