
import React from 'react';
import { Tab } from '../types';
import { PlusIcon, XIcon, GlobeIcon } from '../constants';

interface TabBarProps {
  tabs: Tab[];
  activeTabId: string;
  onSelectTab: (id: string) => void;
  onCloseTab: (id: string) => void;
  onNewTab: () => void;
}

const TabComponent: React.FC<{ tab: Tab; isActive: boolean; onSelect: () => void; onClose: () => void; }> = ({ tab, isActive, onSelect, onClose }) => {
  const faviconUrl = tab.favicon || `https://www.google.com/s2/favicons?domain=${tab.url}&sz=16`;
  
  return (
    <div
      onClick={onSelect}
      className={`flex items-center justify-between h-10 min-w-[200px] max-w-[200px] px-3 border-r border-gray-200 dark:border-border-color cursor-pointer transition-colors duration-200 ${
        isActive ? 'bg-gray-100 dark:bg-secondary' : 'bg-gray-50 dark:bg-primary hover:bg-gray-200/50 dark:hover:bg-secondary/50'
      }`}
    >
      <div className="flex items-center overflow-hidden">
        {tab.isLoading ? (
          <svg className="animate-spin h-4 w-4 text-gray-500 dark:text-text-secondary mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          tab.url === 'fitolock://new-tab' ? <GlobeIcon /> : <img src={faviconUrl} alt="" className="h-4 w-4 mr-2" />
        )}
        <span className="text-sm truncate">{tab.title}</span>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="ml-2 p-1 rounded-full text-gray-500 dark:text-text-secondary hover:bg-gray-300/50 dark:hover:bg-border-color/50 hover:text-gray-900 dark:hover:text-text-primary"
      >
        <XIcon />
      </button>
    </div>
  );
};

const TabBar: React.FC<TabBarProps> = ({ tabs, activeTabId, onSelectTab, onCloseTab, onNewTab }) => {
  return (
    <div className="flex items-center h-10 bg-gray-50 dark:bg-primary pl-2 pt-2">
      <div className="flex items-center overflow-x-auto overflow-y-hidden">
        {tabs.map((tab) => (
          <TabComponent
            key={tab.id}
            tab={tab}
            isActive={tab.id === activeTabId}
            onSelect={() => onSelectTab(tab.id)}
            onClose={() => onCloseTab(tab.id)}
          />
        ))}
      </div>
      <button onClick={onNewTab} className="p-2 ml-1 h-10 bg-gray-50 dark:bg-primary hover:bg-gray-200/50 dark:hover:bg-secondary/50 border-r border-gray-200 dark:border-border-color">
        <PlusIcon />
      </button>
      <div className="flex-grow h-10" style={{'WebkitAppRegion': 'drag'} as React.CSSProperties}></div>
    </div>
  );
};

export default TabBar;