'use client';

import Image from 'next/image';
import {
  FaBed,
  FaConciergeBell,
  FaSpa,
  FaSwimmingPool,
  FaUtensils,
  FaWifi,
} from 'react-icons/fa';
import { WhyChooseUsItem, WhyChooseUsProps } from '@/types/templates.types';

const iconMap: Record<WhyChooseUsItem['icon'], React.ReactNode> = {
  accommodation: <FaBed className="text-base" />,
  dining: <FaUtensils className="text-base" />,
  wellness: <FaSpa className="text-base" />,
  pool: <FaSwimmingPool className="text-base" />,
  service: <FaConciergeBell className="text-base" />,
  wifi: <FaWifi className="text-base" />,
};

export const WhyChooseUs = ({ data }: WhyChooseUsProps) => {
  if (!data) return null;

  return (
    <section
      id="why-choose-us"
      className="w-full overflow-hidden bg-[var(--color-bg-main)] py-8 lg:py-14"
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left Dual Architectural Photo Collage */}
          <div className="lg:col-span-5">
            <div className="mb-8 lg:mb-10">
              <span className="text-xs font-semibold tracking-[0.22em] text-[var(--color-accent)] uppercase">
                {data.eyebrow}
              </span>
              <h2 className="font-serif-title mt-3 text-3xl font-medium leading-tight text-[var(--color-heading)] sm:text-4xl lg:text-[42px]">
                {data.titleStart}{' '}
                <span className="text-[var(--color-primary)]">
                  {data.titleAccent}
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-7">
                <div className="relative aspect-[3/4] w-full overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-soft)]">
                  <Image
                    src={data.primaryImage}
                    alt={data.primaryImageAlt}
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 60vw, 28vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="col-span-5 pt-10">
                <div className="relative aspect-[3/4] w-full overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-soft)]">
                  <Image
                    src={data.secondaryImage}
                    alt={data.secondaryImageAlt}
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 40vw, 20vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Numbered Hospitality Ledger */}
          <div className="lg:col-span-7">
            <div className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
              {data.items.map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  className="grid grid-cols-1 gap-3 py-5 sm:grid-cols-12 sm:items-start sm:gap-5"
                >
                  <div className="flex items-center gap-3 sm:col-span-5">
                    <span className="font-serif-title text-lg font-semibold text-[var(--color-accent)]">
                      {item.number}
                    </span>
                    <span
                      aria-hidden="true"
                      className="inline-flex h-8 w-8 shrink-0 items-center justify-center border border-[var(--color-border)] bg-[var(--color-primary-soft)] text-[var(--color-primary)]"
                    >
                      {iconMap[item.icon]}
                    </span>
                    <h3 className="text-base font-semibold text-[var(--color-heading)]">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-sm leading-relaxed text-[var(--color-text)] sm:col-span-7">
                    {item.description}
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
