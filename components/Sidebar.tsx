import React from 'react';
import { useConversation } from '@/context/ConversationContext';
export default function Sidebar() {
    const { titles, selectTitle } = useConversation();
  
    return (
      <div className="w-1/5 dark-grey text-white p-4 overflow-auto">
        <div className="flex flex-col space-y-4">
      <h2>🪐 GalacticGPT</h2>
          <div className="space-y-2">
            {titles.map((title, index) => (
              <p
                key={index}
                className="cursor-pointer hover:underline"
                onClick={() => selectTitle(title)}
              >
                {title}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  }