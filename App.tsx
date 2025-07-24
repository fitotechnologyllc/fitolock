
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import WalletGate from './components/WalletGate';
import BrowserUI from './components/BrowserUI';
import { useBrowser } from './hooks/useBrowser';

const App: React.FC = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const browserState = useBrowser();
  const { theme } = browserState;

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const handleWalletConnected = useCallback(() => {
    setIsWalletConnected(true);
  }, []);

  return (
    <div className="h-screen w-screen font-sans">
      {isWalletConnected ? (
        <BrowserUI browserState={browserState} />
      ) : (
        <WalletGate onConnected={handleWalletConnected} />
      )}
    </div>
  );
};

export default App;