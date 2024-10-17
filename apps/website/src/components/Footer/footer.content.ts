import type { LinkGroup } from '@intlayer/design-system';
import { t, type DeclarationContent } from 'intlayer';
import { ExternalLinks, PagesRoutes } from '../../Routes';

type FooterContent = {
  content: LinkGroup[];
};

const footerContent = {
  key: 'footer',
  content: {
    content: [
      {
        title: 'Docs',
        links: [
          {
            href: PagesRoutes.Doc,
            text: t({
              en: 'Getting started',
              es: 'Empezando',
              fr: 'Commencez facilement',
            }),
            label: t({
              en: 'See getting started documentation',
              es: 'Ver documentación de inicio',
              fr: 'Voir la documentation de démarrage',
            }),
          },
          {
            href: PagesRoutes.Doc_Environment_NextJS,
            text: t({
              en: 'Intlayer with NextJs',
              es: 'Intlayer con NextJs',
              fr: 'Intlayer avec NextJs',
            }),
            label: t({
              en: 'See Intlayer with NextJs documentation',
              es: 'Ver documentación de Intlayer con NextJs',
              fr: 'Voir la documentation de Intlayer avec NextJs',
            }),
          },
          {
            href: PagesRoutes.Doc_Environment_CRA,
            text: t({
              en: 'Intlayer with ReactJS (CRA)',
              es: 'Intlayer con ReactJS (CRA)',
              fr: 'Intlayer avec ReactJS (CRA)',
            }),
            label: t({
              en: 'See Intlayer with ReactJS (CRA) documentation',
              es: 'Ver documentación de Intlayer con ReactJS (CRA)',
              fr: 'Voir la documentation de Intlayer avec ReactJS (CRA)',
            }),
          },
          {
            href: PagesRoutes.Doc_Environment_ViteAndReact,
            text: t({
              en: 'Intlayer with React+Vite',
              es: 'Intlayer con React+Vite',
              fr: 'Intlayer avec React+Vite',
            }),
            label: t({
              en: 'See Intlayer with React+Vite documentation',
              es: 'Ver documentación de Intlayer con React+Vite',
              fr: 'Voir la documentation de Intlayer avec React+Vite',
            }),
          },
        ],
      },
      {
        title: t({
          en: 'Examples',
          es: 'Ejemplos',
          fr: 'Exemples',
        }),
        links: [
          {
            href: ExternalLinks.ExampleIntlayerWithNextjs,
            text: t({
              en: 'Intlayer with NextJS',
              es: 'Intlayer con NextJS',
              fr: 'Intlayer avec NextJS',
            }),
            label: t({
              en: 'See how to set up Intlayer with NextJS',
              es: 'Ver cómo configurar Intlayer con NextJS',
              fr: 'Voir comment configuer Intlayer avec NextJS',
            }),
          },
          {
            href: ExternalLinks.ExampleIntlayerWithReactJS,
            text: t({
              en: 'Intlayer with ReactJS (CRA)',
              es: 'Intlayer con ReactJS (CRA)',
              fr: 'Intlayer avec ReactJS (CRA)',
            }),
            label: t({
              en: 'See how to set up Intlayer with ReactJS (CRA)',
              es: 'Ver cómo configurar Intlayer con ReactJS (CRA)',
              fr: 'Voir comment configuer Intlayer avec ReactJS (CRA)',
            }),
          },
          {
            href: ExternalLinks.ExampleIntlayerWithViteAndReact,
            text: t({
              en: 'Intlayer with Vite+React',
              es: 'Intlayer con Vite+React',
              fr: 'Intlayer avec Vite+React',
            }),
            label: t({
              en: 'See how to set up Intlayer with Vite+React',
              es: 'Ver cómo configurar Intlayer con Vite+React',
              fr: 'Voir comment configuer Intlayer avec Vite+React',
            }),
          },
        ],
      },
      {
        title: t({
          en: 'Lean more',
          es: 'Aprende más',
          fr: 'En savoir plus',
        }),
        links: [
          {
            href: PagesRoutes.TermsOfService,
            text: t({
              en: 'Terms of service',
              es: 'Términos de servicio',
              fr: 'Conditions de service',
            }),
            label: t({
              en: 'Read our terms of service',
              es: 'Lee nuestros términos de servicio',
              fr: 'Lisez nos conditions de service',
            }),
          },
          {
            href: PagesRoutes.PrivacyPolicy,
            text: t({
              en: 'Privacy Notice',
              es: 'Aviso de privacidad',
              fr: 'Avis de confidentialité',
            }),
            label: t({
              en: 'Read our privacy notice',
              es: 'Lee nuestro aviso de privacidad',
              fr: 'Lisez notre avis de confidentialité',
            }),
          },
          {
            href: ExternalLinks.LinkedIn,
            text: 'LinkedIn',
            label: t({
              en: 'Go to our LinkedIn page',
              es: 'Ir a nuestra página de LinkedIn',
              fr: 'Aller sur notre page LinkedIn',
            }),
          },
        ],
      },
    ],
  },
} satisfies DeclarationContent<FooterContent>;
export default footerContent;
