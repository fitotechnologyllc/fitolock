import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import type { Chat } from '@google/genai';
import { ChatMessage } from '../types';
import { SparklesIcon } from '../constants';

const AiAssistant: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'model', text: 'Hello! I am Fity, your friendly AI assistant. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatRef = useRef<Chat | null>(null);

    useEffect(() => {
        try {
            const apiKey = process.env.API_KEY;
            if (!apiKey) {
                setError("API_KEY environment variable not set. Please ensure it is configured.");
                return;
            }
            const ai = new GoogleGenAI({ apiKey });
            chatRef.current = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: 'You are Fity, a friendly and helpful AI assistant inside the FitoLock browser. Keep your answers concise and helpful.',
                }
            });
        } catch (err) {
             const errorMessage = err instanceof Error ? err.message : 'Failed to initialize AI Assistant.';
             setError(errorMessage);
        }
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading || !chatRef.current) return;

        const userMessage: ChatMessage = { role: 'user', text: input };
        const currentInput = input;
        
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setError(null);

        try {
            const stream = await chatRef.current.sendMessageStream({ message: currentInput });
            
            // Add a placeholder for the streaming response
            setMessages(prev => [...prev, { role: 'model', text: '' }]);

            for await (const chunk of stream) {
                // Update the last message (the placeholder) with the streaming text
                setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMessage = newMessages[newMessages.length - 1];
                    if (lastMessage.role === 'model') {
                        lastMessage.text += chunk.text;
                    }
                    return newMessages;
                });
            }

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
            const displayError = `Sorry, I encountered an error. Please try again. (${errorMessage})`;
            setError(errorMessage);
            setMessages(prev => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                 // If the last message was the placeholder, replace it with the error.
                if (lastMessage.role === 'model' && lastMessage.text === '') {
                    lastMessage.text = displayError;
                    return newMessages;
                }
                // Otherwise, add a new error message
                return [...newMessages, { role: 'model', text: displayError }];
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="flex flex-col h-full bg-gray-100 dark:bg-secondary">
            <header className="flex items-center p-4 border-b border-gray-200 dark:border-border-color flex-shrink-0 text-blue-600 dark:text-accent">
                <SparklesIcon />
                <h2 className="text-lg font-semibold ml-2 text-gray-800 dark:text-text-primary">Fity AI Assistant</h2>
            </header>
            <div className="flex-grow p-4 overflow-y-auto space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-3 w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role === 'model' && (
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 dark:bg-accent flex items-center justify-center text-white dark:text-primary">
                                <SparklesIcon />
                            </div>
                        )}
                        <div className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'user' ? 'bg-blue-600 dark:bg-accent text-white' : 'bg-white dark:bg-primary text-gray-800 dark:text-text-primary'}`}>
                            {msg.text ? 
                                <p className="text-sm whitespace-pre-wrap break-words">{msg.text}</p> :
                                (index === messages.length -1 && isLoading && <div className="w-1 h-1 bg-gray-500 dark:bg-text-primary rounded-full animate-pulse"></div>)
                            }
                        </div>
                    </div>
                ))}
                {isLoading && messages[messages.length -1]?.role !== 'model' && (
                     <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 dark:bg-accent flex items-center justify-center text-white dark:text-primary">
                            <SparklesIcon />
                        </div>
                        <div className="max-w-md p-3 rounded-lg bg-white dark:bg-primary">
                            <div className="flex items-center space-x-1.5">
                                <span className="w-2 h-2 bg-gray-400 dark:text-text-secondary rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                                <span className="w-2 h-2 bg-gray-400 dark:text-text-secondary rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                                <span className="w-2 h-2 bg-gray-400 dark:text-text-secondary rounded-full animate-pulse"></span>
                            </div>
                        </div>
                    </div>
                )}
                 <div ref={messagesEndRef} />
            </div>
            {error && <div className="p-2 mx-4 mb-2 text-center text-sm text-red-400 bg-red-900/50 rounded-md">Error: {error}</div>}
            <div className="p-4 border-t border-gray-200 dark:border-border-color bg-white dark:bg-primary">
                <div className="flex items-center bg-gray-100 dark:bg-secondary rounded-lg border border-gray-300 dark:border-border-color focus-within:ring-2 focus-within:ring-blue-500 dark:focus-within:ring-accent">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        placeholder="Ask Fity anything..."
                        className="w-full p-2 bg-transparent focus:outline-none resize-none text-gray-800 dark:text-text-primary"
                        rows={1}
                        disabled={isLoading}
                    />
                    <button onClick={handleSend} disabled={isLoading || !input.trim()} className="p-3 text-blue-600 dark:text-accent disabled:text-gray-400 dark:disabled:text-text-secondary disabled:cursor-not-allowed">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                           <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AiAssistant;