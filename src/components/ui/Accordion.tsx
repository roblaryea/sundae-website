'use client';

import React, { useId, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { PRICING_URL } from '@/lib/urls';

// Function to parse and render formatted text
function renderFormattedText(text: string): React.ReactNode {
  // Keep existing bold formatting and support the authored calculator links.
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\(https:\/\/[^)\s]+\))/g);
  
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      // Bold text
      return (
        <strong key={index} className="font-semibold text-[var(--text-primary)]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    const pricingLink = part.match(/^\[([^\]]+)\]\((https:\/\/[^)\s]+)\)$/);
    if (pricingLink) {
      try {
        const destination = new URL(pricingLink[2]);
        if (destination.origin === new URL(PRICING_URL).origin &&
          ['/', '/simulator'].includes(destination.pathname)) {
          return (
            <a
              key={index}
              href={destination.toString()}
              className="font-medium text-[var(--text-primary)] underline underline-offset-4 hover:decoration-[var(--accent-warm)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-warm)]"
            >
              {pricingLink[1]}
            </a>
          );
        }
      } catch { /* Leave unsupported link syntax as plain text. */ }
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
        <span className="text-[var(--text-primary)] mt-1.5 flex-shrink-0">•</span>
        <span>{renderFormattedText(bulletContent)}</span>
      </li>
    );
  }
  
  // Check if it's a numbered list item (1. or 1) format)
  const numberedMatch = trimmedLine.match(/^(\d+)[.)]\s+(.+)/);
  if (numberedMatch) {
    return (
      <li key={lineIdx} className="flex items-start space-x-2 ml-4 mt-1">
        <span className="text-[var(--text-primary)] font-semibold flex-shrink-0 w-5">{numberedMatch[1]}.</span>
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
    <div className="border-b border-[var(--border-default)]">
      <button
        onClick={onClick}
        className="w-full py-5 px-6 flex justify-between items-center text-left hover:bg-[var(--surface-faint)] transition-colors"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold text-[var(--text-primary)] pr-8">
          {title}
        </span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-5 h-5 text-[var(--text-primary)] flex-shrink-0"
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
            <div className="px-6 pb-5 text-[var(--text-supporting)] leading-relaxed">
              {renderContent(content)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function EditorialAccordionItem({ title, content, isOpen, onClick }: AccordionItemProps) {
  const id = useId();
  const reducedMotion = useReducedMotion();
  return (
    <div className="border-b border-[var(--border-default)]">
      <h3>
        <button
          id={`${id}-question`}
          aria-controls={`${id}-answer`}
          aria-expanded={isOpen}
          onClick={onClick}
          className="group flex min-h-14 w-full items-center justify-between gap-5 py-6 text-start text-lg leading-relaxed text-[var(--text-primary)] transition-colors hover:text-[var(--text-warm)] focus-visible:relative focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-warm)] sm:text-xl"
        >
          <span className="min-w-0 font-medium">{title}</span>
          <motion.svg aria-hidden="true" animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: reducedMotion ? 0 : 0.2 }} className="h-5 w-5 shrink-0 text-[var(--text-warm)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path d="M12 5v14M5 12h14" />
          </motion.svg>
        </button>
      </h3>
      <motion.div
        id={`${id}-answer`}
        aria-labelledby={`${id}-question`}
        aria-hidden={!isOpen}
        inert={!isOpen}
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.2, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="max-w-3xl pb-7 pe-4 text-base leading-relaxed text-[var(--text-supporting)] sm:pe-10 sm:text-lg [&_li]:me-0 [&_li]:ms-0 [&_li]:gap-2 [&_li>span]:m-0">
          {renderContent(content)}
        </div>
      </motion.div>
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
  variant?: 'default' | 'editorial';
}

export function Accordion({ items, defaultOpenIndex = -1, allowMultiple = false, variant = 'default' }: AccordionProps) {
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

  const Item = variant === 'editorial' ? EditorialAccordionItem : AccordionItem;
  return (
    <div className={variant === 'editorial' ? 'border-t border-[var(--border-default)]' : "bg-[var(--surface-subtle)] rounded-xl shadow-lg overflow-hidden border border-[var(--border-default)]"}>
      {items.map((item, index) => (
        <Item
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
