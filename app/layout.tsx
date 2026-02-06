import { Providers } from './providers';
import { Public_Sans } from 'next/font/google';
import './globals.css';

const publicSans = Public_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata = {
  title: 'Fund Cat - Fund Comparison Tool',
  description: 'Compare and analyze mutual funds in Thailand with real-time data from SEC',
  keywords: ['mutual funds', 'Thailand', 'SEC', 'fund comparison', 'investment'],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={publicSans.className}>
      <body>
        <Providers>
          <div id="__next">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
