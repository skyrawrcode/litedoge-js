'use strict';

import {randomBytes} from "bcrypto/lib/random.js";
import fs from "bfile";
import assert from "bsert";
import bio from "bufio";
import {tmpdir} from "os";

import path from "path";
import {CoinView} from "../../dist/lib/coins/coinview.js";
import {CompactBlock} from "../../dist/lib/net/bip152.js";

import {Block} from "../../dist/lib/primitives/block.js";
import {Headers} from "../../dist/lib/primitives/headers.js";
import {MerkleBlock} from "../../dist/lib/primitives/merkleblock.js";
import {Output} from "../../dist/lib/primitives/output.js";

import {TX} from "../../dist/lib/primitives/tx.js";

const __dirname = path.resolve(path.dirname(''));

export function readFile(name, enc) {
  const file = path.resolve(__dirname, '..', 'data', name);
  return fs.readFileSync(file, enc);
};

export function writeFile(name, data) {
  const file = path.resolve(__dirname, '..', 'data', name);
  return fs.writeFileSync(file, data);
};

export function exists(name) {
  const file = path.resolve(__dirname, '..', 'data', name);
  return fs.existsSync(file);
};

export function readBlock(name) {
  const raw = readFile(`${name}.raw`);

  if (!exists(`${name}-undo.raw`))
    return new BlockContext(Block, raw);

  const undoRaw = readFile(`${name}-undo.raw`);

  return new BlockContext(Block, raw, undoRaw);
};

export function readMerkle(name) {
  const raw = readFile(`${name}.raw`);
  return new BlockContext(MerkleBlock, raw);
};

export function readCompact(name) {
  const raw = readFile(`${name}.raw`);
  return new BlockContext(CompactBlock, raw);
};

export function readTX(name) {
  const raw = readFile(`${name}.raw`);

  if (!exists(`${name}-undo.raw`))
    return new TXContext(raw);

  const undoRaw = readFile(`${name}-undo.raw`);

  return new TXContext(raw, undoRaw);
};

export function writeBlock(name, block, view) {
  writeFile(`${name}.raw`, block.toRaw());

  if (!view)
    return;

  const undo = makeBlockUndo(block, view);
  const undoRaw = serializeUndo(undo);

  writeFile(`${name}-undo.raw`, undoRaw);
};

export function writeTX(name, tx, view) {
  writeFile(`${name}.raw`, tx.toRaw());

  if (!view)
    return;

  const undo = makeTXUndo(tx, view);
  const undoRaw = serializeUndo(undo);

  writeFile(`${name}-undo.raw`, undoRaw);
};

export function testdir(name) {
  assert(/^[a-z]+$/.test(name), 'Invalid name');

  const uniq = randomBytes(4).toString('hex');
  return path.join(tmpdir(), `ldogejs-test-${name}-${uniq}`);
};

export async function rimraf(p) {
  const allowed = /ldogejs\-test\-[a-z]+\-[a-f0-9]{8}((\\|\/)[a-z]+)?$/;
  if (!allowed.test(p))
    throw new Error(`Path not allowed: ${p}.`);

  return await fs.rimraf(p);
};

export async function forValue(obj, key, val, timeout = 30000) {
  assert(typeof obj === 'object');
  assert(typeof key === 'string');

  const ms = 10;
  let interval = null;
  let count = 0;
  return new Promise((resolve, reject) => {
    interval = setInterval(() => {
      if (obj[key] === val) {
        clearInterval(interval);
        resolve();
      } else if (count * ms >= timeout) {
        clearInterval(interval);
        reject(new Error('Timeout waiting for value.'));
      }
      count += 1;
    }, ms);
  });
};

function parseUndo(data) {
  const br = bio.read(data);
  const items = [];

  while (br.left()) {
    const output = Output.fromReader(br);
    items.push(output);
  }

  return items;
}

function serializeUndo(items) {
  const bw = bio.write();

  for (const item of items) {
    bw.writeI64(item.value);
    bw.writeVarBytes(item.script.toRaw());
  }

  return bw.render();
}

function applyBlockUndo(block, undo) {
  const view = new CoinView();
  let i = 0;

  for (const tx of block.txs) {
    if (tx.isCoinbase())
      continue;

    for (const {prevout} of tx.inputs)
      view.addOutput(prevout, undo[i++]);
  }

  assert(i === undo.length, 'Undo coins data inconsistency.');

  return view;
}

function applyTXUndo(tx, undo) {
  const view = new CoinView();
  let i = 0;

  for (const {prevout} of tx.inputs)
    view.addOutput(prevout, undo[i++]);

  assert(i === undo.length, 'Undo coins data inconsistency.');

  return view;
}

function makeBlockUndo(block, view) {
  const items = [];

  for (const tx of block.txs) {
    if (tx.isCoinbase())
      continue;

    for (const {prevout} of tx.inputs) {
      const coin = view.getOutput(prevout);
      assert(coin);
      items.push(coin);
    }
  }

  return items;
}

function makeTXUndo(tx, view) {
  const items = [];

  for (const {prevout} of tx.inputs) {
    const coin = view.getOutput(prevout);
    assert(coin);
    items.push(coin);
  }

  return items;
}

class BlockContext {
  constructor(ctor, raw, undoRaw) {
    this.ctor = ctor;
    this.raw = raw;
    this.undoRaw = undoRaw || null;
  }

  getRaw() {
    return this.raw;
  }

  getBlock() {
    const Block = this.ctor;
    const block = Block.fromRaw(this.raw);

    if (!this.undoRaw) {
      const view = new CoinView();
      return [block, view];
    }

    const undo = parseUndo(this.undoRaw);
    const view = applyBlockUndo(block, undo);

    return [block, view];
  }

  getHeaders() {
    return Headers.fromHead(this.raw);
  }
}

class TXContext {
  constructor(raw, undoRaw) {
    this.raw = raw;
    this.undoRaw = undoRaw || null;
  }

  getRaw() {
    return this.raw;
  }

  getTX() {
    const tx = TX.fromRaw(this.raw);

    if (!this.undoRaw) {
      const view = new CoinView();
      return [tx, view];
    }

    const undo = parseUndo(this.undoRaw);
    const view = applyTXUndo(tx, undo);

    return [tx, view];
  }
}
