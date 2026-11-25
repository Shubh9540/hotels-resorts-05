'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import { HeroProps } from '@/types/templates.types';

export const Hero = ({ data }: HeroProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const images = data?.images ?? [];
  const total = images.length;

  useEffect(() => {
    if (total <= 1 || isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 4500);
    return () => clearInterval(timer);
  }, [total, isPaused]);

  if (!data || total === 0) return null;

  const currentImage = images[activeIndex];

  return (
    <section
      id="hero"
      className="hero-surface relative w-full overflow-hidden py-8 lg:py-14"
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Editorial Column */}
          <div className="lg:col-span-5">
            <div className="mb-4 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-[1px] w-9 bg-[var(--color-accent)]"
              />
              <span className="text-xs font-semibold tracking-[0.22em] text-[var(--color-primary)] uppercase">
                {data.eyebrow}
              </span>
            </div>

            <h1 className="font-serif-title text-4xl font-medium leading-[1.08] tracking-tight text-[var(--color-heading)] sm:text-5xl lg:text-[56px]">
              <span className="block">{data.titleLine1}</span>
              <span className="block text-[var(--color-primary)]">
                {data.titleLine2}
              </span>
            </h1>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-[var(--color-text)] sm:text-base">
              {data.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={data.primaryCtaUrl}
                className="inline-flex items-center gap-3 bg-[var(--color-primary)] px-6 py-3 text-xs font-semibold tracking-[0.16em] text-white uppercase transition-colors hover:bg-[var(--color-primary-hover)]"
              >
                <span>{data.primaryCtaLabel}</span>
                <FaArrowRight aria-hidden="true" className="text-[11px]" />
              </Link>
              <Link
                href={data.secondaryCtaUrl}
                className="inline-flex items-center border border-[var(--color-primary)] px-6 py-3 text-xs font-semibold tracking-[0.16em] text-[var(--color-primary)] uppercase transition-colors hover:bg-[var(--color-primary-soft)]"
              >
                {data.secondaryCtaLabel}
              </Link>
            </div>

            {/* Clean Editorial Thumbnail Strip */}
            <div className="mt-10 border-t border-[var(--color-border)] pt-6">
              <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
                <span className="font-medium tracking-wider uppercase">
                  {currentImage.caption}
                </span>
                <span className="tabular-nums">
                  {String(activeIndex + 1).padStart(2, '0')} /{' '}
                  {String(total).padStart(2, '0')}
                </span>
              </div>
              <div className="mt-3 grid grid-cols-4 gap-2.5">
                {images.map((item, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={`${item.id}-${idx}`}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      aria-label={item.caption}
                      className={`relative h-14 overflow-hidden border transition-all duration-200 ${
                        isActive
                          ? 'border-[var(--color-primary)] ring-1 ring-[var(--color-primary)]'
                          : 'border-[var(--color-border)] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        unoptimized
                        sizes="120px"
                        className="object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Full-Color Architectural Photo Showcase */}
          <div
            className="lg:col-span-7"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-soft)] shadow-[0_20px_50px_var(--color-shadow)] sm:aspect-[16/11]">
              {images.map((item, idx) => (
                <div
                  key={`${item.id}-slide-${idx}`}
                  className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                    idx === activeIndex
                      ? 'z-10 opacity-100'
                      : 'pointer-events-none z-0 opacity-0'
                  }`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    priority={idx === 0}
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
