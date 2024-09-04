import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ConversationContextType {
  titles: string[];
  addTitle: (title: string) => void;
  selectTitle: (title: string) => void;
  currentTitle: string;
}

const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

export function ConversationProvider({ children }: { children: ReactNode }) {
  const [titles, setTitles] = useState<string[]>([]);
  const [currentTitle, setCurrentTitle] = useState<string>('');

// Inside ConversationProvider
const addTitle = (title: string) => {
    setTitles(prevTitles => [...prevTitles, title]);
    console.log('Added Title:', title);
  };
  
  const selectTitle = (title: string) => {
    setCurrentTitle(title);
    console.log('Selected Title:', title);
  };
  
  // Inside ChatComponent
  useEffect(() => {
    console.log('Current Title in ChatComponent:', currentTitle);
  }, [currentTitle]);
  

  return (
    <ConversationContext.Provider value={{ titles, addTitle, selectTitle, currentTitle }}>
      {children}
    </ConversationContext.Provider>
  );
}

export function useConversation() {
  const context = useContext(ConversationContext);
  if (context === undefined) {
    throw new Error('useConversation must be used within a ConversationProvider');
  }
  return context;
}
