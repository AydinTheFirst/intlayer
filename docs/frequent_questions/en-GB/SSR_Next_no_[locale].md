---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Is it possible to use Intlayer with Next.js without `[locale]` in the page path?
description: Learn how to use Intlayer with Next.js without `[locale]` in the page path.
keywords:
  - locale
  - path
  - intlayer
  - next.js
  - vite
  - framework
  - middleware
  - configuration
  - prefixDefault
  - noPrefix
slugs:
  - doc
  - faq
  - ssr-next-no-[locale]
---

# Is it possible to use Intlayer with Next.js without `[locale]` in the page path?

Yes, it is possible to use Intlayer with Next.js without `[locale]` in the page path. However, it is not recommended to do so, because splitting your page allows you to trigger more keywords on search engines. Your SSR may also be impacted.

If you want to do so, follow the same steps as described in the [Intlayer with Next.js](https://intlayer.org/doc/environment/nextjs) guide,

- no `src/middleware.ts`
- no `generateStaticParams`

```tsx fileName="src/app/layout.tsx"
import type { FC, PropsWithChildren } from "react";

const LocaleLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang={undefined} dir={undefined}>
    <body className={inter.className}>{children}</body>
  </html>
);

export default LocaleLayout;
```

```tsx fileName="src/app/page.tsx"
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { PageContent } from "@components/pageContent";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";

const Page: FC = () => {
  return (
    <IntlayerServerProvider>
      <PageContent />
      <ServerComponentExample />

      <IntlayerClientProvider>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};

export default Page;
```

```tsx fileName="src/component/pageContent.ts"
"use client";

import { type FC } from "react";
import { useIntlayer } from "next-intlayer";
import { useHTMLLanguage } from "@hooks/htmlTextDir";

const PageContent: FC = () => {
  useHTMLLanguage();
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};
```

```tsx fileName="src/hooks/htmlTextDir.ts"
"use client";

import { useEffect } from "react";
import { getHTMLTextDir } from "intlayer";
import { useLocale } from "next-intlayer";

export const useHTMLLanguage = () => {
  const { locale } = useLocale();

  useEffect(() => {
    if (!document) return;

    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```
