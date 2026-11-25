'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight, FaStar } from 'react-icons/fa';
import { TestimonialsProps } from '@/types/templates.types';

export const Testimonials = ({ data }: TestimonialsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const items = data?.items ?? [];
  const total = items.length;

  useEffect(() => {
    if (total <= 1 || isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 5500);
    return () => clearInterval(timer);
  }, [total, isPaused]);

  if (!data || total === 0) return null;

  const current = items[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  return (
    <section
      id="testimonials"
      className="w-full overflow-hidden bg-[var(--color-bg-soft)] py-8 lg:py-14"
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between lg:mb-10">
          <div>
            <span className="text-xs font-semibold tracking-[0.22em] text-[var(--color-accent)] uppercase">
              {data.eyebrow}
            </span>
            <h2 className="font-serif-title mt-3 text-3xl font-medium leading-tight text-[var(--color-heading)] sm:text-4xl lg:text-[44px]">
              {data.titleStart}{' '}
              <span className="text-[var(--color-primary)]">
                {data.titleAccent}
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold tracking-widest text-[var(--color-text-muted)] tabular-nums">
              {String(activeIndex + 1).padStart(2, '0')} /{' '}
              {String(total).padStart(2, '0')}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label={data.prevAriaLabel}
                className="inline-flex h-10 w-10 items-center justify-center border border-[var(--color-border)] bg-[var(--color-bg-main)] text-[var(--color-heading)] transition-colors hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white"
              >
                <FaArrowLeft className="text-xs" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label={data.nextAriaLabel}
                className="inline-flex h-10 w-10 items-center justify-center border border-[var(--color-border)] bg-[var(--color-bg-main)] text-[var(--color-heading)] transition-colors hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white"
              >
                <FaArrowRight className="text-xs" />
              </button>
            </div>
          </div>
        </div>

        {/* Fixed-Height Quote Card to Prevent Layout Shift */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="border border-[var(--color-border)] bg-[var(--color-card)] p-6 sm:p-10 lg:p-12"
        >
          <div className="flex items-center gap-1 text-[var(--color-accent)]">
            {Array.from({ length: current.rating }).map((_, idx) => (
              <FaStar key={`star-${idx}`} className="text-sm" />
            ))}
          </div>

          <div className="mt-6 min-h-[168px] sm:min-h-[136px] lg:min-h-[120px]">
            <blockquote className="font-serif-title text-xl leading-relaxed text-[var(--color-heading)] sm:text-2xl lg:text-[28px] lg:leading-[1.4]">
              &ldquo;{current.quote}&rdquo;
            </blockquote>
          </div>

          <div className="mt-8 flex flex-col gap-5 border-t border-[var(--color-border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-[var(--color-border)]">
                <Image
                  src={current.image}
                  alt={current.imageAlt}
                  fill
                  unoptimized
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-base font-semibold text-[var(--color-heading)]">
                  {current.name}
                </p>
                <p className="text-xs tracking-wide text-[var(--color-text-muted)]">
                  {current.role}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {items.map((item, idx) => (
                <button
                  key={`${item.id}-dot-${idx}`}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={item.name}
                  className={`h-2 transition-all duration-200 ${
                    idx === activeIndex
                      ? 'w-7 bg-[var(--color-primary)]'
                      : 'w-2 bg-[var(--color-border)] hover:bg-[var(--color-accent)]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
