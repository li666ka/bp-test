import mysql from 'mysql2';

import {
    connectionUri,
    createSessionTable,
    createUserIdTypeTable,
    createUserTable
} from '../configs/db-config';

const connection = mysql.createConnection(connectionUri);

async function initialize() {
    await executeQuery(createUserIdTypeTable);
    await executeQuery(createUserTable);
    await executeQuery(createSessionTable);
}

async function executeQuery(query: string) {
    try {
        const res = await connection.promise().query(query);
        return res[0];
    } catch (err) {
        console.log(err);
    }
}

export default { executeQuery, initialize };
