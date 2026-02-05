import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Providers } from '../providers';
import { Public_Sans } from 'next/font/google';
import { routing } from '@/i18n/routing';
import '../globals.css';

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Await params as required by Next.js 15
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning className={publicSans.className}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <div id="__next">{children}</div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
