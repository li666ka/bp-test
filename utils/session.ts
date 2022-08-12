import moment from 'moment';

import { MAX_SESSION_TIME_IN_MINUTES, DATE_FORMAT } from '../models/session';

function isTimeOver(date: string): boolean {
    return moment().isAfter(date);
}

function limitTime(): string {
    const date = moment().add(MAX_SESSION_TIME_IN_MINUTES, 'minutes');
    return moment(date).format(DATE_FORMAT);
}

export default {
    limitTime,
    isTimeOver
};
