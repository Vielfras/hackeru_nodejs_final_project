const chalk = require('chalk');

const isValidIP = (ip) => {
  if (typeof ip !== 'string') {
    console.error(chalk.red('Error: IP address must be a string.'));
    console.error(chalk.red(`Invalid IP: ${ip}`));
    return false;
  }

  // Regex pattern to validate IPv4 addresses
  const ipPattern = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/;

  if (!ip || !ipPattern.test(ip)) {
    console.error(chalk.red('Error: Invalid or undefined IP address in the environment variables.'));
    console.error(chalk.red(`Invalid IP: ${ip}`));
    return false;
  }

  return true;
};

const isValidPort = (port) => {
  if (typeof port !== 'string' && typeof port !== 'number') {
    console.error(chalk.red('Error: Port must be a number or a string that can be converted to a number.'));
    console.error(chalk.red(`Invalid PORT: ${port}`));
    return false;
  }

  const portNumber = Number(port);

  if (isNaN(portNumber) || !Number.isInteger(portNumber)) {
    console.error(chalk.red('Error: Port must be a valid number.'));
    console.error(chalk.red(`Invalid PORT: ${port}`));
    return false;
  }

  if (portNumber <= 1024 || portNumber > 65535) {
    console.error(chalk.red('Error: Port must be a number in range 1025 - 65535'));
    console.error(chalk.red(`Invalid PORT: ${portNumber}`));
    return false;
  }

  return true;
};


module.exports = {
  isValidIP,
  isValidPort,
};
