
import React, { useState } from 'react';

interface WalletGateProps {
  onConnected: () => void;
}

const WalletGate: React.FC<WalletGateProps> = ({ onConnected }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [status, setStatus] = useState('Please connect your wallet to continue.');

  const handleConnect = async () => {
    // Check for a Web3 wallet (like MetaMask)
    if (!(window as any).ethereum) {
      setStatus('No Ethereum wallet detected. Please install a wallet like MetaMask.');
      return;
    }

    setIsConnecting(true);
    setStatus('Requesting wallet connection...');

    try {
      // Request account access
      await (window as any).ethereum.request({ method: 'eth_requestAccounts' });

      // The original UI flow included a "signing" step. We'll keep this text for UX consistency,
      // though actual message signing isn't implemented here.
      setStatus('Please check your wallet to complete connection...');

      // Simulate a brief delay for "decrypting" as in the original flow
      setTimeout(() => {
        setStatus('Wallet connected successfully!');
        setTimeout(() => {
          onConnected();
        }, 1000); // A short delay before transitioning to the browser
      }, 1500);

    } catch (error: any) {
      console.error('Wallet connection failed:', error);
      // Handle user rejection
      if (error.code === 4001) {
        setStatus('Connection request rejected. Please try again.');
      } else {
        setStatus('An error occurred. Please try again.');
      }
      setIsConnecting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-gray-50 dark:bg-primary text-center">
      <div className="flex items-center mb-6">
        <svg className="w-16 h-16 text-blue-600 dark:text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <h1 className="text-4xl font-bold ml-4 text-gray-900 dark:text-text-primary">FitoLock</h1>
      </div>
      <p className="text-lg text-gray-600 dark:text-text-secondary mb-2">{status}</p>
      <div className="max-w-md mx-auto mb-8 px-4">
          <p className="text-xs text-gray-500 dark:text-text-secondary">
              <strong>Security Notice:</strong> FitoLock requests read-only access to your public wallet address. We will never have access to your funds or private keys.
          </p>
      </div>
      <button
        onClick={handleConnect}
        disabled={isConnecting}
        className="px-8 py-3 bg-blue-600 dark:bg-accent text-white font-semibold rounded-lg shadow-lg hover:bg-blue-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 flex items-center"
      >
        {isConnecting && (
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      </button>
    </div>
  );
};

export default WalletGate;