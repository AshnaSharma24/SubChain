# ⚡ SubChain – Decentralized Subscription Manager

SubChain is a **Web3-based subscription management platform** that allows users to create, track, and manage subscriptions securely using blockchain technology.

🔗 **Live Demo:** https://sub-chain.vercel.app  
📂 **GitHub Repo:** https://github.com/AshnaSharma24/SubChain  

---

## 📌 Overview

Traditional subscription systems rely on centralized platforms and intermediaries.  
SubChain eliminates this by leveraging **Ethereum smart contracts**, ensuring:

- 🔒 Transparency
- ⚡ Trustless payments
- 📊 On-chain tracking
- 🚫 No intermediaries

---

## ✨ Features

- 🔗 Connect wallet using MetaMask
- 💸 Pay subscriptions using ETH
- 📦 Store subscription data on blockchain
- 📊 View active subscriptions in real-time
- ⚡ Instant transaction confirmation
- 🌐 Fully deployed Web3 application

---

## 🛠 Tech Stack

### 🔹 Blockchain
- Solidity (Smart Contracts)
- Hardhat (Development & Deployment)

### 🔹 Frontend
- HTML, CSS, JavaScript
- Ethers.js (Blockchain interaction)
- MetaMask (Wallet integration)

### 🔹 Deployment
- Vercel (Frontend Hosting)
- Sepolia Testnet (Blockchain network)

---

## ⚙️ How It Works

1. User connects MetaMask wallet  
2. Switches to Sepolia network  
3. Enters subscription details  
4. Transaction is sent to smart contract  
5. Data is stored on-chain  
6. UI fetches and displays subscriptions  

---

## 📁 Project Structure

```
SubChain/
├── contracts/
│   └── SubscriptionManager.sol
├── scripts/
│   └── deploy.js
├── frontend/
│   ├── index.html
│   ├── app.js
│   └── style.css
├── hardhat.config.js
└── package.json
```

---

## 🚀 Getting Started (Local Setup)

1️⃣ **Clone the repo**
```bash
git clone https://github.com/AshnaSharma24/SubChain.git
cd SubChain
```
2️⃣ **Install dependencies**
```bash
npm install
```
3️⃣ **Start local blockchain**
```bash
npx hardhat node
```
4️⃣ **Deploy contract**
```bash
npx hardhat run scripts/deploy.js --network localhost
```
5️⃣ **Run frontend**
Open `frontend/index.html` in your browser

---

## 🌍 Deployment

- **Smart Contract:** Sepolia Testnet  
- **Frontend:** Vercel

---

## 🧠 Future Improvements

- ❌ Cancel subscription feature
- ⏳ Subscription expiry tracking
- 📊 Dashboard analytics
- 🔔 Notifications/reminders
- 💳 Multi-token support (USDT, etc.)
- 🌐 Polygon deployment (lower gas fees)

---

## 💡 Use Cases

- Freelancers managing SaaS tools
- Web3 subscription services
- Decentralized billing systems

---

## 🧑‍💻 Author

**Ashna Sharma**  
GitHub: [AshnaSharma24](https://github.com/AshnaSharma24)

---

## ⭐ Acknowledgements

- Ethereum
- Hardhat
- Ethers.js
- MetaMask
- Vercel
