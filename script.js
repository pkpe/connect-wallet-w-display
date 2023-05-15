// Define global variables
let publicKey = null;
const balanceDisplay = document.getElementById("balanceDisplay");
const connectButton = document.getElementById("myButton");

// Connect wallet function
async function connectWallet() {
  try {
    const wallet = new solanaWeb3.WalletAdapter(window.solana);
    await wallet.connect();
    publicKey = wallet.publicKey.toString();
    console.log("Connected to wallet:", publicKey);
    connectButton.textContent = "Disconnect Wallet";
    updateBalance();
  } catch (error) {
    console.error("Error connecting wallet:", error);
  }
}

// Disconnect wallet function
function disconnectWallet() {
  publicKey = null;
  console.log("Disconnected from wallet");
  connectButton.textContent = "Connect Wallet";
  balanceDisplay.textContent = "";
}

// Update balance function
async function updateBalance() {
  if (publicKey) {
    try {
      const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("mainnet-beta"));
      const publicKeyObj = new solanaWeb3.PublicKey(publicKey);
      const balance = await connection.getBalance(publicKeyObj);
      const solBalance = balance / 10 ** 9; // Convert from lamports to SOL

      balanceDisplay.textContent = `Solana Balance: ${solBalance} SOL`;
      console.log("Balance updated:", solBalance);
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
    }
  }
}

// Initialize Solana wallet adapter
window.onload = function () {
  if ("solana" in window) {
    const wallet = new solanaWeb3.WalletAdapter(window.solana);
    solanaWeb3.on("connect", () => {
      console.log("Connected to wallet provider");
      connectWallet();
    });
    solanaWeb3.on("disconnect", () => {
      console.log("Disconnected from wallet provider");
      disconnectWallet();
    });
    wallet.on("connect", () => {
      publicKey = wallet.publicKey.toString();
      console.log("Connected to wallet:", publicKey);
      connectButton.textContent = "Disconnect Wallet";
      updateBalance();
    });
    wallet.on("disconnect", () => {
      disconnectWallet();
    });
    wallet.connect();
  } else {
    console.error("Solana wallet provider not found");
  }
};

// Handle connect/disconnect button clicks
connectButton.addEventListener("click", () => {
  if (publicKey) {
    solanaWeb3.disconnect();
  } else {
    connectWallet();
  }
});


