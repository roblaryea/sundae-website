'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Function to parse and render formatted text
function renderFormattedText(text: string): React.ReactNode {
  // Split by bold markers **text**
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      // Bold text
      return (
        <strong key={index} className="font-semibold text-gray-900 dark:text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

// Function to render a line with proper formatting
function renderLine(line: string, lineIdx: number): React.ReactNode {
  const trimmedLine = line.trim();
  
  // Check if it's a bullet point (• or - at start)
  if (trimmedLine.startsWith('•') || (trimmedLine.startsWith('-') && !trimmedLine.startsWith('---'))) {
    const bulletContent = trimmedLine.startsWith('•') 
      ? trimmedLine.slice(1).trim() 
      : trimmedLine.slice(1).trim();
    return (
      <li key={lineIdx} className="flex items-start space-x-2 ml-4 mt-1">
        <span className="text-electric-blue mt-1.5 flex-shrink-0">•</span>
        <span>{renderFormattedText(bulletContent)}</span>
      </li>
    );
  }
  
  // Check if it's a numbered list item (1. or 1) format)
  const numberedMatch = trimmedLine.match(/^(\d+)[.)]\s+(.+)/);
  if (numberedMatch) {
    return (
      <li key={lineIdx} className="flex items-start space-x-2 ml-4 mt-1">
        <span className="text-electric-blue font-semibold flex-shrink-0 w-5">{numberedMatch[1]}.</span>
        <span>{renderFormattedText(numberedMatch[2])}</span>
      </li>
    );
  }
  
  // Regular line with bold text processing
  return (
    <React.Fragment key={lineIdx}>
      {lineIdx > 0 && <br />}
      {renderFormattedText(line)}
    </React.Fragment>
  );
}

// Function to render content with paragraphs and lists
function renderContent(content: string): React.ReactNode {
  // Split by double newlines for paragraphs
  const paragraphs = content.split('\n\n');
  
  return paragraphs.map((paragraph, idx) => {
    const lines = paragraph.split('\n');
    
    // Check if this paragraph is a list (has bullet points or numbers)
    const isList = lines.some(line => {
      const trimmed = line.trim();
      return trimmed.startsWith('•') || 
             trimmed.startsWith('-') && !trimmed.startsWith('---') ||
             /^\d+[.)]\s+/.test(trimmed);
    });
    
    if (isList) {
      // Render as a list, but handle headers before list items
      const elements: React.ReactNode[] = [];
      let currentListItems: React.ReactNode[] = [];
      
      lines.forEach((line, lineIdx) => {
        const trimmed = line.trim();
        const isBullet = trimmed.startsWith('•') || (trimmed.startsWith('-') && !trimmed.startsWith('---'));
        const isNumbered = /^\d+[.)]\s+/.test(trimmed);
        
        if (isBullet || isNumbered) {
          currentListItems.push(renderLine(line, lineIdx));
        } else if (trimmed) {
          // If we have accumulated list items, flush them first
          if (currentListItems.length > 0) {
            elements.push(
              <ul key={`list-${elements.length}`} className="space-y-1 my-2">
                {currentListItems}
              </ul>
            );
            currentListItems = [];
          }
          // Add the non-list line as a header/text
          elements.push(
            <div key={`text-${lineIdx}`} className={elements.length > 0 ? 'mt-3' : ''}>
              {renderFormattedText(line)}
            </div>
          );
        }
      });
      
      // Flush any remaining list items
      if (currentListItems.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="space-y-1 my-2">
            {currentListItems}
          </ul>
        );
      }
      
      return (
        <div key={idx} className={idx > 0 ? 'mt-4' : ''}>
          {elements}
        </div>
      );
    }
    
    // Regular paragraph
    return (
      <p key={idx} className={idx > 0 ? 'mt-4' : ''}>
        {lines.map((line, lineIdx) => renderLine(line, lineIdx))}
      </p>
    );
  });
}

interface AccordionItemProps {
  title: string;
  content: string;
  isOpen: boolean;
  onClick: () => void;
}

function AccordionItem({ title, content, isOpen, onClick }: AccordionItemProps) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <button
        onClick={onClick}
        className="w-full py-5 px-6 flex justify-between items-center text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold text-gray-900 dark:text-white pr-8">
          {title}
        </span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-5 h-5 text-electric-blue flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 text-gray-600 dark:text-gray-400 leading-relaxed">
              {renderContent(content)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface AccordionProps {
  items: Array<{
    title: string;
    content: string;
  }>;
  defaultOpenIndex?: number;
  allowMultiple?: boolean;
}

export function Accordion({ items, defaultOpenIndex = -1, allowMultiple = false }: AccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>(
    defaultOpenIndex >= 0 ? [defaultOpenIndex] : []
  );

  const handleClick = (index: number) => {
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndexes((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openIndexes.includes(index)}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
}
