import { ClientComponentExample } from '@component/components/ClientComponentExample';
import { LocaleSwitcher } from '@component/components/LangSwitcherDropDown';
import { NestedServerComponentExample } from '@component/components/NestedServerComponentExample';
import { ServerComponentExample } from '@component/components/ServerComponentExample';
import { type NextPageIntlayer, IntlayerClientProvider } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';

const PageDemoUsageComponents: NextPageIntlayer = ({ params: { locale } }) => {
  return (
    <>
      {/**
       *   IntlayerServerProvider is used to provide the locale to the server children
       *   IntlayerServerProvider don't work if set in the layout
       */}
      <IntlayerServerProvider locale={locale}>
        {/**
         *   IntlayerClientProvider is used to provide the locale to the client children
         *   IntlayerClientProvider can be set in any parent component, including the layout
         */}
        <IntlayerClientProvider locale={locale}>
          <main className="size-screen	 m-auto flex max-w-xl flex-col items-center justify-center gap-8 p-20">
            <ClientComponentExample />
            <ServerComponentExample />
            <NestedServerComponentExample />
          </main>
          <div className="absolute bottom-5 right-5 z-50">
            <LocaleSwitcher />
          </div>
        </IntlayerClientProvider>
      </IntlayerServerProvider>
    </>
  );
};
export default PageDemoUsageComponents;
