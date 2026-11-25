'use client';

import { useState } from 'react';
import {
  FaCheckCircle,
  FaClock,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from 'react-icons/fa';
import { ContactInfoItem, ContactProps } from '@/types/templates.types';

const iconMap: Record<ContactInfoItem['icon'], React.ReactNode> = {
  location: <FaMapMarkerAlt className="text-sm" />,
  phone: <FaPhoneAlt className="text-sm" />,
  email: <FaEnvelope className="text-sm" />,
  hours: <FaClock className="text-sm" />,
};

export const Contact = ({ data }: ContactProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!data) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitted(true);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <section
      id="contact"
      className="w-full overflow-hidden bg-[var(--color-bg-soft)] py-8 lg:py-14"
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

        <div className="grid grid-cols-1 border border-[var(--color-border)] bg-[var(--color-card)] lg:grid-cols-12">
          {/* Left Deep Pine Concierge Panel */}
          <div className="flex flex-col justify-between bg-[var(--color-primary)] p-8 text-white sm:p-10 lg:col-span-5">
            <div>
              <h3 className="font-serif-title text-2xl font-medium text-white sm:text-3xl">
                {data.panelTitle}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-emerald-100 opacity-85">
                {data.panelDescription}
              </p>

              <div className="mt-8 space-y-5">
                {data.infoItems.map((item, idx) => (
                  <div
                    key={`${item.id}-${idx}`}
                    className="flex items-start gap-4 border-b border-emerald-800 pb-4 last:border-b-0 last:pb-0"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center border border-emerald-700 bg-[var(--color-primary-dark)] text-[var(--color-accent)]"
                    >
                      {iconMap[item.icon]}
                    </span>
                    <div>
                      <p className="text-xs font-medium tracking-wider text-emerald-200 uppercase opacity-80">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="mt-0.5 block text-sm font-medium text-white transition-opacity hover:opacity-80"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-0.5 text-sm font-medium text-white">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Inquiry Form */}
          <div className="p-8 sm:p-10 lg:col-span-7">
            <h3 className="font-serif-title text-2xl font-medium text-[var(--color-heading)] sm:text-3xl">
              {data.formTitle}
            </h3>

            {submitted && (
              <div className="mt-5 flex items-start gap-3 border border-[var(--color-primary)] bg-[var(--color-primary-soft)] p-4 text-sm text-[var(--color-primary-dark)]">
                <FaCheckCircle
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-base text-[var(--color-primary)]"
                />
                <span>{data.successMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={data.namePlaceholder}
                  aria-label={data.namePlaceholder}
                  className="w-full border border-[var(--color-border)] bg-[var(--color-bg-main)] px-4 py-3 text-sm text-[var(--color-heading)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={data.emailPlaceholder}
                  aria-label={data.emailPlaceholder}
                  className="w-full border border-[var(--color-border)] bg-[var(--color-bg-main)] px-4 py-3 text-sm text-[var(--color-heading)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none"
                />
              </div>

              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={data.phonePlaceholder}
                aria-label={data.phonePlaceholder}
                className="w-full border border-[var(--color-border)] bg-[var(--color-bg-main)] px-4 py-3 text-sm text-[var(--color-heading)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none"
              />

              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={data.messagePlaceholder}
                aria-label={data.messagePlaceholder}
                className="w-full resize-none border border-[var(--color-border)] bg-[var(--color-bg-main)] px-4 py-3 text-sm text-[var(--color-heading)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none"
              />

              <button
                type="submit"
                className="inline-flex items-center justify-center bg-[var(--color-primary)] px-8 py-3.5 text-xs font-semibold tracking-[0.16em] text-white uppercase transition-colors hover:bg-[var(--color-primary-hover)]"
              >
                {data.submitLabel}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
