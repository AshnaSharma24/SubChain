let provider;
let signer;
let contract;

const contractAddress = "0x5DA0b1D4D6838311082738e91f670b5d8A61BC73";

// ABI
const abi = [
  "function subscribe(string,uint256) payable",
  "function getMySubscriptions() view returns (tuple(uint256,string,address,uint256,uint256,uint256,bool)[])"
];

function setStatus(msg) {
  let el = document.getElementById("status");
  if (!el) {
    el = document.createElement("div");
    el.id = "status";
    el.style.margin = "8px 0";
    el.style.color = "#fff";
    document.body.prepend(el);
  }
  el.innerText = msg;
}

// 🔗 CONNECT WALLET
async function connectWallet() {
  try {
    setStatus("Connecting wallet...");

    if (!window.ethereum) {
      alert("Install MetaMask");
      return;
    }

    provider = new ethers.providers.Web3Provider(window.ethereum);

    // Request account
    await window.ethereum.request({ method: "eth_requestAccounts" });

    // 🔥 AUTO SWITCH TO SEPOLIA
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xaa36a7" }], // Sepolia
      });
    } catch (switchError) {
      // If not added → add network
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0xaa36a7",
              chainName: "Sepolia Test Network",
              rpcUrls: ["https://rpc.sepolia.org"],
              nativeCurrency: {
                name: "Sepolia ETH",
                symbol: "ETH",
                decimals: 18,
              },
              blockExplorerUrls: ["https://sepolia.etherscan.io"],
            },
          ],
        });
      } else {
        throw switchError;
      }
    }

    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, abi, signer);

    const user = await signer.getAddress();

    // Final network verification
    const network = await provider.getNetwork();
    if (network.chainId !== 11155111) {
      alert("⚠️ Still not on Sepolia. Please switch manually.");
      return;
    }

    // UI update
    document.querySelector(".connect-btn").innerText =
      user.slice(0, 6) + "..." + user.slice(-4);

    setStatus(`✅ Connected: ${user} (Sepolia)`);

    await loadSubscriptions();
  } catch (error) {
    console.error("connectWallet error", error);
    setStatus("❌ Connection failed: " + error.message);
  }
}

// ➕ ADD SUBSCRIPTION
async function addSubscription() {
  try {
    if (!contract) {
      alert("Connect wallet first");
      return;
    }

    const service = document.getElementById("service").value;
    const duration = document.getElementById("duration").value;
    const amount = document.getElementById("amount").value;

    if (!service || !duration || !amount) {
      alert("Fill all fields");
      return;
    }

    setStatus("⏳ Sending transaction...");

    const value = ethers.utils.parseEther(amount);

    const tx = await contract.subscribe(service, duration, { value });

    setStatus("📤 Tx sent: " + tx.hash);

    await tx.wait();

    setStatus("✅ Transaction confirmed!");

    await loadSubscriptions();
  } catch (error) {
    console.error("addSubscription error", error);
    setStatus("❌ Failed: " + (error.message || error));
  }
}

// 📦 LOAD SUBSCRIPTIONS
async function loadSubscriptions() {
  try {
    const subs = await contract.getMySubscriptions();

    let html = "";

    subs.forEach((s) => {
      const service = s.service ?? s[1];
      const active = s.active ?? s[6];
      const amountRaw = s.amount ?? s[3];

      if (!amountRaw) return;

      const amountEth = ethers.utils.formatEther(amountRaw);

      html += `
        <div class="subscription">
          <h3>${service}</h3>
          <p>Amount: ${amountEth} ETH</p>
          <p>Status: ${active ? "Active" : "Inactive"}</p>
        </div>
      `;
    });

    document.getElementById("list").innerHTML = html;
  } catch (err) {
    console.error("loadSubscriptions error", err);
  }
}

// 🔁 AUTO RELOAD on account/network change
if (window.ethereum) {
  window.ethereum.on("chainChanged", () => window.location.reload());
  window.ethereum.on("accountsChanged", () => window.location.reload());
}