'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight, FaBars, FaTimes } from 'react-icons/fa';
import { HeaderProps, LinkItem } from '@/types/templates.types';

export const Header = ({ data }: HeaderProps) => {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  const navLinks: LinkItem[] = data
    ? [...data.leftNavLinks, ...data.rightNavLinks]
    : [];

  useEffect(() => {
    if (!data) return;

    const sectionIds = [...data.leftNavLinks, ...data.rightNavLinks]
      .map((link) => link.url.split('#')[1])
      .filter(Boolean);

    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      const marker =
        window.scrollY + Math.min(window.innerHeight * 0.35, 300) + 88;
      let currentId = sectionIds[0] ?? 'hero';

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= marker) {
          currentId = id;
        }
      });

      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 5
      ) {
        currentId = sectionIds[sectionIds.length - 1] ?? currentId;
      }

      setActiveId(currentId);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [data]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    url: string
  ) => {
    const hash = url.split('#')[1];
    if (!hash) return;

    const target = document.getElementById(hash);
    if (target) {
      e.preventDefault();
      const headerOffset = 84;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      window.history.pushState(null, '', `#${hash}`);
      setActiveId(hash);
      setOpen(false);
    }
  };

  if (!data) return null;

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-white/95 backdrop-blur-md transition-shadow duration-200 ${
        scrolled ? 'shadow-md' : 'shadow-none'
      }`}
    >
      <div className="mx-auto flex h-[80px] w-full max-w-[1280px] items-center justify-between gap-4 px-4 lg:h-[90px] lg:px-8">
        {/* Left: Horizontal Brand Logo */}
        <Link
          href="/#hero"
          onClick={(e) => handleNavClick(e, '/#hero')}
          aria-label={data.logoAlt}
          className="flex shrink-0 items-center"
        >
          <Image
            src={data.logo}
            alt={data.logoAlt}
            width={340}
            height={84}
            priority
            unoptimized
            className="h-14 w-auto object-contain sm:h-16 lg:h-[72px]"
          />
        </Link>

        {/* Center/Right: Modern Horizontal Navigation */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-8 xl:gap-11 lg:flex"
        >
          {navLinks.map((link) => {
            const hash = link.url.split('#')[1] ?? '';
            const isActive = activeId === hash;

            return (
              <Link
                key={link.id}
                href={link.url}
                onClick={(e) => handleNavClick(e, link.url)}
                className={`relative py-2 text-[15px] font-semibold transition-colors duration-200 ${
                  isActive
                    ? 'text-[var(--color-primary)]'
                    : 'text-[var(--color-heading)] hover:text-[var(--color-primary)]'
                }`}
              >
                <span>{link.label}</span>
                <span
                  aria-hidden="true"
                  className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-[var(--color-accent)] transition-transform duration-200 origin-center ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right: Primary CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href={data.contactButton.url}
            onClick={(e) => handleNavClick(e, data.contactButton.url)}
            className="hidden items-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-2.5 text-[15px] font-semibold text-white shadow-sm transition-colors hover:bg-[var(--color-primary-hover)] sm:inline-flex"
          >
            <span>{data.contactButton.label}</span>
            <FaArrowRight aria-hidden="true" className="text-xs" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? data.closeMenuLabel : data.openMenuLabel}
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-heading)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] lg:hidden"
          >
            {open ? <FaTimes className="text-base" /> : <FaBars className="text-base" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="border-t border-[var(--color-border)] bg-white px-4 py-4 shadow-lg lg:hidden">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const hash = link.url.split('#')[1] ?? '';
              const isActive = activeId === hash;
              return (
                <Link
                  key={link.id}
                  href={link.url}
                  onClick={(e) => handleNavClick(e, link.url)}
                  className={`border-b border-[var(--color-border)] py-3 text-base font-semibold transition-colors ${
                    isActive
                      ? 'text-[var(--color-primary)]'
                      : 'text-[var(--color-heading)] hover:text-[var(--color-primary)]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href={data.contactButton.url}
              onClick={(e) => handleNavClick(e, data.contactButton.url)}
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white"
            >
              <span>{data.contactButton.label}</span>
              <FaArrowRight aria-hidden="true" className="text-xs" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
