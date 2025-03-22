import React from 'react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import UsdtTransfer from './components/UsdtTransfer';
import './App.css';

// Manifest URL'i process.env üzerinden alıyoruz veya default değer kullanıyoruz
const manifestUrl = process.env.REACT_APP_MANIFEST_URL || 'https://deneme-tan-psi.vercel.app/tonconnect-manifest.json';

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
