'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import {
  FaArrowLeft,
  FaArrowRight,
  FaBed,
  FaExpandArrowsAlt,
  FaUserFriends,
} from 'react-icons/fa';
import { RoomsProps } from '@/types/templates.types';

export const Rooms = ({ data }: RoomsProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const rooms = data?.rooms ?? [];
  const carouselRooms =
    rooms.length > 1 && rooms.length < 6 ? [...rooms, ...rooms] : rooms;

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi || rooms.length <= 1 || isHovered) return;
    const timer = setInterval(() => {
      emblaApi.scrollNext();
    }, 4500);
    return () => clearInterval(timer);
  }, [emblaApi, rooms.length, isHovered]);

  if (!data || rooms.length === 0) return null;

  const activeDotIndex = selectedIndex % rooms.length;

  return (
    <section
      id="rooms"
      className="w-full overflow-hidden bg-[var(--color-bg-soft)] py-8 lg:py-14"
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 lg:px-8">
        {/* Section Header + Carousel Controls */}
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between lg:mb-10">
          <div>
            <span className="text-xs font-semibold tracking-[0.22em] text-[var(--color-accent)] uppercase">
              {data.eyebrow}
            </span>
            <h2 className="font-serif-title mt-3 text-3xl font-medium leading-tight text-[var(--color-heading)] sm:text-4xl lg:text-[44px]">
              {data.title}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label={data.prevAriaLabel}
              className="inline-flex h-11 w-11 items-center justify-center border border-[var(--color-border)] bg-[var(--color-bg-main)] text-[var(--color-heading)] transition-colors hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white"
            >
              <FaArrowLeft className="text-xs" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label={data.nextAriaLabel}
              className="inline-flex h-11 w-11 items-center justify-center border border-[var(--color-border)] bg-[var(--color-bg-main)] text-[var(--color-heading)] transition-colors hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white"
            >
              <FaArrowRight className="text-xs" />
            </button>
            <Link
              href={data.viewAllUrl}
              className="ml-2 inline-flex items-center gap-2 border border-[var(--color-primary)] px-5 py-2.5 text-xs font-semibold tracking-[0.14em] text-[var(--color-primary)] uppercase transition-colors hover:bg-[var(--color-primary)] hover:text-white"
            >
              {data.viewAllLabel}
            </Link>
          </div>
        </div>

        {/* Embla Carousel */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="overflow-hidden"
          ref={emblaRef}
        >
          <div className="-ml-6 flex">
            {carouselRooms.map((room, idx) => (
              <div
                key={`${room.id}-${idx}`}
                className="min-w-0 flex-[0_0_100%] pl-6 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
              >
                <article className="flex h-full flex-col border border-[var(--color-border)] bg-[var(--color-card)] transition-shadow duration-300 hover:shadow-[0_18px_40px_var(--color-shadow)]">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-bg-soft)]">
                    <Image
                      src={room.image}
                      alt={room.imageAlt}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <h3 className="font-serif-title text-2xl font-medium text-[var(--color-heading)]">
                        {room.title}
                      </h3>
                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-2 border-t border-[var(--color-border)] pt-4 text-xs text-[var(--color-text-muted)]">
                      <span className="flex items-center gap-1.5">
                        <FaExpandArrowsAlt
                          aria-hidden="true"
                          className="text-[var(--color-accent)]"
                        />
                        <span>{room.size}</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FaUserFriends
                          aria-hidden="true"
                          className="text-[var(--color-accent)]"
                        />
                        <span>{room.guests}</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FaBed
                          aria-hidden="true"
                          className="text-[var(--color-accent)]"
                        />
                        <span>{room.bed}</span>
                      </span>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="mt-8 flex items-center justify-center gap-2.5">
          {rooms.map((room, idx) => (
            <button
              key={`${room.id}-dot-${idx}`}
              type="button"
              onClick={() => emblaApi?.scrollTo(idx)}
              aria-label={room.title}
              className={`h-2 transition-all duration-200 ${
                activeDotIndex === idx
                  ? 'w-7 bg-[var(--color-primary)]'
                  : 'w-2 bg-[var(--color-border)] hover:bg-[var(--color-accent)]'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
