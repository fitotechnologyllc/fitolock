import React, { useState, useEffect } from 'react';
import { Tab } from '../types';
import { LockClosedIcon, RefreshIcon, BookmarkIcon } from '../constants';
import VpnControl from './VpnControl';

interface AddressBarProps {
  activeTab: Tab;
  navigate: (url: string) => void;
  updateTab: (tabId: string, updates: Partial<Tab>) => void;
  isBookmarked: boolean;
  onBookmarkToggle: () => void;
  onShowHistory: () => void;
  onShowBookmarks: () => void;
  onShowSettings: () => void;
  vpnProps: {
      isActive: boolean;
      onToggle: () => void;
  };
  onGoBack: () => void;
  onGoForward: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
}

const AddressBar: React.FC<AddressBarProps> = ({ 
    activeTab, 
    navigate, 
    isBookmarked, 
    onBookmarkToggle,
    onShowHistory,
    onShowBookmarks,
    onShowSettings,
    vpnProps,
    onGoBack,
    onGoForward,
    canGoBack,
    canGoForward
}) => {
  const [inputValue, setInputValue] = useState(activeTab.url);

  useEffect(() => {
    if (activeTab.url !== 'fitolock://new-tab') {
      setInputValue(activeTab.url);
    } else {
        setInputValue('');
    }
  }, [activeTab.url]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate(inputValue);
    }
  };

  return (
    <div className="flex items-center h-12 px-2 bg-gray-50 dark:bg-primary">
      <div className="flex items-center space-x-1">
        <button 
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed" 
            onClick={onGoBack} 
            disabled={!canGoBack}
        >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${canGoBack ? 'text-gray-800 dark:text-text-primary' : 'text-gray-400 dark:text-text-secondary'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button 
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed" 
            onClick={onGoForward} 
            disabled={!canGoForward}
        >
             <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${canGoForward ? 'text-gray-800 dark:text-text-primary' : 'text-gray-400 dark:text-text-secondary'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
        <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-secondary" onClick={() => navigate(activeTab.url)}>
          <RefreshIcon spinning={activeTab.isLoading} />
        </button>
      </div>
      <div className="flex-grow flex items-center mx-2 bg-gray-100 dark:bg-secondary rounded-full border border-gray-300 dark:border-border-color focus-within:ring-2 focus-within:ring-blue-500 dark:focus-within:ring-accent">
        <div className="pl-3 pr-2 text-gray-500 dark:text-text-secondary">
          <LockClosedIcon />
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search or enter address"
          className="w-full h-8 bg-transparent focus:outline-none text-sm text-gray-900 dark:text-text-primary"
        />
        <button onClick={onBookmarkToggle} className={`p-2 rounded-full hover:bg-gray-300/50 dark:hover:bg-border-color/50 mx-1 ${isBookmarked ? 'text-blue-500 dark:text-accent' : 'text-gray-500 dark:text-text-secondary'}`}>
            <BookmarkIcon solid={isBookmarked}/>
        </button>
      </div>
      <div className="flex items-center space-x-1">
        <VpnControl isActive={vpnProps.isActive} onToggle={vpnProps.onToggle} />
        <button onClick={onShowHistory} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </button>
        <button onClick={onShowBookmarks} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
        </button>
        <button onClick={onShowSettings} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        </button>
      </div>
    </div>
  );
};

export default AddressBar;