// Define global variables
let publicKey = null;
const balanceDisplay = document.getElementById("balanceDisplay");
const connectButton = document.getElementById("myButton");

// Connect wallet function
async function connectWallet() {
  try {
    const wallet = await solana.connect();
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
      const connection = new web3.Connection(web3.clusterApiUrl("mainnet-beta"));
      const publicKeyObj = new web3.PublicKey(publicKey);
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
const solana = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("mainnet-beta"));

// Listen for wallet connections
solana.on("connect", async (wallet) => {
  publicKey = wallet.publicKey.toString();
  console.log("Connected to wallet:", publicKey);
  connectButton.textContent = "Disconnect Wallet";
  updateBalance();
});

// Listen for wallet disconnections
solana.on("disconnect", () => {
  disconnectWallet();
});

// Handle connect/disconnect button clicks
connectButton.addEventListener("click", () => {
  if (publicKey) {
    solana.disconnect();
  } else {
    connectWallet();
  }
});


