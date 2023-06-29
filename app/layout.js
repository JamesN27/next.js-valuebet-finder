import './globals.css';
import { Inter } from 'next/font/google';
import style from './background.module.css';
import Navbar from './navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Valuescout',
  description: 'Find value in bets and beat the bookies!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${style['background-image']}`}>
        <main>
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
