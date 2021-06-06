# Node and wallet CLI

## Configuration

Using environment variables:
```bash
$ export BCOIN_API_KEY=hunter2
$ export BCOIN_NETWORK=testnet
$ ldogejs --daemon
$ ldogejs-cli info
```

With command-line arguments:

```bash
$ ldogejs-cli --network=testnet --api-key=hunter2 info
```

You can also use `~/.ldogejs/ldogejs.conf` for configuration options,
see [Configuration](configuration.md) for the full details.

## Examples

Common node commands:

```bash
# View the genesis block
$ ldogejs-cli block 0

# View the mempool
$ ldogejs-cli mempool

# Execute an RPC command to list network peers
$ ldogejs-cli rpc getpeerinfo
```

Common wallet commands:

```bash
# View primary wallet
$ bwallet-cli.js get

# View transaction history
$ bwallet-cli.js history

# Send a transaction
$ bwallet-cli.js send <address> 0.01

# View balance
$ bwallet-cli.js balance

# Derive new address
$ bwallet-cli.js address

# Create a new account
$ bwallet-cli.js account create foo

# Send from account
$ bwallet-cli.js send <address> 0.01 --account=foo
```

Get more help:

```bash
$ ldogejs-cli help
$ ldogejs-cli rpc help
$ bwallet-cli.js help
$ bwallet-cli.js rpc help
```
