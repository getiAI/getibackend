### Comprehensive Stylus Rust SDK Guidelines

Here’s a comprehensive overview of the Stylus Rust SDK, including security guidelines and specific details on using Stylus for Rust smart contracts.

**guidelines.md:**

```markdown
# Stylus Rust SDK Comprehensive Guidelines

## Introduction

This document provides an in-depth overview of the features provided by the Stylus Rust SDK. For information about deploying Rust smart contracts, see the cargo stylus CLI Tool. For a conceptual introduction to Stylus, see Stylus: A Gentle Introduction. To deploy your first Stylus smart contract using Rust, refer to the Quickstart.

## Overview

The Stylus Rust SDK is built on top of Alloy, a collection of crates empowering the Rust Ethereum ecosystem. Because the SDK uses the same Rust primitives for Ethereum types, Stylus is compatible with existing Rust libraries.

**INFO:** Many of the affordances use macros. Though this document details what each does, it may be helpful to use `cargo expand` to see what they expand into if you’re doing advanced work in Rust.

Stylus programs should use `#[no_std]` to avoid including the Rust standard library and keep code small. Many crates that build without the standard library make for great dependencies to use in Stylus programs, as long as the total, compressed WASM size is within the 24Kb code size limit.

Stylus VM supports rustc's `wasm32-unknown-unknown` target triple. In the future, we may add `wasm32-wasi` too, along with floating point and SIMD, which the Stylus VM does not yet support.

## Security Guidelines

1. **Code Quality:** Ensure that the code is clean, well-documented, and follows best practices. This makes it easier to understand and less likely to contain bugs.
2. **Test Coverage:** Check if there are comprehensive tests for the contract, including both unit tests and integration tests.
3. **Access Control:** Ensure proper access control mechanisms are in place. Only authorized addresses should be able to call sensitive functions.
4. **Reentrancy Attacks:** Ensure that the contract is not vulnerable to reentrancy attacks.
5. **Arithmetic Overflows and Underflows:** Check if the contract uses safe math operations to prevent overflows and underflows.
6. **Gas Limit and Loops:** Be aware of the gas limit for transactions. Loops that iterate over a growing number of elements can hit the gas limit.
7. **Randomness:** Ensure secure randomness if used. Blockchain is deterministic, so getting true randomness can be tricky.
8. **Timestamp Dependence:** Minimize dependence on timestamps as they can be manipulated by miners.
9. **Error Handling:** Ensure that the contract handles errors correctly and doesn't fail silently.
10. **Upgradeability:** Check if the contract can be upgraded in case of bugs or necessary changes without breaking functionality or compromising security.

## Storage

Rust smart contracts may use state that persists across transactions. There are two primary ways to define storage: using Rust or Solidity definitions. Both are equivalent and depend on the developer's needs.

### #[solidity_storage]

The `#[solidity_storage]` macro allows a Rust struct to be used in persistent storage.

```rust
#[solidity_storage]
pub struct Contract {
    owner: StorageAddress,
    active: StorageBool,
    sub_struct: SubStruct,
}

#[solidity_storage]
pub struct SubStruct {
    // types implementing the `StorageType` trait.
}
```

### sol_storage!

Solidity syntax can be used to define storage types that map to the same storage slots as they would in EVM programming languages.

```rust
sol_storage! {
    pub struct Contract {
        address owner;
        bool active;
        SubStruct sub_struct;
    }

    pub struct SubStruct {
        mapping(address => uint) balances;
        Delegate delegates[];
    }
}
```

### Reading and Writing Storage

Access storage types via getters and setters.

```rust
impl Contract {
    pub fn owner(&self) -> Address {
        self.owner.get()
    }

    pub fn set_owner(&mut self, new_owner: Address) {
        if msg::sender() == self.owner.get() {
            self.owner.set(new_owner);
        }
    }
}
```

### Collections

Collections like `StorageVec` and `StorageMap` are dynamic and have methods like `push`, `insert`, `replace`, and similar.

```rust
impl SubStruct {
    pub fn add_delegate(&mut self, delegate: Address) {
        self.delegates.push(delegate);
    }

    pub fn track_balance(&mut self, address: Address) {
        self.balances.insert(address, address.balance());
    }
}
```

### Erase and #[derive(Erase)]

Some `StorageType` values implement `Erase`, which provides an `erase()` method for clearing state.

```rust
sol_storage! {
    #[derive(Erase)]
    pub struct Contract {
        address owner;
        uint256[] hashes;
    }
}
```

## Methods

Stylus SDK methods are Solidity ABI equivalent, meaning contracts written in different programming languages are fully interoperable.

### #[external]

This macro makes methods "external" so that other contracts can call them by implementing the `Router` trait.

```rust
#[external]
impl Contract {
    pub fn owner(&self) -> Result<Address, Vec<u8>> {
        Ok(self.owner.get())
    }

    pub fn set_owner(&mut self, new_owner: Address) -> Result<(), Vec<u8>> {
        ...
    }
}
```

### #[payable]

Methods may accept ETH as call value.

```rust
#[external]
impl Contract {
    #[payable]
    pub fn credit(&mut self) -> Result<(), Vec<u8>> {
        self.erc20.add_balance(msg::sender(), msg::value())
    }
}
```

### #[entrypoint]

This macro defines the entrypoint, where Stylus execution begins.

```rust
sol_storage! {
    #[entrypoint]
    pub struct Contract {
        ...
    }
}
```

## Events

Emitting Solidity-style events is supported out-of-the-box with the Rust SDK.

```rust
sol! {
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

fn foo() {
    evm::log(Transfer {
        from: Address::ZERO,
        to: address,
        value,
    });
}
```

## EVM Affordances

The SDK contains several modules for interacting with the EVM.

- **block:** Block info for the number, timestamp, etc.
- **contract:** Contract info, such as its address, balance.
- **crypto:** VM accelerated cryptography.
- **evm:** Ink/memory access functions.
- **msg:** Sender, value, and reentrancy detection.
- **tx:** Gas price, ink price, origin, and other tx-level info.

Use these modules to enhance your Rust smart contracts' capabilities.

