import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '../components/layout/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Foody Partner Dashboard',
  description: 'Manage your restaurant on Foody.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-background font-sans antialiased flex`}>
        <Sidebar />
        <main className="flex-1 flex flex-col min-h-screen overflow-y-auto p-8">
          {children}
        </main>
      </body>
    </html>
  );
}
