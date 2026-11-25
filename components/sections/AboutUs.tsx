'use client';

import Image from 'next/image';
import { AboutUsProps } from '@/types/templates.types';

export const AboutUs = ({ data }: AboutUsProps) => {
  if (!data) return null;

  return (
    <section
      id="about"
      className="w-full overflow-hidden bg-[var(--color-bg-main)] py-8 lg:py-14"
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left Framed Resort Photo + Crisp Stat Plaque */}
          <div className="lg:col-span-6">
            <div className="relative pb-6 pr-4 sm:pr-6">
              <div
                aria-hidden="true"
                className="absolute bottom-0 right-0 top-6 left-6 border border-[var(--color-accent)]"
              />
              <div className="relative aspect-[4/3] w-full overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-soft)]">
                <Image
                  src={data.image}
                  alt={data.imageAlt}
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="relative z-10 ml-auto -mt-10 mr-4 w-fit border border-[var(--color-border)] bg-[var(--color-bg-main)] px-6 py-4 shadow-sm">
                <p className="font-serif-title text-3xl font-semibold leading-none text-[var(--color-primary)] sm:text-4xl">
                  {data.statNumber}
                </p>
                <p className="mt-1 text-xs font-medium tracking-wider text-[var(--color-text-muted)] uppercase">
                  {data.statLabel}
                </p>
              </div>
            </div>
          </div>

          {/* Right Editorial Story & Pillars */}
          <div className="lg:col-span-6">
            <div className="mb-8 lg:mb-10">
              <span className="text-xs font-semibold tracking-[0.22em] text-[var(--color-accent)] uppercase">
                {data.eyebrow}
              </span>
              <h2 className="font-serif-title mt-3 text-3xl font-medium leading-tight text-[var(--color-heading)] sm:text-4xl lg:text-[44px]">
                {data.titleStart}{' '}
                <span className="text-[var(--color-primary)]">
                  {data.titleAccent}
                </span>
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-[var(--color-text)] sm:text-base">
                {data.descriptionLeft}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--color-text)] sm:text-base">
                {data.descriptionRight}
              </p>
            </div>

            <div className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
              {data.features.map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-12 sm:items-baseline sm:gap-4"
                >
                  <h3 className="text-sm font-semibold tracking-wide text-[var(--color-heading)] sm:col-span-5">
                    {item.label}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] sm:col-span-7">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
