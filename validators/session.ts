import { getSessionById, Session } from '../models/session';
import sessionUtils from '../utils/session';

async function validateAdding(
    id: string | undefined,
    user_id: string | undefined)
    : Promise<Session | never> {

    if (!id) {
        throw new Error('Input session id...');
    }

    if (!user_id) {
        throw new Error('Input user id...');
    }

    const time_limit = sessionUtils.limitTime();
    return { id, user_id, time_limit }
}

async function authenticate(id: string | undefined): Promise<Session | never> {
    if (!id) {
        throw new Error('Input session id...');
    }

    const session: Session | undefined = await getSessionById(id);
    if (!session) {
        throw new Error(`Session ${id} does not exist`);
    }

    if (sessionUtils.isTimeOver(session.time_limit)) {
        throw new Error(`Session time is over`);
    }
    return session;
}

async function validateDeleting(id: string | undefined): Promise<Session | never> {
    if (!id) {
        throw new Error('Input session id...');
    }

    const session: Session | undefined = await getSessionById(id);
    if (!session) {
        throw new Error(`Session ${id} does not exist`);
    }

    return session;
}

export default {
    validateAdding,
    authenticate,
    validateDeleting
};
