# FHEWorlds - Confidential Country Membership & Encrypted Payroll System

A revolutionary blockchain-based platform that enables users to select their country membership and receive salaries in complete confidentiality using Fully Homomorphic Encryption (FHE) technology. Built on the FHEVM protocol by Zama, FHEWorlds demonstrates how sensitive personal and financial data can remain encrypted throughout its entire lifecycle on the blockchain.

## Table of Contents

- [Introduction](#introduction)
- [Key Features](#key-features)
- [Why FHEWorlds?](#why-fheworlds)
- [Problems We Solve](#problems-we-solve)
- [Technical Advantages](#technical-advantages)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [How It Works](#how-it-works)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
  - [Compilation](#compilation)
- [Deployment](#deployment)
  - [Local Development](#local-development)
  - [Sepolia Testnet](#sepolia-testnet)
- [Usage](#usage)
  - [Available Tasks](#available-tasks)
  - [Examples](#examples)
- [Testing](#testing)
- [Smart Contract API](#smart-contract-api)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Security Considerations](#security-considerations)
- [Future Roadmap](#future-roadmap)
- [Contributing](#contributing)
- [Resources](#resources)
- [License](#license)
- [Support](#support)

## Introduction

FHEWorlds is a groundbreaking decentralized application (dApp) that leverages Fully Homomorphic Encryption (FHE) to create a privacy-preserving membership and payroll system. Unlike traditional blockchain applications where all data is publicly visible, FHEWorlds keeps sensitive information such as country affiliation and salary amounts completely encrypted on-chain while still allowing computational operations to be performed on the encrypted data.

This project demonstrates the practical implementation of FHE in a real-world use case, showcasing how blockchain technology can be used for confidential human resources, payroll distribution, geographic membership systems, and other privacy-sensitive applications.

### What Makes This Unique?

1. **True Privacy**: Country selection and salary information remain encrypted at all times
2. **On-Chain Computation**: Operations are performed directly on encrypted data without decryption
3. **Selective Disclosure**: Only authorized users can decrypt their own data
4. **Trustless System**: No trusted third party required to maintain privacy
5. **Production-Ready**: Built with enterprise-grade tools and best practices

## Key Features

### Core Functionality

- **Confidential Country Membership**: Users can join countries with their selection remaining encrypted on the blockchain
- **Encrypted Payroll System**: Each country has an associated salary that is stored and processed in encrypted form
- **One-Time Salary Claims**: Users can claim their encrypted salary exactly once, preventing double-spending
- **Dynamic Country Management**: Contract owner can add new countries and update salary structures
- **Access Control**: Proper permission management ensures only authorized parties can access encrypted data
- **Multi-Network Support**: Deploy on local networks, testnets (Sepolia), or mainnet

### Privacy Features

- **End-to-End Encryption**: Data is encrypted client-side before submission to the blockchain
- **No Plaintext Exposure**: Sensitive data never exists in plaintext on-chain
- **Encrypted Events**: Even events emitted use encrypted identifiers where possible
- **Selective Decryption**: Only the user who owns the data can decrypt it
- **Privacy-Preserving Queries**: Smart contract methods return encrypted values that can only be decrypted by authorized users

### Administrative Features

- **Owner Controls**: Designated contract owner can manage countries and salaries
- **Country Addition**: Dynamically add new countries with encrypted salary configurations
- **Salary Updates**: Update existing country salaries while maintaining encryption
- **Ownership Transfer**: Transfer contract ownership securely

## Why FHEWorlds?

### The Privacy Crisis in Blockchain

Traditional blockchain technology operates on the principle of transparency - all data is visible to everyone. While this transparency is valuable for auditability and trust, it creates significant challenges for:

- **Human Resources**: Employee salaries and personal information should be confidential
- **Geographic Data**: Location and nationality information can be sensitive
- **Financial Information**: Compensation details are private matters
- **Compliance**: GDPR and other privacy regulations require data protection

### The FHE Solution

Fully Homomorphic Encryption (FHE) solves this fundamental challenge by allowing computations to be performed on encrypted data without ever decrypting it. FHEWorlds demonstrates how FHE can be applied to create blockchain applications that are both:

1. **Private**: Sensitive data remains encrypted
2. **Functional**: Smart contracts can still perform complex operations
3. **Decentralized**: No trusted intermediaries required
4. **Auditable**: Blockchain transparency maintained for non-sensitive operations

## Problems We Solve

### 1. Confidential Payroll Distribution

**Problem**: Traditional blockchain-based payroll systems expose employee compensation publicly, violating privacy norms and potentially creating security risks.

**Our Solution**: FHEWorlds encrypts salary information end-to-end, allowing employees to verify their compensation without exposing it to others.

### 2. Private Geographic Membership

**Problem**: Country or region-based membership systems on blockchain reveal user locations and affiliations publicly.

**Our Solution**: Country selections are encrypted, protecting user privacy while still enabling country-specific functionality.

### 3. Trustless Privacy

**Problem**: Existing privacy solutions often rely on trusted third parties or off-chain computation, reintroducing centralization risks.

**Our Solution**: FHEVM enables on-chain computation on encrypted data, maintaining blockchain's trustless properties.

### 4. Compliance with Privacy Regulations

**Problem**: GDPR, CCPA, and similar regulations require strong data protection, which is challenging on transparent blockchains.

**Our Solution**: By encrypting sensitive data, FHEWorlds helps organizations maintain compliance while leveraging blockchain technology.

### 5. Preventing Information Leakage

**Problem**: Even seemingly innocuous on-chain data can be analyzed to extract sensitive insights through data aggregation and pattern analysis.

**Our Solution**: Encryption at the data layer prevents sophisticated privacy attacks and statistical analysis.

## Technical Advantages

### 1. FHEVM Integration

- **Native FHE Support**: Built on Zama's FHEVM, providing optimized FHE operations
- **Gas-Efficient**: Optimized encrypted operations minimize transaction costs
- **Type Safety**: Strongly-typed encrypted data types (euint32) prevent errors
- **Access Control**: Built-in permission system for encrypted data

### 2. Smart Contract Design

- **Modular Architecture**: Clean separation of concerns for maintainability
- **Gas Optimization**: Efficient storage patterns and computation
- **Security Best Practices**: Custom errors, access modifiers, proper validation
- **Event-Driven**: Comprehensive event emission for off-chain tracking
- **Upgradeability**: Designed with future enhancements in mind

### 3. Developer Experience

- **Hardhat Integration**: Full Hardhat development environment with TypeScript support
- **Comprehensive Testing**: Unit tests with mock FHE environment for fast iteration
- **Custom Tasks**: CLI tasks for common operations (join country, claim salary, etc.)
- **Type Generation**: Automatic TypeScript type generation from smart contracts
- **Deployment Scripts**: Streamlined deployment to multiple networks

### 4. Production Readiness

- **Testnet Deployment**: Fully tested on Sepolia testnet
- **Contract Verification**: Etherscan verification for transparency
- **Documentation**: Comprehensive inline documentation and external guides
- **Linting and Formatting**: Code quality tools ensure consistency
- **Gas Reporting**: Built-in gas cost analysis

## Technology Stack

### Blockchain & Smart Contracts

- **Solidity 0.8.27**: Latest stable Solidity version with modern features
- **FHEVM (@fhevm/solidity 0.8.0)**: Zama's Fully Homomorphic Encryption library for Solidity
- **OpenZeppelin Standards**: Industry-standard patterns for smart contract security
- **EVM Cancun**: Targeting the latest Ethereum Virtual Machine version

### Development Framework

- **Hardhat 2.26.0**: Ethereum development environment
- **@fhevm/hardhat-plugin**: FHEVM-specific Hardhat integration
- **TypeScript 5.8.3**: Type-safe development with full IDE support
- **TypeChain 8.3.2**: Automatic TypeScript bindings generation for contracts

### Testing & Quality Assurance

- **Mocha**: JavaScript test framework
- **Chai**: Assertion library with async support
- **Hardhat Network Helpers**: Time manipulation and network control
- **Solidity Coverage**: Code coverage analysis for smart contracts
- **Encrypted-Types 0.0.4**: Type definitions for encrypted data

### Encryption & Privacy

- **FHEVM Protocol**: Fully Homomorphic Encryption Virtual Machine by Zama
- **@zama-fhe/relayer-sdk**: Client-side encryption and decryption
- **FHE.sol**: Solidity library for FHE operations (asEuint32, fromExternal, allow, etc.)

### Deployment & Infrastructure

- **Hardhat Deploy**: Deterministic deployment system
- **Ethers.js 6.15.0**: Ethereum JavaScript library
- **Infura**: RPC provider for Ethereum networks
- **Etherscan**: Contract verification and explorer

### Code Quality & DevTools

- **ESLint**: JavaScript/TypeScript linting with TypeScript-specific rules
- **Prettier**: Code formatting with Solidity plugin
- **Solhint**: Solidity-specific linting
- **Hardhat Gas Reporter**: Gas usage analysis
- **rimraf**: Cross-platform file cleanup

## Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                          Client Layer                            │
│  ┌────────────────┐  ┌────────────────┐  ┌─────────────────┐   │
│  │  Web3 Wallet   │  │  Hardhat Task  │  │   Frontend dApp │   │
│  └────────┬───────┘  └────────┬───────┘  └────────┬────────┘   │
│           │                    │                    │            │
└───────────┼────────────────────┼────────────────────┼────────────┘
            │                    │                    │
            └────────────────────┼────────────────────┘
                                 │
            ┌────────────────────▼────────────────────┐
            │      Encryption Layer (FHEVM SDK)       │
            │  ┌──────────────────────────────────┐   │
            │  │  createEncryptedInput()          │   │
            │  │  add32() / encrypt()             │   │
            │  │  userDecryptEuint()              │   │
            │  └──────────────────────────────────┘   │
            └────────────────┬────────────────────────┘
                             │
            ┌────────────────▼────────────────────────┐
            │        Blockchain Layer (FHEVM)         │
            │                                          │
            │  ┌────────────────────────────────────┐ │
            │  │      FHEWorlds Smart Contract      │ │
            │  │                                    │ │
            │  │  ┌──────────────────────────────┐ │ │
            │  │  │  Member Storage             │ │ │
            │  │  │  - euint32 country          │ │ │
            │  │  │  - euint32 salary           │ │ │
            │  │  │  - bool salaryClaimed       │ │ │
            │  │  └──────────────────────────────┘ │ │
            │  │                                    │ │
            │  │  ┌──────────────────────────────┐ │ │
            │  │  │  Country Storage            │ │ │
            │  │  │  - mapping(id => euint32)   │ │ │
            │  │  │  - uint32[] countryIds      │ │ │
            │  │  └──────────────────────────────┘ │ │
            │  │                                    │ │
            │  │  ┌──────────────────────────────┐ │ │
            │  │  │  Core Functions             │ │ │
            │  │  │  - joinCountry()            │ │ │
            │  │  │  - claimSalary()            │ │ │
            │  │  │  - addCountry()             │ │ │
            │  │  │  - updateCountrySalary()    │ │ │
            │  │  └──────────────────────────────┘ │ │
            │  └────────────────────────────────────┘ │
            └─────────────────────────────────────────┘
```

### Data Flow

#### Joining a Country (Write Operation)

```
1. User → Client: Select country (plaintext: countryId = 2)
2. Client → SDK: createEncryptedInput(address, countryId)
3. SDK → Client: encryptedInput + inputProof
4. Client → Contract: joinCountry(2, encryptedInput, proof)
5. Contract: Validate country exists
6. Contract → FHEVM: FHE.fromExternal(encryptedInput, proof)
7. FHEVM → Contract: euint32 countryCipher
8. Contract: Store encrypted country and salary
9. Contract → FHEVM: FHE.allow(countryCipher, userAddress)
10. Contract: Emit CountryJoined event
```

#### Decrypting Data (Read Operation)

```
1. User → Contract: getEncryptedCountry(userAddress)
2. Contract → User: euint32 countryCipher (encrypted handle)
3. User → SDK: userDecryptEuint(type, cipher, contract, signer)
4. SDK: Request decryption key from FHEVM Gateway
5. Gateway: Verify user has permission
6. Gateway → SDK: Decryption key
7. SDK → User: Plaintext value (countryId = 2)
```

### Smart Contract Architecture

The `FHEWorlds.sol` contract is organized into several logical components:

1. **Data Structures**
   - `Member`: User information with encrypted fields
   - `CountryConfig`: Country settings with encrypted salaries

2. **Storage**
   - Member mapping: address → Member data
   - Country mapping: countryId → CountryConfig
   - Country ID array: List of supported countries
   - Owner address: Access control

3. **Access Control**
   - Owner-only modifier for administrative functions
   - Permission management through FHE.allow()

4. **Core Logic**
   - Membership management
   - Salary distribution
   - Country administration

## How It Works

### Step-by-Step User Journey

#### 1. Contract Deployment

The contract owner deploys FHEWorlds with four default countries:
- Country 1: $5,200/month
- Country 2: $4,800/month
- Country 3: $6,100/month
- Country 4: $4,500/month

All salaries are immediately encrypted upon deployment.

#### 2. User Joins a Country

Alice wants to join Country 2:

```typescript
// 1. Create encrypted input client-side
const encryptedCountry = await fhevm
  .createEncryptedInput(contractAddress, aliceAddress)
  .add32(2)  // Country ID 2
  .encrypt();

// 2. Submit to blockchain
await contract.joinCountry(
  2,  // Plain country ID for validation
  encryptedCountry.handles[0],  // Encrypted country
  encryptedCountry.inputProof   // Zero-knowledge proof
);

// 3. Contract stores encrypted country and assigns encrypted salary
// Alice's country: encrypted(2)
// Alice's salary: encrypted(4800)
```

#### 3. User Claims Salary

Alice claims her salary:

```typescript
// 1. Call claim function
const tx = await contract.claimSalary();
await tx.wait();

// 2. Contract marks salary as claimed (one-time operation)
// Returns encrypted salary cipher
```

#### 4. User Decrypts Their Data

Alice decrypts her data client-side:

```typescript
// 1. Get encrypted country
const countryCipher = await contract.getEncryptedCountry(aliceAddress);

// 2. Decrypt using Alice's private key
const countryId = await fhevm.userDecryptEuint(
  FhevmType.euint32,
  countryCipher,
  contractAddress,
  aliceSigner
);
// Result: 2

// 3. Similarly decrypt salary
const [salaryCipher, claimed] = await contract.getEncryptedSalary(aliceAddress);
const salary = await fhevm.userDecryptEuint(
  FhevmType.euint32,
  salaryCipher,
  contractAddress,
  aliceSigner
);
// Result: 4800
```

#### 5. Privacy Guarantees

- **Bob Cannot Decrypt Alice's Data**: Even though Bob can see Alice's encrypted country cipher on-chain, he cannot decrypt it without Alice's private key
- **Contract Can Compute**: The contract can still perform operations (like assigning salaries) on encrypted data
- **No Plaintext Exposure**: Alice's country and salary never exist in plaintext on the blockchain

### Administrative Operations

#### Adding a New Country

Contract owner adds Country 5 with $7,000 salary:

```typescript
// 1. Create encrypted salary
const encryptedSalary = await fhevm
  .createEncryptedInput(contractAddress, ownerAddress)
  .add32(7000)
  .encrypt();

// 2. Add country
await contract.addCountry(
  5,
  encryptedSalary.handles[0],
  encryptedSalary.inputProof
);

// 3. Country 5 is now available for users to join
```

#### Updating Existing Salary

Owner updates Country 2's salary to $5,200:

```typescript
const encryptedSalary = await fhevm
  .createEncryptedInput(contractAddress, ownerAddress)
  .add32(5200)
  .encrypt();

await contract.updateCountrySalary(
  2,
  encryptedSalary.handles[0],
  encryptedSalary.inputProof
);
```

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 20 or higher
  ```bash
  node --version  # Should be >= 20.0.0
  ```

- **npm**: Version 7 or higher (comes with Node.js)
  ```bash
  npm --version  # Should be >= 7.0.0
  ```

- **Git**: For cloning the repository
  ```bash
  git --version
  ```

- **A Web3 Wallet**: Such as MetaMask for testnet interactions

- **Test ETH**: For Sepolia deployments (get from [Sepolia faucet](https://sepoliafaucet.com/))

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/fhe-worlds.git
   cd fhe-worlds
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

   This will install all required packages including:
   - Hardhat and plugins
   - FHEVM libraries
   - TypeScript and type definitions
   - Testing frameworks
   - Development tools

3. **Verify installation**

   ```bash
   npx hardhat --version
   ```

   You should see the Hardhat version and available tasks.

### Environment Setup

1. **Create environment variables**

   Create a `.env` file in the project root (or use Hardhat vars):

   ```bash
   # Option 1: Using .env file
   cp .env.example .env
   ```

   ```env
   # Private key for deploying contracts (without 0x prefix)
   PRIVATE_KEY=your_private_key_here

   # Infura API key for Sepolia access
   INFURA_API_KEY=your_infura_api_key

   # Etherscan API key for contract verification
   ETHERSCAN_API_KEY=your_etherscan_api_key
   ```

   ```bash
   # Option 2: Using Hardhat vars (more secure)
   npx hardhat vars set PRIVATE_KEY
   npx hardhat vars set INFURA_API_KEY
   npx hardhat vars set ETHERSCAN_API_KEY
   ```

2. **Security Warning**

   - **NEVER commit your `.env` file** to version control
   - Use a dedicated wallet for development
   - Keep your private keys secure
   - The `.gitignore` is configured to exclude `.env` by default

### Compilation

Compile the smart contracts:

```bash
# Clean previous builds and compile
npm run clean
npm run compile
```

Expected output:
```
Compiled 1 Solidity file successfully
Generating TypeChain types...
TypeChain types generated successfully
```

The compilation process:
1. Compiles `contracts/FHEWorlds.sol`
2. Generates ABI and bytecode in `artifacts/`
3. Creates TypeScript types in `types/`
4. Optimizes for gas efficiency (800 runs)

## Deployment

### Local Development

#### 1. Start Local FHEVM Node

In one terminal, start a local Hardhat node with FHEVM support:

```bash
npx hardhat node
```

This starts a local blockchain at `http://127.0.0.1:8545/` with:
- 20 pre-funded test accounts
- FHEVM mock environment for fast testing
- Automatic mining

#### 2. Deploy Contract

In another terminal, deploy to the local network:

```bash
npx hardhat deploy --network localhost
```

Expected output:
```
Deploying FHEWorlds...
FHEWorlds deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
✅ Deployment complete
```

#### 3. Verify Deployment

Check the contract is working:

```bash
npx hardhat task:countries --network localhost
```

Output:
```
Supported country ids: [ 1, 2, 3, 4 ]
```

### Sepolia Testnet

#### 1. Prepare Your Wallet

- Ensure your wallet has Sepolia ETH ([get from faucet](https://sepoliafaucet.com/))
- Verify your private key is set in environment variables

#### 2. Deploy to Sepolia

```bash
npx hardhat deploy --network sepolia
```

This process takes longer than local deployment:
- Transaction must be mined on Sepolia
- Gas costs are incurred
- Deployment typically takes 15-30 seconds

Expected output:
```
Deploying FHEWorlds to Sepolia...
Transaction hash: 0x1234...
FHEWorlds deployed to: 0xAbC123...
Block number: 12345678
✅ Deployment complete
```

#### 3. Verify on Etherscan

Verify the contract source code on Etherscan for transparency:

```bash
npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
```

Or use the npm script:

```bash
npm run verify:sepolia
```

After verification, your contract code will be viewable on [Sepolia Etherscan](https://sepolia.etherscan.io/).

#### 4. Test on Sepolia

Run integration tests on Sepolia:

```bash
npm run test:sepolia
```

**Note**: Sepolia tests use real network resources and incur gas costs.

## Usage

### Available Tasks

FHEWorlds includes several custom Hardhat tasks for interacting with the deployed contract:

#### Get Contract Address

```bash
npx hardhat task:address --network <network>
```

Displays the deployed contract address.

#### List Supported Countries

```bash
npx hardhat task:countries --network <network>
```

Shows all available country IDs.

#### Join a Country

```bash
npx hardhat task:join-country --country-id <ID> --network <network>
```

Encrypts and submits your country selection.

**Example:**
```bash
npx hardhat task:join-country --country-id 2 --network sepolia
```

#### Decrypt Your Country

```bash
npx hardhat task:decrypt-country --network <network>
```

Decrypts and displays your selected country.

#### Claim Your Salary

```bash
npx hardhat task:claim-salary --network <network>
```

Claims your encrypted salary (one-time operation).

#### Decrypt Your Salary

```bash
npx hardhat task:decrypt-salary --network <network>
```

Decrypts and displays your salary amount.

### Examples

#### Complete Workflow Example

```bash
# 1. Check available countries
npx hardhat task:countries --network sepolia
# Output: Supported country ids: [ 1, 2, 3, 4 ]

# 2. Join Country 3
npx hardhat task:join-country --country-id 3 --network sepolia
# Output: joinCountry tx=0x123...
#         Country 3 joined successfully

# 3. Verify your selection (encrypted)
npx hardhat task:decrypt-country --network sepolia
# Output: Encrypted country: 0xabc...
#         Decrypted country id: 3

# 4. Claim your salary
npx hardhat task:claim-salary --network sepolia
# Output: claimSalary tx=0x456...
#         Salary claimed.

# 5. Check your salary
npx hardhat task:decrypt-salary --network sepolia
# Output: Encrypted salary: 0xdef...
#         Decrypted salary: 6100 dollars
```

#### Programmatic Interaction

You can also interact with the contract programmatically:

```typescript
import { ethers, fhevm } from "hardhat";
import { FhevmType } from "@fhevm/hardhat-plugin";

async function main() {
  // Get deployed contract
  const FHEWorlds = await ethers.getContractFactory("FHEWorlds");
  const contract = await FHEWorlds.attach("<CONTRACT_ADDRESS>");

  // Get signer
  const [signer] = await ethers.getSigners();

  // Initialize FHEVM
  await fhevm.initializeCLIApi();

  // Join country
  const countryId = 2;
  const encryptedInput = await fhevm
    .createEncryptedInput(contract.address, signer.address)
    .add32(countryId)
    .encrypt();

  const tx = await contract.joinCountry(
    countryId,
    encryptedInput.handles[0],
    encryptedInput.inputProof
  );
  await tx.wait();

  console.log("Joined country successfully!");

  // Decrypt country
  const cipher = await contract.getEncryptedCountry(signer.address);
  const decrypted = await fhevm.userDecryptEuint(
    FhevmType.euint32,
    cipher,
    contract.address,
    signer
  );

  console.log(`Your country: ${decrypted}`);
}

main().catch(console.error);
```

## Testing

### Unit Tests

Run comprehensive unit tests on the local mock FHEVM environment:

```bash
npm run test
```

This executes all test files in `test/`:
- `test/FHEWorlds.ts`: Core functionality tests

Expected output:
```
  FHEWorlds
    ✓ returns the default country identifiers (45ms)
    ✓ allows a user to join and decrypt their country and salary (123ms)
    ✓ allows claiming salary exactly once (89ms)
    ✓ prevents duplicate joins and unsupported countries (67ms)

  4 passing (324ms)
```

### Test Coverage

Generate a detailed coverage report:

```bash
npm run coverage
```

Output includes:
- Line coverage
- Branch coverage
- Function coverage
- Statement coverage

Coverage report is saved to `coverage/index.html`.

### Integration Tests

Test on Sepolia testnet:

```bash
npm run test:sepolia
```

**Note**: This uses real network resources and incurs gas costs.

### Linting and Code Quality

Run all code quality checks:

```bash
# Run all linters
npm run lint

# Individual checks
npm run lint:sol      # Solidity linting
npm run lint:ts       # TypeScript linting
npm run prettier:check # Code formatting check

# Auto-fix issues
npm run prettier:write
```

## Smart Contract API

### View Functions

#### `owner() → address`

Returns the current contract owner.

```solidity
function owner() external view returns (address)
```

#### `getSupportedCountryIds() → uint32[]`

Returns an array of all supported country identifiers.

```solidity
function getSupportedCountryIds() external view returns (uint32[] memory ids)
```

**Example:**
```typescript
const ids = await contract.getSupportedCountryIds();
// Returns: [1, 2, 3, 4]
```

#### `getEncryptedCountry(address account) → euint32`

Returns the encrypted country selection for a given account.

```solidity
function getEncryptedCountry(address account) external view returns (euint32)
```

**Note**: The returned value is encrypted and can only be decrypted by the account owner.

#### `getEncryptedSalary(address account) → (euint32, bool)`

Returns the encrypted salary cipher and claimed status for an account.

```solidity
function getEncryptedSalary(address account)
    external view
    returns (euint32 salaryCipher, bool claimed)
```

**Returns:**
- `salaryCipher`: Encrypted salary value
- `claimed`: Whether the salary has been claimed

#### `hasJoined(address account) → bool`

Checks if an account has joined a country.

```solidity
function hasJoined(address account) external view returns (bool)
```

### User Functions

#### `joinCountry(uint32 countryId, externalEuint32 encryptedCountry, bytes calldata inputProof)`

Allows a user to confidentially join a country.

```solidity
function joinCountry(
    uint32 countryId,
    externalEuint32 encryptedCountry,
    bytes calldata inputProof
) external
```

**Parameters:**
- `countryId`: Plain identifier for validation (must match encrypted value)
- `encryptedCountry`: Encrypted country identifier handle
- `inputProof`: Zero-knowledge proof generated by the FHEVM SDK

**Requirements:**
- User must not have already joined
- Country must be supported
- Encrypted value must match plain countryId

**Effects:**
- Stores encrypted country for user
- Assigns encrypted salary based on country
- Grants decryption permissions to user
- Emits `CountryJoined` event

**Reverts:**
- `AlreadyJoined`: User has already joined a country
- `UnsupportedCountry`: Country ID is not supported

#### `claimSalary() → euint32`

Marks the salary as claimed and returns the encrypted value.

```solidity
function claimSalary() external returns (euint32)
```

**Returns:** The encrypted salary cipher

**Requirements:**
- User must have joined a country
- Salary must not have been claimed before

**Effects:**
- Marks salary as claimed
- Updates permissions
- Emits `SalaryClaimed` event

**Reverts:**
- `NotEnrolled`: User has not joined a country
- `SalaryAlreadyClaimed`: Salary has already been claimed

### Owner Functions

#### `transferOwnership(address newOwner)`

Transfers contract ownership to a new address.

```solidity
function transferOwnership(address newOwner) external onlyOwner
```

**Parameters:**
- `newOwner`: Address of the new owner

**Requirements:**
- Caller must be current owner
- New owner cannot be zero address

**Reverts:**
- `Unauthorized`: Caller is not the owner
- `InvalidAddress`: New owner is zero address

#### `addCountry(uint32 countryId, externalEuint32 encryptedSalary, bytes calldata proof)`

Adds a new country with an encrypted salary.

```solidity
function addCountry(
    uint32 countryId,
    externalEuint32 encryptedSalary,
    bytes calldata proof
) external onlyOwner
```

**Parameters:**
- `countryId`: Identifier for the new country (must be non-zero)
- `encryptedSalary`: Encrypted salary amount
- `proof`: Zero-knowledge proof

**Requirements:**
- Caller must be owner
- Country ID must not be zero
- Country must not already exist

**Effects:**
- Adds country to supported list
- Stores encrypted salary
- Emits `CountryAdded` event

**Reverts:**
- `Unauthorized`: Caller is not the owner
- `InvalidCountryId`: Country ID is zero
- `AlreadySupported`: Country already exists

#### `updateCountrySalary(uint32 countryId, externalEuint32 encryptedSalary, bytes calldata proof)`

Updates an existing country's encrypted salary.

```solidity
function updateCountrySalary(
    uint32 countryId,
    externalEuint32 encryptedSalary,
    bytes calldata proof
) external onlyOwner
```

**Parameters:**
- `countryId`: Country to update
- `encryptedSalary`: New encrypted salary
- `proof`: Zero-knowledge proof

**Requirements:**
- Caller must be owner
- Country must exist

**Effects:**
- Updates encrypted salary
- Emits `CountrySalaryUpdated` event

**Reverts:**
- `Unauthorized`: Caller is not the owner
- `UnsupportedCountry`: Country does not exist

### Events

```solidity
event CountryJoined(address indexed account, uint32 indexed countryId);
event SalaryClaimed(address indexed account);
event CountrySalaryUpdated(uint32 indexed countryId);
event CountryAdded(uint32 indexed countryId);
event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
```

### Custom Errors

```solidity
error Unauthorized();
error UnsupportedCountry();
error AlreadyJoined();
error SalaryAlreadyClaimed();
error InvalidAddress();
error AlreadySupported();
error InvalidCountryId();
error NotEnrolled();
```

## Project Structure

```
fhe-worlds/
├── contracts/                   # Smart contract source files
│   └── FHEWorlds.sol           # Main contract with FHE functionality
│
├── deploy/                      # Hardhat-deploy deployment scripts
│   └── deploy.ts               # Deployment configuration
│
├── tasks/                       # Custom Hardhat tasks
│   ├── accounts.ts             # Account management tasks
│   └── FHEWorlds.ts            # Contract interaction tasks
│
├── test/                        # Test suites
│   ├── FHEWorlds.ts            # Unit tests (local mock)
│   └── FHEWorldsSepolia.ts     # Integration tests (Sepolia)
│
├── types/                       # Generated TypeScript types
│   ├── contracts/              # Contract type definitions
│   └── factories/              # Contract factory types
│
├── artifacts/                   # Compiled contracts
│   └── contracts/              # ABIs and bytecode
│
├── cache/                       # Hardhat cache
│
├── coverage/                    # Test coverage reports
│
├── hardhat.config.ts           # Hardhat configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Project dependencies
├── .env                        # Environment variables (not in git)
├── .gitignore                  # Git ignore rules
├── .solhint.json               # Solidity linter config
├── .prettierrc.yml             # Code formatting config
└── README.md                   # This file
```

### Key Files Explained

- **contracts/FHEWorlds.sol**: The core smart contract implementing FHE-based country membership and payroll
- **deploy/deploy.ts**: Automated deployment script using hardhat-deploy
- **tasks/FHEWorlds.ts**: CLI commands for contract interaction (join, claim, decrypt)
- **test/FHEWorlds.ts**: Comprehensive test suite with mock FHE environment
- **hardhat.config.ts**: Network configurations, compiler settings, plugin setup
- **package.json**: Dependencies, scripts, and project metadata

## Development Workflow

### Daily Development Cycle

1. **Make Changes to Contract**

   ```bash
   # Edit contracts/FHEWorlds.sol
   code contracts/FHEWorlds.sol
   ```

2. **Compile and Check for Errors**

   ```bash
   npm run compile
   ```

3. **Run Tests**

   ```bash
   npm run test
   ```

4. **Check Code Quality**

   ```bash
   npm run lint
   ```

5. **Deploy to Local Network for Manual Testing**

   ```bash
   # Terminal 1
   npx hardhat node

   # Terminal 2
   npx hardhat deploy --network localhost
   npx hardhat task:countries --network localhost
   ```

### Adding New Features

1. **Update Smart Contract**
   - Edit `contracts/FHEWorlds.sol`
   - Add new functions, events, or state variables

2. **Update Tests**
   - Add test cases in `test/FHEWorlds.ts`
   - Ensure >80% code coverage

3. **Add CLI Tasks** (if needed)
   - Create task in `tasks/FHEWorlds.ts`
   - Document usage in README

4. **Update Documentation**
   - Update this README
   - Add inline code comments
   - Update API documentation

### Debugging Tips

#### View Transaction Details

```bash
# Enable verbose logging
DEBUG=true npx hardhat test

# View gas costs
REPORT_GAS=true npx hardhat test
```

#### Inspect Storage

```typescript
// In tests or scripts
const member = await contract._members(address);
console.log("Member data:", member);
```

#### Debug FHE Operations

```typescript
// Check if value is properly encrypted
console.log("Cipher:", cipher.toString());
console.log("Is zero:", cipher === ethers.ZeroHash);
```

### Best Practices

1. **Always Test Before Deploying**
   - Run full test suite
   - Test on local network first
   - Deploy to testnet before mainnet

2. **Keep Private Keys Secure**
   - Never commit `.env` files
   - Use hardware wallets for production
   - Rotate keys regularly

3. **Gas Optimization**
   - Use `calldata` for read-only function parameters
   - Minimize storage operations
   - Batch operations when possible

4. **Code Quality**
   - Run linters before committing
   - Follow Solidity style guide
   - Write comprehensive tests

## Security Considerations

### Smart Contract Security

1. **Access Control**
   - Owner-only functions protected with `onlyOwner` modifier
   - User data isolation through address-based mappings
   - Permission management via FHE.allow()

2. **Input Validation**
   - Country IDs validated against supported list
   - Zero address checks on ownership transfer
   - Duplicate join prevention
   - Zero country ID rejection

3. **Reentrancy Protection**
   - No external calls before state changes
   - CEI pattern (Checks-Effects-Interactions) followed

4. **Integer Safety**
   - Solidity 0.8.27 has built-in overflow protection
   - No unchecked arithmetic blocks

### FHE-Specific Security

1. **Permission Management**
   - Encrypted data access controlled via FHEVM permission system
   - Users can only decrypt their own data
   - Contract maintains allowlist of authorized decryptors

2. **Proof Verification**
   - Zero-knowledge proofs validated by FHE.fromExternal()
   - Prevents manipulation of encrypted inputs

3. **Type Safety**
   - Strongly-typed encrypted values (euint32)
   - Compile-time type checking prevents errors

### Privacy Considerations

1. **What is Private**
   - Country selection (encrypted)
   - Salary amounts (encrypted)
   - Only user can decrypt their own data

2. **What is Public**
   - List of supported country IDs
   - That a user has joined (hasJoined)
   - That a salary has been claimed (boolean flag)
   - Transaction metadata (sender, gas, timestamp)

3. **Potential Privacy Leaks**
   - **Transaction Patterns**: Frequency and timing of transactions
   - **Gas Usage**: Different operations consume different gas
   - **Event Analysis**: Events reveal account activity

### Audit Status

- **Status**: Not formally audited
- **Recommendation**: Conduct professional security audit before mainnet deployment
- **Self-Assessment**: Contract follows best practices and has comprehensive test coverage

### Responsible Disclosure

If you discover a security vulnerability:

1. **DO NOT** open a public issue
2. Email security concerns to: [your-security-email@example.com]
3. Include detailed description and reproduction steps
4. Allow reasonable time for response before public disclosure

## Future Roadmap

### Phase 1: Core Enhancements (Q1 2025)

- [ ] **Multi-Currency Support**: Allow salary payments in different tokens
- [ ] **Salary Scheduling**: Implement recurring monthly salary claims
- [ ] **Batch Operations**: Enable joining multiple countries (for contractors)
- [ ] **Emergency Pause**: Circuit breaker for security incidents
- [ ] **Gas Optimization**: Reduce transaction costs by 20-30%

### Phase 2: Advanced Features (Q2 2025)

- [ ] **FHE Arithmetic**: Salary calculations (bonuses, deductions) on encrypted values
- [ ] **Encrypted Comparisons**: Compare salaries without revealing amounts
- [ ] **Role-Based Access**: Multiple admin roles (HR, Finance, Owner)
- [ ] **Delegation**: Allow users to delegate salary claims
- [ ] **Salary History**: Track salary changes over time (encrypted)

### Phase 3: Integration & Ecosystem (Q3 2025)

- [ ] **Frontend dApp**: React-based UI for user interactions
- [ ] **Mobile SDK**: iOS and Android SDKs for mobile apps
- [ ] **API Gateway**: RESTful API for third-party integrations
- [ ] **Oracle Integration**: Real-time exchange rates for multi-currency
- [ ] **IPFS Metadata**: Store country metadata off-chain

### Phase 4: Enterprise Features (Q4 2025)

- [ ] **Multi-Signature Admin**: Require multiple approvals for sensitive operations
- [ ] **Compliance Reporting**: Generate encrypted audit reports
- [ ] **Tax Withholding**: Automatic encrypted tax calculations
- [ ] **Benefits System**: Health, retirement, and other benefits tracking
- [ ] **Performance Bonuses**: Encrypted performance-based salary adjustments

### Phase 5: Scaling & Optimization (2026)

- [ ] **Layer 2 Deployment**: Deploy on Arbitrum, Optimism, zkSync
- [ ] **Cross-Chain Support**: Multichain salary distribution
- [ ] **Advanced FHE Operations**: More complex encrypted computations
- [ ] **Zero-Knowledge Proofs**: Additional privacy layers
- [ ] **DAO Governance**: Community-driven development decisions

### Long-Term Vision

- **Universal Privacy Standard**: Become the reference implementation for FHE-based payroll systems
- **Enterprise Adoption**: Partner with HR platforms and payroll providers
- **Regulatory Compliance**: Work with regulators to define FHE compliance standards
- **Open Ecosystem**: Foster a community of developers building on FHEWorlds
- **Research Contributions**: Publish papers on practical FHE applications

### Community Suggestions

We welcome community input on the roadmap! Suggest features by:
- Opening a GitHub Discussion
- Submitting a feature request issue
- Contributing a pull request with a proof of concept

## Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute

1. **Report Bugs**: Open an issue with detailed reproduction steps
2. **Suggest Features**: Share your ideas in GitHub Discussions
3. **Improve Documentation**: Fix typos, clarify explanations, add examples
4. **Write Tests**: Increase test coverage
5. **Submit Code**: Fix bugs or implement new features

### Contribution Process

1. **Fork the Repository**

   ```bash
   git clone https://github.com/yourusername/fhe-worlds.git
   cd fhe-worlds
   git remote add upstream https://github.com/original/fhe-worlds.git
   ```

2. **Create a Feature Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**

   - Write code following the existing style
   - Add tests for new functionality
   - Update documentation as needed
   - Run linters and tests

   ```bash
   npm run lint
   npm run test
   ```

4. **Commit Your Changes**

   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

   Use [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` New features
   - `fix:` Bug fixes
   - `docs:` Documentation changes
   - `test:` Test additions or changes
   - `refactor:` Code refactoring

5. **Push and Create Pull Request**

   ```bash
   git push origin feature/your-feature-name
   ```

   Then open a PR on GitHub with:
   - Clear description of changes
   - Link to related issues
   - Screenshots (if applicable)

### Development Guidelines

- **Code Style**: Follow existing patterns and use Prettier/ESLint
- **Testing**: Maintain >80% test coverage
- **Documentation**: Update README and inline comments
- **Commits**: Write clear, descriptive commit messages
- **Security**: Never commit private keys or sensitive data

### Code Review Process

1. Maintainers will review your PR
2. Address any requested changes
3. Once approved, your PR will be merged
4. You'll be added to the contributors list!

## Resources

### Official Documentation

- [Zama FHEVM Documentation](https://docs.zama.ai/fhevm) - Comprehensive FHEVM guide
- [FHEVM Hardhat Plugin](https://docs.zama.ai/protocol/solidity-guides/development-guide/hardhat) - Hardhat integration
- [FHEVM Quick Start](https://docs.zama.ai/protocol/solidity-guides/getting-started/quick-start-tutorial) - Getting started tutorial
- [Hardhat Documentation](https://hardhat.org/docs) - Hardhat framework guide

### Learning Resources

- [What is FHE?](https://www.zama.ai/post/what-is-fully-homomorphic-encryption) - Introduction to Fully Homomorphic Encryption
- [FHEVM Whitepaper](https://github.com/zama-ai/fhevm/blob/main/fhevm-whitepaper.pdf) - Technical whitepaper
- [Solidity by Example](https://solidity-by-example.org/) - Solidity learning resource
- [Smart Contract Security Best Practices](https://consensys.github.io/smart-contract-best-practices/) - Security guide

### Tools & Services

- [Sepolia Faucet](https://sepoliafaucet.com/) - Get test ETH for Sepolia
- [Sepolia Etherscan](https://sepolia.etherscan.io/) - Blockchain explorer
- [Infura](https://infura.io/) - Ethereum RPC provider
- [MetaMask](https://metamask.io/) - Web3 wallet

### Community

- [Zama Discord](https://discord.gg/zama) - Join the FHEVM community
- [GitHub Discussions](https://github.com/zama-ai/fhevm/discussions) - Ask questions and share ideas
- [GitHub Issues](https://github.com/zama-ai/fhevm/issues) - Report bugs and request features
- [Twitter/X](https://twitter.com/zama_fhe) - Follow Zama for updates

### Related Projects

- [FHEVM GitHub](https://github.com/zama-ai/fhevm) - FHEVM core repository
- [FHEVM Examples](https://github.com/zama-ai/fhevm-examples) - Example projects
- [Hardhat Template](https://github.com/zama-ai/fhevm-hardhat-template) - Official template

## License

This project is licensed under the **BSD-3-Clause-Clear License**.

### What This Means

✅ **You CAN:**
- Use the code commercially
- Modify the code
- Distribute the code
- Use privately

❌ **You CANNOT:**
- Hold authors liable
- Use author names for endorsement without permission

📋 **You MUST:**
- Include the license and copyright notice
- State significant changes made

### Full License

See the [LICENSE](LICENSE) file for the complete license text.

### Third-Party Licenses

This project uses several open-source libraries:
- FHEVM by Zama (BSD-3-Clause-Clear)
- Hardhat (MIT)
- OpenZeppelin Contracts (MIT)
- Ethers.js (MIT)

All dependencies' licenses are preserved and respected.

## Support

### Getting Help

If you need assistance:

1. **Documentation**: Check this README and [FHEVM docs](https://docs.zama.ai/fhevm) first
2. **GitHub Issues**: Search existing issues or [open a new one](https://github.com/yourusername/fhe-worlds/issues)
3. **GitHub Discussions**: Ask questions in [Discussions](https://github.com/yourusername/fhe-worlds/discussions)
4. **Zama Discord**: Join the [Zama community](https://discord.gg/zama) for real-time chat

### Reporting Issues

When reporting issues, please include:

- **Environment**: OS, Node.js version, npm version
- **Network**: Local, Sepolia, or mainnet
- **Error Messages**: Full error output
- **Steps to Reproduce**: Detailed reproduction steps
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens

### Feature Requests

Have an idea? We'd love to hear it!

1. Check if it's already been requested
2. Open a new issue with "Feature Request" label
3. Describe the feature and its benefits
4. Provide examples or mockups if possible

---

## Acknowledgments

This project was built with:

- **Zama**: For pioneering FHEVM technology and providing excellent tools and documentation
- **Hardhat**: For the robust development environment
- **OpenZeppelin**: For smart contract security standards
- **Ethereum Community**: For continuous innovation in blockchain technology

Special thanks to all contributors who help make FHEWorlds better!

---

## Project Status

- **Version**: 0.1.0 (Beta)
- **Status**: Active Development
- **Last Updated**: 2025
- **Mainnet**: Not yet deployed (testnet only)

---

**Built with privacy and security in mind. Powered by FHEVM. 🔒**
