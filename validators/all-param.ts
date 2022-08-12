function validate(all: string | undefined): boolean | never {
    if (!all) {
        throw new Error('Input all param...');
    }

    if (all === 'true') {
        return true;
    }

    if (all === 'false') {
        return false;
    }

    throw new Error('Incorrect all param');
}

export default { validate };