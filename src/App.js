import React from 'react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import UsdtTransfer from './components/UsdtTransfer';
import './App.css';

const manifestUrl = 'https://your-app.com/tonconnect-manifest.json';

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
