const connectionUri: object = {
    host: 'localhost',
    port: '8080',
    user: 'root',
    database: 'users_db',
    password: '0000'
};

const createUserIdTypeTable: string =
    'CREATE TABLE IF NOT EXISTS User_Id_Type ( ' +
        'id     int             AUTO_INCREMENT, ' +
        'name   varchar(255)    NOT NULL, ' +
        'PRIMARY KEY (id), ' +
        'UNIQUE(name)' +
    ')';

const createUserTable: string =
    'CREATE TABLE IF NOT EXISTS User ( ' +
        'id         varchar(255), ' +
        'id_type    int             NOT NULL, ' +
        'password   varchar(255)    NOT NULL, ' +
        'PRIMARY KEY (id), ' +
        'FOREIGN KEY (id_type) REFERENCES User_Id_Type(id) ' +
            'ON DELETE NO ACTION ' +
            'ON UPDATE NO ACTION' +
    ')';

const createSessionTable: string =
    'CREATE TABLE IF NOT EXISTS Session ( ' +
        'id         varchar(255), ' +
        'user_id    varchar(255)    NOT NULL, ' +
        'time_limit datetime NOT NULL, ' +
        'PRIMARY KEY (id), ' +
        'FOREIGN KEY (user_id) REFERENCES User(id) ' +
            'ON DELETE CASCADE ' +
            'ON UPDATE CASCADE' +
    ')';

export {
    connectionUri,
    createUserIdTypeTable,
    createUserTable,
    createSessionTable
};
