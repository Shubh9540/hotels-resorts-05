import rawData from '@/data/templates.json';
import { HotelsResortsTemplateData } from '@/types/templates.types';
import { Hero } from '@/components/sections/Hero';
import { AboutUs } from '@/components/sections/AboutUs';
import { Rooms } from '@/components/sections/Rooms';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { Gallery } from '@/components/sections/Gallery';
import { Testimonials } from '@/components/sections/Testimonials';
import { Faq } from '@/components/sections/Faq';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  const data = rawData as HotelsResortsTemplateData;
  const sections = data.categories.HotelsResorts.sections;

  return (
    <main className="flex min-h-screen w-full min-w-0 flex-col overflow-x-hidden bg-[var(--color-bg-main)]">
      <Hero data={sections.Hero.variants.HotelsResortsHero2} />
      <AboutUs data={sections.AboutUs.variants.HotelsResortsAboutUs2} />
      <Rooms data={sections.Rooms.variants.HotelsResortsRooms2} />
      <WhyChooseUs data={sections.WhyChooseUs.variants.HotelsResortsWhyChooseUs2} />
      <Gallery data={sections.Gallery.variants.HotelsResortsGallery2} />
      <Testimonials data={sections.Testimonials.variants.HotelsResortsTestimonials2} />
      <Faq data={sections.Faq.variants.HotelsResortsFaq2} />
      <Contact data={sections.Contact.variants.HotelsResortsContact2} />
    </main>
  );
}
