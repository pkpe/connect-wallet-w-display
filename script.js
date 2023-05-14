// script.js
const button = document.getElementById("myButton");
const balanceDisplay = document.getElementById("balanceDisplay");

let walletConnected = false;

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

      // Get the Solana balance and display it
      const publicKey = window.solana.publicKey.toString();
      const balance = await window.solana.getTokenAccountBalance(publicKey);
      balanceDisplay.textContent = `Solana Balance: ${balance}`;

      console.log("Wallet connected:", publicKey);
    } else {
      // Disconnect the wallet
      await window.solana.disconnect();
      walletConnected = false;
      button.textContent = "Connect Wallet";
      balanceDisplay.textContent = "";
      console.log("Wallet disconnected");
    }

  } catch (error) {
    console.error("Error connecting/disconnecting wallet:", error);
  }
});

  }
});
