'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  FaChevronRight,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from 'react-icons/fa';
import { FooterProps } from '@/types/templates.types';

export const Footer = ({ data }: FooterProps) => {
  if (!data) return null;

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    url: string
  ) => {
    const hash = url.split('#')[1];
    if (!hash) return;

    const target = document.getElementById(hash);
    if (target) {
      e.preventDefault();
      const headerOffset = 88;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      window.history.pushState(null, '', `#${hash}`);
    }
  };

  return (
    <footer className="w-full overflow-hidden bg-[var(--color-primary-deep)] text-white">
      <div className="mx-auto max-w-[1280px] px-4 pb-8 pt-12 lg:px-8 lg:pt-14">
        <div className="grid grid-cols-1 items-start gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Column 1: Logo & Brand Summary */}
          <div className="flex flex-col items-start lg:col-span-4">
            <Link
              href="/#hero"
              onClick={(e) => handleScroll(e, '/#hero')}
              className="inline-flex items-center"
            >
              <Image
                src={data.logo}
                alt={data.logoAlt}
                width={340}
                height={84}
                unoptimized
                className="h-16 w-auto object-contain sm:h-[72px]"
              />
            </Link>
            <p className="mt-5 max-w-[310px] text-sm leading-relaxed text-emerald-100 opacity-80">
              {data.description}
            </p>
          </div>

          {/* Column 2: Explore */}
          <div className="lg:col-span-2">
            <h4 className="font-serif-title text-xl font-medium text-white">
              {data.quickLinksTitle}
            </h4>
            <div className="mb-5 mt-2 h-[2px] w-10 bg-[var(--color-accent)]" />
            <ul className="space-y-3 text-sm">
              {data.quickLinks.map((link, idx) => (
                <li key={`${link.id}-${idx}`}>
                  <Link
                    href={link.url}
                    onClick={(e) => handleScroll(e, link.url)}
                    className="group inline-flex items-center gap-2 text-emerald-100 opacity-80 transition-opacity hover:opacity-100"
                  >
                    <FaChevronRight
                      aria-hidden="true"
                      className="text-[10px] text-[var(--color-accent)] transition-transform group-hover:translate-x-0.5"
                    />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Guest Info */}
          <div className="lg:col-span-3">
            <h4 className="font-serif-title text-xl font-medium text-white">
              {data.usefulLinksTitle}
            </h4>
            <div className="mb-5 mt-2 h-[2px] w-10 bg-[var(--color-accent)]" />
            <ul className="space-y-3 text-sm">
              {data.usefulLinks.map((link, idx) => (
                <li key={`${link.id}-${idx}`}>
                  <Link
                    href={link.url}
                    onClick={(e) => handleScroll(e, link.url)}
                    className="group inline-flex items-center gap-2 text-emerald-100 opacity-80 transition-opacity hover:opacity-100"
                  >
                    <FaChevronRight
                      aria-hidden="true"
                      className="text-[10px] text-[var(--color-accent)] transition-transform group-hover:translate-x-0.5"
                    />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="lg:col-span-3">
            <h4 className="font-serif-title text-xl font-medium text-white">
              {data.contactTitle}
            </h4>
            <div className="mb-5 mt-2 h-[2px] w-10 bg-[var(--color-accent)]" />
            <ul className="space-y-4 text-sm text-emerald-100 opacity-85">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-sm text-[var(--color-accent)]"
                />
                <span>{data.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt
                  aria-hidden="true"
                  className="shrink-0 text-sm text-[var(--color-accent)]"
                />
                <a
                  href={`tel:${data.phone.replace(/\s+/g, '')}`}
                  className="transition-colors hover:text-white"
                >
                  {data.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope
                  aria-hidden="true"
                  className="shrink-0 text-sm text-[var(--color-accent)]"
                />
                <a
                  href={`mailto:${data.email}`}
                  className="transition-colors hover:text-white"
                >
                  {data.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-10 border-t border-emerald-900 pt-6 text-center text-xs tracking-wide text-emerald-200 opacity-75">
          {data.copyrightText}
        </div>
      </div>
    </footer>
  );
};
