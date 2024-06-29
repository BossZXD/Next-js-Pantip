import '@/styles/global.css';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AppConfig } from '@/utils/AppConfig';
import ClientProviders from '../ClientProviders';
import { useMessages } from 'next-intl';


export const metadata: Metadata = {
};

export default function RootLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!AppConfig.locales.includes(props.params.locale)) notFound();

  const messages = useMessages();

  return (
    <html lang={props.params.locale}>
      <body>
        <ClientProviders messages={messages} locale={props.params.locale}>
          {props.children}
        </ClientProviders>
      </body>
    </html>
  );
}