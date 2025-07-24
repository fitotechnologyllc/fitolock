
import React, { useState } from 'react';

interface SettingsProps {
    closeModal: () => void;
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    clearHistory: () => void;
}

const Settings: React.FC<SettingsProps> = ({ closeModal, theme, toggleTheme, clearHistory }) => {
    const [cleared, setCleared] = useState(false);

    const handleClearData = () => {
        clearHistory();
        setCleared(true);
        setTimeout(() => {
            setCleared(false);
        }, 2000);
    }

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-2">Appearance</h3>
                <div className="p-4 bg-white dark:bg-primary rounded-md">
                    <label className="flex items-center justify-between cursor-pointer">
                        <span>Dark Mode</span>
                        <div className="relative">
                            <input type="checkbox" className="sr-only" checked={theme === 'dark'} onChange={toggleTheme} />
                            <div className={`block w-11 h-6 rounded-full transition ${theme === 'dark' ? 'bg-accent' : 'bg-gray-300'}`}></div>
                            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${theme === 'dark' ? 'transform translate-x-5' : ''}`}></div>
                        </div>
                    </label>
                    <p className="text-sm text-gray-500 dark:text-text-secondary mt-1">
                        {theme === 'dark' ? 'Enjoy the dark side.' : 'Let there be light.'}
                    </p>
                </div>
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-2">Privacy & Security</h3>
                <div className="p-4 bg-white dark:bg-primary rounded-md space-y-2">
                    <button 
                        className={`w-full text-left p-2 rounded transition-colors duration-200 ${cleared ? 'bg-green-500 text-white cursor-default' : 'bg-gray-100 dark:bg-secondary hover:bg-gray-200 dark:hover:bg-border-color'}`}
                        onClick={handleClearData}
                        disabled={cleared}
                    >
                        {cleared ? 'Browsing Data Cleared!' : 'Clear Browsing Data'}
                    </button>
                     <button className="w-full text-left p-2 bg-gray-100 dark:bg-secondary rounded opacity-50 cursor-not-allowed">
                        Manage Site Permissions
                    </button>
                </div>
            </div>
             <div>
                <h3 className="text-lg font-semibold mb-2">About FitoLock</h3>
                <div className="p-4 bg-white dark:bg-primary rounded-md text-gray-500 dark:text-text-secondary">
                   <p>Version: 1.0.0 (Simulated)</p>
                   <p>A secure gateway to the decentralized web, built with React.</p>
                </div>
            </div>
        </div>
    );
};

export default Settings;