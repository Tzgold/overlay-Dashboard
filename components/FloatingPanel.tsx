
import React, { useState, useEffect, useRef } from 'react';
import { X, GripHorizontal, Maximize2, Minimize2 } from 'lucide-react';

interface FloatingPanelProps {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
}

const FloatingPanel: React.FC<FloatingPanelProps> = ({ children, onClose, title }) => {
  const [position, setPosition] = useState({ x: window.innerWidth / 2 - 250, y: 100 });
  const [size, setSize] = useState({ width: 500, height: 600 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === dragRef.current || dragRef.current?.contains(e.target as Node)) {
      setIsDragging(true);
    }
  };

  const handleResizeDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition(prev => ({
          x: Math.max(0, Math.min(window.innerWidth - size.width, prev.x + e.movementX)),
          y: Math.max(0, Math.min(window.innerHeight - size.height, prev.y + e.movementY))
        }));
      }
      if (isResizing) {
        setSize(prev => ({
          width: Math.max(350, prev.width + e.movementX),
          height: Math.max(400, prev.height + e.movementY)
        }));
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, size]);

  return (
    <div 
      className="fixed z-[999999] shadow-2xl rounded-2xl overflow-hidden glass dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-colors"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
      }}
    >
      {/* Header / Drag Bar */}
      <div 
        ref={dragRef}
        onMouseDown={handleMouseDown}
        className="h-12 flex items-center justify-between px-4 cursor-grab active:cursor-grabbing border-b border-slate-200/50 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/50"
      >
        <div className="flex items-center gap-3">
          <GripHorizontal size={16} className="text-slate-400" />
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="relative h-[calc(100%-48px)] overflow-y-auto">
        {children}
      </div>

      {/* Resize Handle */}
      <div 
        onMouseDown={handleResizeDown}
        className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize hover:bg-slate-200/30 dark:hover:bg-slate-700/30 rounded-tl-lg"
      />
    </div>
  );
};

export default FloatingPanel;
