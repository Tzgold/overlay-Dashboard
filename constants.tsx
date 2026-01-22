
import React from 'react';
import { MessageSquare, FileText, Code, PenTool, Languages, Search, Settings } from 'lucide-react';
import { ToolId, AITool } from './types';

export const TOOLS: AITool[] = [
  { id: 'chat', name: 'Chat', description: 'Interactive AI Assistant', icon: <MessageSquare size={18} />, enabled: true, shortcut: 'C' },
  { id: 'summarize', name: 'Summarize', description: 'Condense current page', icon: <FileText size={18} />, enabled: true, shortcut: 'S' },
  { id: 'explain', name: 'Explain Code', description: 'Understand snippets', icon: <Code size={18} />, enabled: true, shortcut: 'E' },
  { id: 'rewrite', name: 'Rewrite', description: 'Tone & style adjustments', icon: <PenTool size={18} />, enabled: true, shortcut: 'R' },
  { id: 'translate', name: 'Translate', description: 'Universal translator', icon: <Languages size={18} />, enabled: true, shortcut: 'T' },
  { id: 'search', name: 'Deep Search', description: 'Grounding with Google', icon: <Search size={18} />, enabled: true, shortcut: 'F' },
  { id: 'settings', name: 'Settings', description: 'Preferences & Keys', icon: <Settings size={18} />, enabled: true, shortcut: ',' },
];

export const TOOL_SHORTCUTS: Record<string, ToolId> = {
  'KeyC': 'chat',
  'KeyS': 'summarize',
  'KeyE': 'explain',
  'KeyR': 'rewrite',
  'KeyT': 'translate',
  'KeyF': 'search',
  'Comma': 'settings',
};
