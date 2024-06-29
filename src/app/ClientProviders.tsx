"use client";

import { NextIntlClientProvider } from "next-intl";

import { ReduxProvider } from "./ReduxProvider";

export default function ClientProviders({
  children,
  messages,
  locale,
}: {
  children: React.ReactNode;
  messages: any;
  locale: string;
}) {
  return (
    <ReduxProvider>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </ReduxProvider>
  );
}
