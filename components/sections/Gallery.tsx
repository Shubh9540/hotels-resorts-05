'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight, FaTimes } from 'react-icons/fa';
import { GalleryProps } from '@/types/templates.types';

export const Gallery = ({ data }: GalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const images = data?.images ?? [];
  const total = images.length;

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null ? null : (prev - 1 + total) % total
    );
  }, [total]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % total));
  }, [total]);

  useEffect(() => {
    if (selectedIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedIndex, handleClose, handlePrev, handleNext]);

  if (!data || total === 0) return null;

  const activeImage =
    selectedIndex !== null ? images[selectedIndex] : null;

  return (
    <section
      id="gallery"
      className="w-full overflow-hidden bg-[var(--color-bg-main)] py-8 lg:py-14"
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 max-w-2xl lg:mb-10">
          <span className="text-xs font-semibold tracking-[0.22em] text-[var(--color-accent)] uppercase">
            {data.eyebrow}
          </span>
          <h2 className="font-serif-title mt-3 text-3xl font-medium leading-tight text-[var(--color-heading)] sm:text-4xl lg:text-[44px]">
            {data.titleStart}{' '}
            <span className="text-[var(--color-primary)]">
              {data.titleAccent}
            </span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-text)] sm:text-base">
            {data.description}
          </p>
        </div>

        {/* 4x2 Image Grid */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {images.map((item, idx) => (
            <button
              key={`${item.id}-${idx}`}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              aria-label={item.caption}
              className="group relative aspect-[4/3] w-full overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-soft)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                unoptimized
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.caption}
          onClick={handleClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex w-full max-w-4xl flex-col bg-[var(--color-bg-main)] shadow-2xl"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              aria-label={data.closeAriaLabel}
              className="absolute right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center bg-[var(--color-primary)] text-white shadow-md transition-colors hover:bg-[var(--color-primary-hover)]"
            >
              <FaTimes className="text-sm" />
            </button>

            {/* Large Image */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--color-primary-deep)]">
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover"
              />

              {/* Prev / Next Overlay Arrows */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label={data.prevAriaLabel}
                className="absolute left-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-white/90 text-[var(--color-heading)] shadow-md transition-colors hover:bg-[var(--color-primary)] hover:text-white"
              >
                <FaArrowLeft className="text-xs" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label={data.nextAriaLabel}
                className="absolute right-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-white/90 text-[var(--color-heading)] shadow-md transition-colors hover:bg-[var(--color-primary)] hover:text-white"
              >
                <FaArrowRight className="text-xs" />
              </button>
            </div>

            {/* Caption & Counter Bar */}
            <div className="flex items-center justify-between border-t border-[var(--color-border)] px-5 py-3.5">
              <p className="font-serif-title text-lg font-medium text-[var(--color-heading)] sm:text-xl">
                {activeImage.caption}
              </p>
              <span className="text-xs font-semibold tracking-widest text-[var(--color-text-muted)] tabular-nums">
                {String(selectedIndex + 1).padStart(2, '0')} /{' '}
                {String(total).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

