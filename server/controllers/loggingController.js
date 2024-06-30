// loggingController.js

const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const chalk = require('chalk');


const logToFile = (logPath) => {
    return fs.createWriteStream(path.join(logPath), { flags: 'a' });
};

const setupDevelopmentLogging = (app) => {
    morgan.token('statusColor', (res) => {
        const status = res.statusCode;
        const color =
            status >= 500 ? 'red' :
                status >= 400 ? 'yellow' :
                    status >= 300 ? 'cyan' :
                        status >= 200 ? 'green' :
                            'white';
        return chalk[color](status);
    });

    app.use(morgan((tokens, req, res) => {
        return [
            chalk.blue(tokens.method(req, res)),
            chalk.green(tokens.url(req, res)),
            tokens.statusColor(res),
            chalk.cyan(tokens['remote-addr'](req, res)),
            chalk.magenta(tokens['response-time'](req, res) + ' ms'),
            chalk.magenta(tokens.date()),
        ].join(' ');
    }));
};


module.exports = {
    logToFile,
    setupDevelopmentLogging,
};
