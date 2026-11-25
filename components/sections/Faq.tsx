'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { FaqProps } from '@/types/templates.types';

export const Faq = ({ data }: FaqProps) => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  if (!data) return null;

  return (
    <section
      id="faq"
      className="w-full overflow-hidden bg-[var(--color-bg-main)] py-8 lg:py-14"
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 lg:px-8">
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
          <p className="mt-3 max-w-xl text-sm text-[var(--color-text)] sm:text-base">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Interactive Accordion (1st item open by default) */}
          <div className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)] lg:col-span-7">
            {data.items.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={`${item.id}-${idx}`} className="py-5">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 text-left"
                  >
                    <span className="font-serif-title text-xl font-medium text-[var(--color-heading)] sm:text-2xl">
                      {item.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`inline-flex h-8 w-8 shrink-0 items-center justify-center border transition-colors ${
                        isOpen
                          ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white'
                          : 'border-[var(--color-border)] text-[var(--color-heading)]'
                      }`}
                    >
                      {isOpen ? (
                        <FaMinus className="text-[11px]" />
                      ) : (
                        <FaPlus className="text-[11px]" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <p className="mt-3 pr-10 text-sm leading-relaxed text-[var(--color-text)] sm:text-base">
                      {item.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Framed Resort Visual + Clean Caption */}
          <div className="lg:col-span-5">
            <div className="border border-[var(--color-border)] bg-[var(--color-bg-soft)]">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={data.image}
                  alt={data.imageAlt}
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div className="border-t border-[var(--color-border)] p-5">
                <p className="text-xs font-semibold tracking-[0.16em] text-[var(--color-primary)] uppercase">
                  {data.captionTitle}
                </p>
                <p className="mt-1.5 text-sm text-[var(--color-text)]">
                  {data.captionSubtitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
