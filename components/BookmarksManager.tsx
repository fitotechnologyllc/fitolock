
import React from 'react';
import { Bookmark } from '../types';
import { XIcon } from '../constants';

interface BookmarksManagerProps {
    bookmarks: Bookmark[];
    removeBookmark: (id: string) => void;
    navigate: (url: string) => void;
    closeModal: () => void;
}

const BookmarksManager: React.FC<BookmarksManagerProps> = ({ bookmarks, removeBookmark, navigate, closeModal }) => {
    
    const handleNavigate = (url: string) => {
        navigate(url);
        closeModal();
    }
    
    return (
        <div>
            {bookmarks.length === 0 ? (
                <p className="text-gray-500 dark:text-text-secondary text-center">No bookmarks saved yet.</p>
            ) : (
                <ul className="space-y-2">
                    {bookmarks.map(bookmark => (
                        <li key={bookmark.id} className="flex items-center justify-between p-2 bg-white dark:bg-primary rounded-md hover:bg-gray-200/50 dark:hover:bg-primary/50">
                            <div className="flex items-center cursor-pointer flex-grow overflow-hidden" onClick={() => handleNavigate(bookmark.url)}>
                                <img
                                    src={`https://www.google.com/s2/favicons?domain=${bookmark.url}&sz=16`}
                                    alt=""
                                    className="w-4 h-4 mr-3 flex-shrink-0"
                                />
                                <div className="flex flex-col overflow-hidden">
                                    <span className="font-semibold truncate">{bookmark.title}</span>
                                    <span className="text-xs text-gray-500 dark:text-text-secondary truncate">{bookmark.url}</span>
                                </div>
                            </div>
                            <button onClick={() => removeBookmark(bookmark.id)} className="ml-2 p-1 text-gray-500 dark:text-text-secondary hover:text-red-500 rounded-full hover:bg-gray-300 dark:hover:bg-border-color flex-shrink-0">
                                <XIcon />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BookmarksManager;