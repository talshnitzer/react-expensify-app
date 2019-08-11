//import moment from 'moment';  We can't import moment from moment in this file.
//This is going to look for the Mock version.
//So we'll have a function that calls itself and that's going to create a stack trace error.
//run down all the memory and eventually the process is going to fail.

const moment = require.requireActual('moment');

export default (timestamp = 0) => {
    return moment(timestamp);
};