import React from 'react';
import { XIcon } from '../constants';

interface ModalProps {
    title: string;
    onClose: () => void;
    children: React.ReactNode;
    hideHeader?: boolean;
    noPadding?: boolean;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, children, hideHeader = false, noPadding = false }) => {
    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={onClose}>
            <div 
                className="bg-gray-100 dark:bg-secondary rounded-lg shadow-2xl w-full max-w-2xl h-[70vh] flex flex-col border border-gray-200 dark:border-border-color"
                onClick={(e) => e.stopPropagation()}
            >
                {!hideHeader && (
                    <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-border-color flex-shrink-0">
                        <h2 className="text-lg font-semibold capitalize">{title}</h2>
                        <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-300 dark:hover:bg-border-color">
                            <XIcon />
                        </button>
                    </header>
                )}
                <main className={`flex-grow overflow-y-auto ${noPadding ? '' : 'p-4'}`}>
                    {children}
                </main>
            </div>
        </div>
    );
}

export default Modal;