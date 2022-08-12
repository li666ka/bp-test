import Db from '../utils/db';

export const MAX_SESSION_TIME_IN_MINUTES: number = 10;
export const DATE_FORMAT: string = 'YYYY-MM-DD HH:mm:ss';

export type Session = {
    id: string;
    user_id: string;
    time_limit: string;
};

export async function getSessionById(id: string): Promise<Session | undefined | never> {
    const query: string = `SELECT * FROM Session WHERE id = '${id}'`;
    let res = await Db.executeQuery(query);
    // @ts-ignore
    if (res[0]) {
        return {
            // @ts-ignore
            id: res[0].id,
            // @ts-ignore
            user_id: res[0].user_id,
            // @ts-ignore
            time_limit: res[0].time_limit
        };
    }
    return undefined;
}

export async function addSession(
    id: string,
    userId: string,
    timeLimit: string)
    : Promise<Session | undefined | never> {

    const query: string =
        'INSERT INTO Session (' +
            'id, ' +
            'user_id, ' +
            'time_limit' +
        ') ' +
        `VALUES (
            '${id}',  
            '${userId}', 
            '${timeLimit}'
        )`;
    await Db.executeQuery(query);
    return await getSessionById(id);
}

export async function updateSessionTimeLimit(
    id: string,
    newTimeLimit: string)
    : Promise<Session | undefined | never> {

    const query =
        `UPDATE Session
         SET time_limit = '${newTimeLimit}'
         WHERE id = '${id}'`;
    await Db.executeQuery(query);
    return await getSessionById(id);
}

export async function deleteAllSessions(): Promise<any> {
    const query: string = 'DELETE FROM Session';
    return await Db.executeQuery(query);
}

export async function deleteSession(id: string): Promise<any> {
    const query: string = `DELETE FROM Session WHERE id = '${id}'`;
    return await Db.executeQuery(query);
}

export default {
    MAX_SESSION_TIME_IN_MINUTES,
    DATE_FORMAT,
    addSession,
    getSessionById,
    updateSessionTimeLimit,
    deleteAllSessions,
    deleteSession
};
