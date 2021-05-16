#!/usr/bin/env node
import {WalletNode} from '../lib/wallet/node';
import {version} from '../../package.json'

process.title = 'bwallet';

if (process.argv.indexOf('--help') !== -1
    || process.argv.indexOf('-h') !== -1) {
  console.error('See the ldogejs docs at: https://github.com/bcoin-org/bcoin/tree/master/docs.');
  process.exit(1);
  throw new Error('Could not exit.');
}

if (process.argv.indexOf('--version') !== -1
    || process.argv.indexOf('-v') !== -1) {
  console.log(version);
  process.exit(0);
  throw new Error('Could not exit.');
}


const node = new WalletNode({
  file: true,
  argv: true,
  env: true,
  logFile: true,
  logConsole: true,
  logLevel: 'debug',
  memory: false,
  workers: true,
  listen: true,
  loader: require
});

process.on('unhandledRejection', (err, promise) => {
  throw err;
});

process.on('SIGINT', async () => {
  await node.close();
});

(async () => {
  await node.ensure();
  await node.open();
})().catch((err) => {
  console.error(err.stack);
  process.exit(1);
});
