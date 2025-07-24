
import React from 'react';
import { Bookmark, HistoryEntry } from './types';

// Use Internet Archive links to bypass iframe restrictions on the original sites.
export const DEFAULT_BOOKMARKS: Bookmark[] = [
  { id: '5', title: 'Fitochain Explorer', url: 'https://web.archive.org/web/https://explorer.fitochain.com/' },
  { id: '6', title: 'Fito Technology, LLC', url: 'https://web.archive.org/web/https://fitotechnology.com/' },
  { id: '7', title: 'Fitochain', url: 'https://web.archive.org/web/https://fitochain.com/' },
];

export const MOCK_HISTORY: HistoryEntry[] = [
    { id: 'h1', title: 'Welcome to FitoLock', url: 'fitolock://new-tab', timestamp: Date.now() - 100000 },
];


export const GlobeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.707 4.293l.586-.586a2 2 0 012.828 0l2.122 2.121a2 2 0 002.828 0l.585-.586M12 21a9 9 0 110-18 9 9 0 010 18z" />
    </svg>
);

export const LockClosedIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-4 w-4"} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);

export const RefreshIcon = ({ spinning }: { spinning: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${spinning ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M20 4s-2-2-6-2-6 2-6 2s-2 2-2 6 2 6 2 6s2 2 6 2 6-2 6-2" />
    </svg>
);

export const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
);

export const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const BookmarkIcon = ({ solid }: { solid?: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={solid ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    </svg>
);
