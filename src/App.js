import React from 'react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import UsdtTransfer from './components/UsdtTransfer';
import './App.css';

// TonConnect manifest URL
const manifestUrl = 'https://deneme-tan-psi.vercel.app/tonconnect-manifest.json';

function App() {
  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <div className="App">
        <header className="App-header">
          <h1>TON USDT Transfer</h1>
        </header>
        <main>
          <UsdtTransfer />
        </main>
      </div>
    </TonConnectUIProvider>
  );
}

export default App;
