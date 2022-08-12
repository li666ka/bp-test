import validator from 'validator';

import userIdType from '../models/user-id-types';
import UserQueries, { User } from '../models/user';
import {getSpawnOpts} from "concurrently/dist/src/get-spawn-opts";

async function validateAdding(id: string | undefined, password: string | undefined): Promise<User | never> {
    if (!id) {
        throw new Error('Input id...');
    }

    if (!password) {
        throw new Error('Input password...');
    }

    const user: User | undefined = await UserQueries.getUserById(id);
    if (user) {
        throw new Error(`User with id ${id} already exists`);
    }

    let id_type: number | undefined;

    if (validator.isEmail(id)) {
        id_type = userIdType.email;
    } else if (validator.isMobilePhone(id)) {
        id_type = userIdType.phoneNumber;
    }

    /* if id is not suitable for any id_type */
    if (!id_type) {
        throw new Error('Input correct id...');
    }
    return {id, type: id_type, password};
}

async function authenticate(id: string | undefined, password: string | undefined): Promise<User | never> {
    if (!id) {
        throw new Error('Input id...');
    }

    if (!password) {
        throw new Error('Input password...');
    }

    const user: User | undefined = await UserQueries.getUserById(id);
    if (!user) {
        throw new Error(`User with id ${id} does not exist`);
    }

    if (user.password !== password) {
        throw new Error(`Incorrect password`);
    }

    return user;
}

export default { validateAdding, authenticate };
