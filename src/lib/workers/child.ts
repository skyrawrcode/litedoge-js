/*!
 * child.js - child processes for ldogejs
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcoin
 */

'use strict';

import {EventEmitter} from 'events';
import path from 'path';
import cp from 'child_process';
import { SpawnOptions } from 'child_process';
import { ChildProcess } from 'child_process';
import {dirname} from 'path';
import { fileURLToPath } from 'url';
const children = new Set<Child>();

let exitBound = false;

/**
 * Child
 * Represents a child process.
 * @alias module:workers.Child
 * @extends EventEmitter
 * @ignore
 */

export class Child extends EventEmitter {
  child: ChildProcess;
  /**
   * Represents a child process.
   * @constructor
   * @param {String} file
   */

  constructor(file) {
    super();

    bindExit();
    children.add(this);

    this.init(file);
  }

  /**
   * Test whether child process support is available.
   * @returns {Boolean}
   */

  static hasSupport() {
    return true;
  }

  /**
   * Initialize child process (node.js).
   * @private
   * @param {String} file
   */

  init(file) {
    const bin = process.argv[0];

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filename = path.resolve(__dirname, file);
    const options:SpawnOptions = { stdio: 'pipe', env: process.env };

    this.child = cp.spawn(bin, [filename], options);

    this.child.unref();
    (this.child.stdin as any).unref();
    (this.child.stdout as any).unref();
    (this.child.stderr as any).unref();

    this.child.on('error', (err) => {
      this.emit('error', err);
    });

    this.child.once('exit', (code, signal) => {
      children.delete(this);
      this.emit('exit', code == null ? -1 : code, signal);
    });

    this.child.stdin.on('error', (err) => {
      this.emit('error', err);
    });

    this.child.stdout.on('error', (err) => {
      this.emit('error', err);
    });

    this.child.stderr.on('error', (err) => {
      this.emit('error', err);
    });

    this.child.stdout.on('data', (data) => {
      this.emit('data', data);
    });
  }

  /**
   * Send data to child process.
   * @param {Buffer} data
   * @returns {Boolean}
   */

  write(data) {
    return this.child.stdin.write(data);
  }

  /**
   * Destroy the child process.
   */

  destroy() {
    this.child.kill('SIGTERM');
  }
}

/**
 * Cleanup all child processes.
 * @private
 */

function bindExit() {
  if (exitBound)
    return;

  exitBound = true;

  listenExit(() => {
    for (const child of children)
      child.destroy();
  });
}

/**
 * Listen for exit.
 * @param {Function} handler
 * @private
 */

function listenExit(handler) {
  const onSighup = () => {
    process.exit(1 | 0x80);
  };

  const onSigint = () => {
    process.exit(2 | 0x80);
  };

  const onSigterm = () => {
    process.exit(15 | 0x80);
  };

  const onError = (err) => {
    if (err && err.stack)
      console.error(String(err.stack));
    else
      console.error(String(err));

    process.exit(1);
  };

  process.once('exit', handler);

  if (process.listenerCount('SIGHUP') === 0)
    process.once('SIGHUP', onSighup);

  if (process.listenerCount('SIGINT') === 0)
    process.once('SIGINT', onSigint);

  if (process.listenerCount('SIGTERM') === 0)
    process.once('SIGTERM', onSigterm);

  if (process.listenerCount('uncaughtException') === 0)
    process.once('uncaughtException', onError);

  process.on('newListener', (name) => {
    switch (name) {
      case 'SIGHUP':
        process.removeListener(name, onSighup);
        break;
      case 'SIGINT':
        process.removeListener(name, onSigint);
        break;
      case 'SIGTERM':
        process.removeListener(name, onSigterm);
        break;
      case 'uncaughtException':
        process.removeListener(name, onError);
        break;
    }
  });
}
