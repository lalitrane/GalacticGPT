import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import { Inter } from "next/font/google";
import { ConversationProvider } from '@/context/ConversationContext';
const inter = Inter({ subsets: ["latin"] });

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <ConversationProvider>
      <main className={`flex h-screen overflow-hidden ${inter.className}`}>
        <Sidebar />
        {children}
      </main>
    </ConversationProvider>
  );
}