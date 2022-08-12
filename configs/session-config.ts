import crypto from 'crypto';

const SECRET_KEY = crypto.randomBytes(256).toString('base64');

const sessionOptions = {
    secret: SECRET_KEY,
};

export default sessionOptions;
