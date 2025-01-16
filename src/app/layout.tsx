import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Header } from '@/components/common/Header';

import { ThemeProvider } from '@/context/ThemeContext';
import { cookies } from 'next/headers';
import { ContactsWithFooter } from '@/components/landing/contacts/ContactsWithFooter';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const themeCookie = (await cookieStore).get('theme');
  const isDarkTheme = themeCookie ? themeCookie.value === 'dark' : false;
  return (
    <html lang="en" className={isDarkTheme ? 'dark' : ''}>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        <ThemeProvider initialTheme={isDarkTheme ? 'dark' : 'light'}>
          <Header />
          <main className="relative z-[2] bg-background shadow-sm h-sm:mb-[30rem] sm576:h-sm:mb-96">
            {children}
            {modal}
          </main>
          <div className="relative bottom-0 z-[1] h-fit w-full h-sm:fixed h-sm:h-[30rem] sm576:h-sm:h-96">
            <ContactsWithFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
