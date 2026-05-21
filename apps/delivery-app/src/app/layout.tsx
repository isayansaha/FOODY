import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import BottomNav from '../components/layout/BottomNav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Foody Driver App',
  description: 'Deliver food and earn.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-background/50 font-sans antialiased text-foreground flex justify-center`}>
        {/* Simulate mobile device frame on desktop */}
        <div className="w-full max-w-md bg-card border-x min-h-screen shadow-2xl relative overflow-x-hidden flex flex-col pb-16">
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
