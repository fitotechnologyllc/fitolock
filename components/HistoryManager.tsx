
import React from 'react';
import { HistoryEntry } from '../types';

interface HistoryManagerProps {
    history: HistoryEntry[];
    navigate: (url:string) => void;
    closeModal: () => void;
}

const HistoryManager: React.FC<HistoryManagerProps> = ({ history, navigate, closeModal }) => {
    
    const handleNavigate = (url: string) => {
        navigate(url);
        closeModal();
    }

    const groupedHistory = history.reduce((acc, item) => {
        const date = new Date(item.timestamp).toDateString();
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(item);
        return acc;
    }, {} as Record<string, HistoryEntry[]>);

    return (
        <div>
            {Object.keys(groupedHistory).map(date => (
                <div key={date} className="mb-4">
                    <h3 className="font-bold text-gray-900 dark:text-text-primary mb-2">{date}</h3>
                    <ul className="space-y-1">
                        {groupedHistory[date].map(entry => (
                            <li 
                                key={entry.id} 
                                className="flex items-center p-2 bg-white dark:bg-primary rounded-md hover:bg-gray-200/50 dark:hover:bg-primary/50 cursor-pointer"
                                onClick={() => handleNavigate(entry.url)}
                            >
                                <img
                                    src={`https://www.google.com/s2/favicons?domain=${entry.url}&sz=16`}
                                    alt=""
                                    className="w-4 h-4 mr-3 flex-shrink-0"
                                />
                                <div className="flex flex-col overflow-hidden">
                                    <span className="truncate">{entry.title || entry.url}</span>
                                    <span className="text-xs text-gray-500 dark:text-text-secondary truncate">{entry.url}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default HistoryManager;