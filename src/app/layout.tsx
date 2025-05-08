// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { LanguageProvider } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/UI/LanguageSwitcher';


export const metadata: Metadata = {
  title: 'Restaurant Admin',
  description: 'Admin Dashboard for managing menu & categories',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
      <LanguageProvider>
        <div className='w-full flex justify-end mt-5'>

        <LanguageSwitcher/>
        </div>
        {children}
      <Toaster position="top-right" reverseOrder={false} />
      </LanguageProvider>
      </body>
    </html>
  );
}
