// script.js
const button = document.getElementById("myButton");
const balanceDisplay = document.getElementById("balanceDisplay");

let walletConnected = false;
let publicKey = null;

button.addEventListener("click", async function() {
  try {
    // Check if the Phantom wallet is installed
    if (!window.solana || !window.solana.isPhantom) {
      throw new Error("Phantom wallet extension is not installed.");
    }

    if (!walletConnected) {
      // Request connection to the Phantom wallet
      await window.solana.connect();

      // Wallet is connected
      walletConnected = true;
      button.textContent = "Disconnect";

      // Get the public key of the connected wallet
      publicKey = window.solana.publicKey.toString();

      console.log("Wallet connected:", publicKey);
    } else {
      // Disconnect the wallet
      await window.solana.disconnect();
      walletConnected = false;
      button.textContent = "Connect Wallet";
      balanceDisplay.textContent = "";
      publicKey = null;

      console.log("Wallet disconnected");
    }

  } catch (error) {
    console.error("Error connecting/disconnecting wallet:", error);
  }
});

async function updateBalance() {
  if (publicKey) {
    try {
      // Use Solana's web3.js library to fetch the wallet balance
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

// Periodically update the wallet balance
setInterval(updateBalance, 5000);
