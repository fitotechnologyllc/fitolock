
import React, { useRef, useEffect, useState } from 'react';
import { Tab } from '../types';
import { BookmarkIcon } from '../constants';

interface ContentViewProps {
  tab: Tab;
  updateTab: (tabId: string, updates: Partial<Tab>) => void;
  addBookmark: (title: string, url: string) => void;
}

const NewTabPage: React.FC<{ addBookmark: (title: string, url: string) => void }> = ({ addBookmark }) => (
    <div className="flex flex-col items-center justify-center h-full text-gray-800 dark:text-text-primary bg-gray-100 dark:bg-secondary">
        <h1 className="text-5xl font-bold mb-4">FitoLock</h1>
        <p className="text-gray-500 dark:text-text-secondary mb-8">Your secure gateway to the decentralized web.</p>
        <div className="w-full max-w-md p-4 bg-white dark:bg-primary rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Quick Actions</h2>
             <button onClick={() => addBookmark('Example Bookmark', 'https://example.com')} className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-secondary w-full text-left">
                <BookmarkIcon />
                <span className="ml-2">Add Example Bookmark</span>
            </button>
        </div>
    </div>
);

const ErrorPage: React.FC<{ url: string }> = ({ url }) => (
    <div className="flex flex-col items-center justify-center h-full text-gray-600 dark:text-text-secondary bg-gray-50 dark:bg-secondary p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-text-primary mb-2">Page Failed to Load</h2>
        <p className="max-w-md mb-4">Many websites use security settings that prevent them from being displayed inside another application.</p>
        <p className="font-mono bg-gray-200 dark:bg-primary text-gray-500 dark:text-text-secondary p-2 rounded-md mt-4 text-sm break-all">{url}</p>
    </div>
);


const ContentView: React.FC<ContentViewProps> = ({ tab, updateTab, addBookmark }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loadError, setLoadError] = useState<boolean>(false);

  useEffect(() => {
    setLoadError(false);
  }, [tab.url]);
  
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || tab.url === 'fitolock://new-tab') return;

    const handleLoad = () => {
      try {
        const title = iframe.contentDocument?.title || tab.url;
        const favicon = `https://www.google.com/s2/favicons?domain=${tab.url}&sz=32`;
        updateTab(tab.id, { isLoading: false, title, favicon });
        setLoadError(false);
      } catch (error) {
        console.warn('Could not access iframe content:', error);
        updateTab(tab.id, { isLoading: false, title: `Error: Blocked Page` });
        setLoadError(true);
      }
    };
    
    iframe.addEventListener('load', handleLoad);

    return () => {
        iframe.removeEventListener('load', handleLoad);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab.id, tab.url]);

  if (tab.url === 'fitolock://new-tab') {
    return <NewTabPage addBookmark={addBookmark} />;
  }
  
  if (loadError) {
      return <ErrorPage url={tab.url} />;
  }

  return (
    <div className="flex-grow bg-white relative">
      {tab.isLoading && (
        <div className="absolute inset-0 bg-gray-100/80 dark:bg-secondary/80 flex items-center justify-center z-10">
          <svg className="animate-spin h-8 w-8 text-blue-600 dark:text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}
      <iframe
        ref={iframeRef}
        src={tab.url}
        className="w-full h-full border-none"
        title={tab.title}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      ></iframe>
    </div>
  );
};

export default ContentView;