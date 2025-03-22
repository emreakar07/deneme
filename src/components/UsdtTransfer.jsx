import React, { useState } from 'react';
import { TonConnectButton, TonConnectUI } from '@tonconnect/ui-react';
import { Address, toNano, beginCell } from 'ton-core';

// USDT contract addresses
const USDT_CONTRACT_ADDRESS = {
  mainnet: 'EQBynBO23yHy0uvOQA5mXoexX5X9VXlYz0Tq-Mw1Z6KQj5Y',
  testnet: 'EQBynBO23yHy0uvOQA5mXoexX5X9VXlYz0Tq-Mw1Z6KQj5Y'
};

// USDT contract op codes
const OP_CODES = {
  TRANSFER: 0xf8a7ea5, // transfer op code
  TRANSFER_NOTIFICATION: 0x7bdd97de, // transfer notification op code
};

const UsdtTransfer = () => {
  const tonConnectUI = TonConnectUI.useTonConnectUI();
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTransfer = async () => {
    try {
      setLoading(true);
      setError('');

      if (!tonConnectUI.connected) {
        throw new Error('Please connect your wallet first');
      }

      if (!recipientAddress || !amount) {
        throw new Error('Please fill in all fields');
      }

      // Validate recipient address
      let recipient;
      try {
        recipient = Address.parse(recipientAddress);
      } catch (e) {
        throw new Error('Invalid recipient address');
      }

      // Convert amount to nano (USDT has 6 decimals)
      const amountInNano = toNano(amount);

      // Create transfer message
      const transferMessage = beginCell()
        .storeUint(OP_CODES.TRANSFER, 32)
        .storeUint(0, 64)
        .storeCoins(amountInNano)
        .storeAddress(recipient)
        .storeAddress(tonConnectUI.account.address) // response destination
        .storeUint(0, 1) // no custom payload
        .endCell();

      // Get current network
      const currentNetwork = tonConnectUI.network === 'mainnet' ? 'mainnet' : 'testnet';
      const contractAddress = Address.parse(USDT_CONTRACT_ADDRESS[currentNetwork]);

      // Here you would implement the actual USDT transfer logic
      // This is a placeholder for the actual implementation
      console.log('Transferring USDT:', {
        from: tonConnectUI.account.address,
        to: recipientAddress,
        amount: amountInNano.toString(),
        contract: contractAddress.toString(),
        message: transferMessage.toBoc().toString('base64'),
      });

      // Reset form
      setRecipientAddress('');
      setAmount('');
      alert('Transfer initiated successfully!');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="usdt-transfer-container">
      <h2>USDT Transfer</h2>
      
      <div className="wallet-connection">
        <TonConnectButton />
      </div>

      {tonConnectUI.connected && (
        <div className="transfer-form">
          <div className="form-group">
            <label>Recipient Address:</label>
            <input
              type="text"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              placeholder="Enter TON address"
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label>Amount (USDT):</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="input-field"
              step="0.000001"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            onClick={handleTransfer}
            disabled={loading}
            className="transfer-button"
          >
            {loading ? 'Processing...' : 'Transfer USDT'}
          </button>
        </div>
      )}

      <style jsx>{`
        .usdt-transfer-container {
          max-width: 500px;
          margin: 0 auto;
          padding: 20px;
        }

        .wallet-connection {
          margin-bottom: 20px;
          text-align: center;
        }

        .transfer-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .input-field {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 16px;
        }

        .transfer-button {
          padding: 12px;
          background-color: #0088cc;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.3s;
        }

        .transfer-button:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }

        .error-message {
          color: red;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

export default UsdtTransfer; 