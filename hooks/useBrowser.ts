import { useState, useCallback } from 'react';
import { Tab, HistoryEntry, Bookmark } from '../types';
import { DEFAULT_BOOKMARKS, MOCK_HISTORY } from '../constants';

const createNewTab = (): Tab => {
  const id = `tab_${Date.now()}`;
  return {
    id,
    title: 'New Tab',
    url: 'fitolock://new-tab',
    isLoading: false,
    favicon: null,
  };
};

export const useBrowser = () => {
  const [tabs, setTabs] = useState<Tab[]>([createNewTab()]);
  const [activeTabId, setActiveTabId] = useState<string>(tabs[0].id);
  const [history, setHistory] = useState<HistoryEntry[]>(MOCK_HISTORY);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(DEFAULT_BOOKMARKS);
  const [isVpnActive, setIsVpnActive] = useState<boolean>(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const activeTab = tabs.find(tab => tab.id === activeTabId);

  const addTab = useCallback(() => {
    const newTab = createNewTab();
    setTabs(prevTabs => [...prevTabs, newTab]);
    setActiveTabId(newTab.id);
  }, []);

  const closeTab = useCallback((tabId: string) => {
    setTabs(prevTabs => {
      const tabIndex = prevTabs.findIndex(t => t.id === tabId);
      if (prevTabs.length === 1) {
        const newTab = createNewTab();
        setActiveTabId(newTab.id);
        return [newTab];
      }

      const newTabs = prevTabs.filter(t => t.id !== tabId);
      if (activeTabId === tabId) {
        const newActiveIndex = Math.max(0, tabIndex - 1);
        setActiveTabId(newTabs[newActiveIndex].id);
      }
      return newTabs;
    });
  }, [activeTabId]);

  const updateTab = useCallback((tabId: string, updates: Partial<Tab>) => {
    setTabs(prevTabs =>
      prevTabs.map(tab =>
        tab.id === tabId ? { ...tab, ...updates } : tab
      )
    );
  }, []);
  
  const navigate = useCallback((url: string) => {
    if (!activeTab) return;

    let properUrl = url;
    if (!/^(https?:\/\/|fitolock:\/\/)/.test(url)) {
        properUrl = `https://duckduckgo.com/?q=${encodeURIComponent(url)}`;
    }

    updateTab(activeTab.id, { url: properUrl, isLoading: true, title: 'Loading...' });

    const newHistoryEntry: HistoryEntry = {
        id: `hist_${Date.now()}`,
        title: url, // will be updated on page load
        url: properUrl,
        timestamp: Date.now(),
    };
    // Clear forward history when navigating to a new page from a past state
    setHistory(prev => [newHistoryEntry, ...prev.slice(currentHistoryIndex)]);
    setCurrentHistoryIndex(0);

  }, [activeTab, updateTab, currentHistoryIndex]);

  const goBack = useCallback(() => {
    if (currentHistoryIndex < history.length - 1) {
        const newIndex = currentHistoryIndex + 1;
        setCurrentHistoryIndex(newIndex);
        if (activeTab) {
            const historyEntry = history[newIndex];
            updateTab(activeTab.id, { url: historyEntry.url, isLoading: true, title: historyEntry.title || 'Loading...' });
        }
    }
  }, [currentHistoryIndex, history, activeTab, updateTab]);

  const goForward = useCallback(() => {
      if (currentHistoryIndex > 0) {
          const newIndex = currentHistoryIndex - 1;
          setCurrentHistoryIndex(newIndex);
          if (activeTab) {
              const historyEntry = history[newIndex];
              updateTab(activeTab.id, { url: historyEntry.url, isLoading: true, title: historyEntry.title || 'Loading...' });
          }
      }
  }, [currentHistoryIndex, history, activeTab, updateTab]);

  const addBookmark = useCallback((title: string, url: string) => {
      if (bookmarks.some(b => b.url === url)) return;
      const newBookmark: Bookmark = { id: `bm_${Date.now()}`, title, url };
      setBookmarks(prev => [newBookmark, ...prev]);
  }, [bookmarks]);

  const removeBookmark = useCallback((bookmarkId: string) => {
      setBookmarks(prev => prev.filter(b => b.id !== bookmarkId));
  }, []);
  
  const toggleVpn = useCallback(() => {
      setIsVpnActive(prev => !prev);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const clearHistory = useCallback(() => {
    setHistory(MOCK_HISTORY);
    setCurrentHistoryIndex(0);
  }, []);

  return {
    tabs,
    activeTab,
    activeTabId,
    history,
    bookmarks,
    isVpnActive,
    theme,
    currentHistoryIndex,
    addTab,
    closeTab,
    setActiveTabId,
    updateTab,
    navigate,
    goBack,
    goForward,
    addBookmark,
    removeBookmark,
    toggleVpn,
    toggleTheme,
    clearHistory,
  };
};