
import React from 'react';
import { Bookmark } from '../types';

interface BookmarkBarProps {
  bookmarks: Bookmark[];
  onSelect: (url: string) => void;
}

const BookmarkBar: React.FC<BookmarkBarProps> = ({ bookmarks, onSelect }) => {
  if (bookmarks.length === 0) return null;
  
  return (
    <div className="flex items-center h-10 px-2 bg-gray-100 dark:bg-primary border-b border-gray-200 dark:border-border-color shadow-sm overflow-x-auto">
      {bookmarks.slice(0, 10).map((bookmark) => (
        <button
          key={bookmark.id}
          onClick={() => onSelect(bookmark.url)}
          className="flex items-center px-3 py-1 mr-1 text-sm rounded hover:bg-gray-200 dark:hover:bg-secondary whitespace-nowrap"
        >
          <img
            src={`https://www.google.com/s2/favicons?domain=${bookmark.url}&sz=16`}
            alt=""
            className="w-4 h-4 mr-2"
          />
          {bookmark.title}
        </button>
      ))}
    </div>
  );
};

export default BookmarkBar;