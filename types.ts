export interface Tab {
  id: string;
  title: string;
  url: string;
  isLoading: boolean;
  favicon: string | null;
}

export interface HistoryEntry {
  id: string;
  title: string;
  url: string;
  timestamp: number;
}

export interface Bookmark {
  id: string;
  title: string;
  url: string;
}

export enum ModalType {
    None,
    Bookmarks,
    History,
    Settings,
    AiAssistant
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}