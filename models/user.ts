import Db from '../utils/db';

export type User = {
    id: string;
    type: number | string;
    password: string;
};

export async function getUserById(id: string): Promise<User | undefined | never> {
    const query: string =
        `SELECT UIT.name, User.id, User.password 
        FROM User INNER JOIN User_Id_Type UIT ON User.id_type = UIT.id 
        WHERE User.id = '${id}'`;
    let res = await Db.executeQuery(query);
    // @ts-ignore
    console.log(res[0])
    // @ts-ignore
    if (res[0]) {
        return {
            // @ts-ignore
            id: res[0].id,
            // @ts-ignore
            type: res[0].name,
            // @ts-ignore
            password: res[0].password
        };
    }
    return undefined;
}

export async function addUser(
    id: string,
    idType: number,
    password: string)
    : Promise<User | undefined | never> {

    const query: string =
        'INSERT INTO User (' +
            'id, ' +
            'id_type, ' +
            'password' +
        ') ' +
        `VALUES (
            '${id}',
            ${idType},  
            '${password}'
        )`;
    await Db.executeQuery(query);
    return await getUserById(id);
}

export default { getUserById, addUser };
