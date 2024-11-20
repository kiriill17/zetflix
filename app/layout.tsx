import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

import { Provider } from '@/components/provider';

const montserrat_init = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'Zetflix',
  description: 'Фильмы по русски',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat_init.variable} antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
