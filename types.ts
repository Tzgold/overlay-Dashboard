
// Fix: Import React to resolve "Cannot find namespace 'React'" error when using React.ReactNode
import React from 'react';

export type ToolId = 'chat' | 'summarize' | 'explain' | 'rewrite' | 'translate' | 'search' | 'settings';

export interface AITool {
  id: ToolId;
  name: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
  shortcut: string;
}

export interface AppState {
  isOpen: boolean;
  activeToolId: ToolId;
  darkMode: boolean;
  pageContext: string;
  selectedText: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}