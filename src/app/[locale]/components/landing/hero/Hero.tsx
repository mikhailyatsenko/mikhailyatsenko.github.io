import cls from './Hero.module.css';
import ScrollDownIcon from '@/assets/icons/scroll-down-icon.svg?url';
import { AnimateInView } from '@/lib/AnimateInView';
import Image from 'next/image';
import LinkedInIcon from '@/assets/icons/linkedin-icon.svg';
import GithubIcon from '@/assets/icons/github-icon.svg';

import LanguageChanger from '@/app/clientComponents/LanguageChanger';
import { LandingTranslationKeys } from '@/types/i18nTypes';

interface HeroProps {
  t: (key: LandingTranslationKeys) => string;
}

export const Hero = async ({ t }: HeroProps) => {
  return (
    <section className="relative h-auto w-full">
      <div
        className="mask-image-[radial-gradient(ellipse_at_100%_0%,black_40%,transparent_70%)] relative flex min-h-screen w-full items-center justify-center bg-stripes-rainbow bg-[length:200%_100%] bg-center blur-[10px] invert-[100%] dark:filter-opacity-saturate"
        style={{
          maskImage:
            'radial-gradient(ellipse at 100% 0%, black 40%, transparent 70%)',
        }}
      >
        <div className="absolute inset-0 animate-smoothBg bg-stripes-rainbow bg-[length:200%_100%] mix-blend-difference" />
      </div>

      <div className="gap-4.5 absolute inset-0 mx-auto flex max-w-7xl flex-col items-center justify-center px-4 text-center mix-blend-difference invert dark:filter-none sm:px-6 lg:px-8">
        <AnimateInView
          className="scale-105 opacity-0 transition duration-1000 ease-in-out"
          activeClass="!opacity-100 !scale-100 transition duration-1000 ease-in-out"
          resetOnExit
        >
          <h4
            className="mb-1 ml-1.5 animate-fadeIn place-self-start text-left font-mono text-base opacity-0 [animation-delay:_1.5s] sm:ml-2 sm:text-lg"
            aria-label="Hi! I'm fontend developer"
          >
            {t('hero.greeting')}
            &nbsp;<span className={cls.typewriter}></span>
          </h4>

          <h1 className="text-left text-5xl sm:text-7xl lg:text-center xl:text-8xl">
            {t('hero.tagline')}
          </h1>
        </AnimateInView>
        <div className="absolute bottom-5 left-0 mt-auto flex w-full animate-fadeIn flex-col items-center gap-7 text-center opacity-0 [animation-delay:_1.5s] h-sm:gap-14">
          <div className="flex justify-center gap-4">
            <LanguageChanger />
            <a
              href="https://www.linkedin.com/in/mikhailyatsenko"
              rel="noopener"
            >
              <LinkedInIcon className="h-6 w-6 fill-foreground transition-colors hover:fill-slate-500" />
            </a>
            <a href="https://github.com/mikhailyatsenko/" rel="noopener">
              <GithubIcon className="h-6 w-6 fill-foreground transition-colors hover:fill-slate-500" />
            </a>
          </div>
          <a href="#profile">
            <Image
              src={ScrollDownIcon}
              className="mx-auto h-[40px] w-[40px] animate-bounce dark:invert-[90%]"
              alt={t('hero.scroll')}
            />
          </a>
        </div>
      </div>
    </section>
  );
};
