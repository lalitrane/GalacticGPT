import { useState } from 'react';
import { useConversation } from '@/context/ConversationContext';
import IconAddLine from './Icons/IconAddLine';

export default function ChatComponent() {
  const [messages, setMessages] = useState<{ role: string, content: string }[]>([]);
  const [prompt, setPrompt] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { addTitle, currentTitle, selectTitle } = useConversation();

  console.log(currentTitle)
  
  function handleNewChat() {
    if (summary) {
      addTitle(summary);
      selectTitle(summary); // Set the current title


    }


    setMessages([]);
    setPrompt('');
  }
  

  async function fetchChatResponse() {
    setIsLoading(true); // Set loading state to true

    try {
      // Add user prompt to messages
      setMessages(prev => [...prev, { role: 'user', content: prompt }]);

      const response = await fetch('/api/getResponse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, conversation: messages }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let responseContent = '';

      while (!done) {
        const { value, done: readerDone } = await reader!.read();
        done = readerDone;
        const chunk = decoder.decode(value, { stream: true });

        // Extract the content from each chunk
        const lines = chunk.split('\n').filter(Boolean);
        for (const line of lines) {
          if (line.startsWith('data:')) {
            const jsonData = JSON.parse(line.replace('data: ', ''));
            const content = jsonData.choices?.[0]?.delta?.content || '';
            responseContent += content; // Accumulate the content
          }
        }
      }

      // Add assistant response to messages
      setMessages(prev => [...prev, { role: 'assistant', content: responseContent }]);
      setSummary(responseContent)
      // Clear the prompt input
      setPrompt('');
    } catch (error) {
      console.error('Failed to fetch response', error);
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  }

  return (
    <div className="w-4/5 bg-gray-100 p-4 relative overflow-auto">
            <button
            onClick={handleNewChat}
            className="ml-2 px-4 py-2 primary-button flex items-center text-white rounded-lg  focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            New <IconAddLine/>
          </button>
      <div className='flex flex-col h-screen-minus-100 justify-end'>
        <div>
          {messages.map((msg, index) => (
            <div key={index} className={`mb-2 ${msg.role === 'user' ? 'text-blue-500' : 'text-gray-500'}`}>
              <strong>{msg.role === 'user' ? 'Padawan' : 'Echoes of the Force'}:</strong> {msg.content}
            </div>
          ))}
          {isLoading && <p>Loading...</p>}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gray-100">
        <div className="flex">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type a message..."
          />
          <button
            onClick={fetchChatResponse}
            className="ml-2 px-4 py-2 secondary-button text-white rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            Send
          </button>
    
        </div>
      </div>
    </div>
  );
}
