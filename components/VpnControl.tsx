import React, { useState, useEffect } from 'react';

interface VpnControlProps {
  isActive: boolean;
  onToggle: () => void;
}

const VpnControl: React.FC<VpnControlProps> = ({ isActive, onToggle }) => {
  const [statusText, setStatusText] = useState(isActive ? 'Connected' : 'Disconnected');

  useEffect(() => {
    let timeoutId: number;
    if (isActive) {
        setStatusText('Connecting...');
        timeoutId = window.setTimeout(() => setStatusText('Connected'), 1500);
    } else {
        if (statusText !== 'Disconnected') { // Avoid running on initial render
            setStatusText('Disconnecting...');
            timeoutId = window.setTimeout(() => setStatusText('Disconnected'), 1000);
        }
    }
    return () => window.clearTimeout(timeoutId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  const bgColor = isActive ? 'bg-green-500' : 'bg-gray-400 dark:bg-gray-600';
  const dotPosition = isActive ? 'translate-x-5' : 'translate-x-0';
  const statusColor = isActive ? 'text-green-500' : 'text-gray-500 dark:text-text-secondary';
  
  return (
    <div className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-secondary">
      <span className={`text-xs font-semibold transition-colors ${statusColor}`}>{statusText}</span>
      <button
        onClick={onToggle}
        className={`${bgColor} relative inline-flex items-center h-5 w-10 rounded-full transition-colors`}
      >
        <span className={`${dotPosition} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`} />
      </button>
    </div>
  );
};

export default VpnControl;