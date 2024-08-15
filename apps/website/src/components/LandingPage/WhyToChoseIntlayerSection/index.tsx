import { useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';
import { AnimatedDiv } from './AnimatedDiv';

export const WhyToChoseIntlayerSection: FC = () => {
  const { title, content } = useIntlayer('why-to-chose-intlayer-section');

  return (
    <section className="my-10 flex w-full flex-col items-center justify-center">
      <h2 className="text-neutral dark:text-neutral-dark">{title}</h2>

      <div className="m-auto mt-3 flex flex-wrap justify-evenly gap-3 px-10 py-2">
        {content.map((asset, index) => (
          <AnimatedDiv
            className="flex max-w-[200px] flex-col items-center gap-3 text-center"
            key={index}
          >
            <span className="flex size-12 items-center justify-center rounded-full border-4 border-lime-300 text-2xl text-lime-800 dark:border-lime-900 dark:text-lime-600">
              {index + 1}
            </span>
            <strong className="text-lg font-semibold">{asset.title}</strong>
            <AnimatedDiv>
              <p className="text-neutral dark:text-neutral-dark text-xs">
                {asset.descrition}
              </p>
            </AnimatedDiv>
          </AnimatedDiv>
        ))}
      </div>
    </section>
  );
};
