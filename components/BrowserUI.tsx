import React, { useState } from 'react';
import { useBrowser } from '../hooks/useBrowser';
import TabBar from './TabBar';
import AddressBar from './AddressBar';
import ContentView from './ContentView';
import BookmarkBar from './BookmarkBar';
import Modal from './Modal';
import BookmarksManager from './BookmarksManager';
import HistoryManager from './HistoryManager';
import Settings from './Settings';
import AiAssistant from './AiAssistant';
import { ModalType } from '../types';
import { LockClosedIcon } from '../constants';

interface BrowserUIProps {
  browserState: ReturnType<typeof useBrowser>;
}

const BrowserUI: React.FC<BrowserUIProps> = ({ browserState }) => {
  const [modal, setModal] = useState<ModalType>(ModalType.None);

  const { activeTab, theme, toggleTheme, history, currentHistoryIndex } = browserState;

  const renderModalContent = () => {
    switch(modal) {
        case ModalType.Bookmarks:
            return <BookmarksManager bookmarks={browserState.bookmarks} removeBookmark={browserState.removeBookmark} navigate={browserState.navigate} closeModal={() => setModal(ModalType.None)} />;
        case ModalType.History:
            return <HistoryManager history={browserState.history} navigate={browserState.navigate} closeModal={() => setModal(ModalType.None)} />;
        case ModalType.Settings:
            return <Settings theme={theme} toggleTheme={toggleTheme} clearHistory={browserState.clearHistory} closeModal={() => setModal(ModalType.None)} />;
        case ModalType.AiAssistant:
            return <AiAssistant />;
        default:
            return null;
    }
  }

  if (!activeTab) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-gray-100 dark:bg-secondary">
        <p>Error: No active tab found.</p>
      </div>
    );
  }

  const canGoBack = currentHistoryIndex < history.length - 1;
  const canGoForward = currentHistoryIndex > 0;

  return (
    <div className="flex flex-col h-full w-full bg-gray-100 dark:bg-secondary rounded-lg overflow-hidden">
      <div className="bg-gray-50 dark:bg-primary border-b border-gray-200 dark:border-border-color">
        <TabBar
          tabs={browserState.tabs}
          activeTabId={browserState.activeTabId}
          onSelectTab={browserState.setActiveTabId}
          onCloseTab={browserState.closeTab}
          onNewTab={browserState.addTab}
        />
        <AddressBar 
          activeTab={activeTab} 
          navigate={browserState.navigate} 
          updateTab={browserState.updateTab}
          isBookmarked={browserState.bookmarks.some(b => b.url === activeTab.url)}
          onBookmarkToggle={() => {
              if (browserState.bookmarks.some(b => b.url === activeTab.url)) {
                  const bookmark = browserState.bookmarks.find(b => b.url === activeTab.url);
                  if(bookmark) browserState.removeBookmark(bookmark.id);
              } else {
                  browserState.addBookmark(activeTab.title, activeTab.url);
              }
          }}
          onShowHistory={() => setModal(ModalType.History)}
          onShowBookmarks={() => setModal(ModalType.Bookmarks)}
          onShowSettings={() => setModal(ModalType.Settings)}
          onShowAiAssistant={() => setModal(ModalType.AiAssistant)}
          vpnProps={{ isActive: browserState.isVpnActive, onToggle: browserState.toggleVpn }}
          onGoBack={browserState.goBack}
          onGoForward={browserState.goForward}
          canGoBack={canGoBack}
          canGoForward={canGoForward}
        />
      </div>
      <BookmarkBar bookmarks={browserState.bookmarks} onSelect={browserState.navigate} />
      <ContentView 
        key={activeTab.id} 
        tab={activeTab} 
        updateTab={browserState.updateTab}
        addBookmark={browserState.addBookmark}
      />
      <footer className="bg-gray-50 dark:bg-primary border-t border-gray-200 dark:border-border-color px-4 py-2 text-xs text-gray-500 dark:text-text-secondary flex items-center justify-center gap-2">
        <LockClosedIcon className="h-3 w-3" />
        <span>FitoLock by Fito Technology, LLC 2025 © Copyright. All Rights Reserved.</span>
      </footer>
      {modal !== ModalType.None && (
          <Modal 
            title={modal.toString()} 
            onClose={() => setModal(ModalType.None)}
            hideHeader={modal === ModalType.AiAssistant}
            noPadding={modal === ModalType.AiAssistant}
          >
              {renderModalContent()}
          </Modal>
      )}
    </div>
  );
};

export default BrowserUI;