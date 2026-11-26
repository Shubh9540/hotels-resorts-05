export interface LinkItem {
  id: string;
  label: string;
  url: string;
}

export interface HeaderData {
  logo: string;
  logoAlt: string;
  phone: string;
  email: string;
  address: string;
  leftNavLinks: LinkItem[];
  rightNavLinks: LinkItem[];
  contactButton: LinkItem;
  openMenuLabel: string;
  closeMenuLabel: string;
}

export interface HeaderProps {
  data?: HeaderData;
}

export interface HeroGalleryImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

export interface HeroData {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaUrl: string;
  secondaryCtaLabel: string;
  secondaryCtaUrl: string;
  images: HeroGalleryImage[];
}

export interface HeroProps {
  data?: HeroData;
}

export interface AboutFeatureItem {
  id: string;
  label: string;
  detail: string;
}

export interface AboutUsData {
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  descriptionLeft: string;
  descriptionRight: string;
  image: string;
  imageAlt: string;
  statNumber: string;
  statLabel: string;
  features: AboutFeatureItem[];
}

export interface AboutUsProps {
  data?: AboutUsData;
}

export interface RoomItem {
  id: string;
  title: string;
  size: string;
  guests: string;
  bed: string;
  image: string;
  imageAlt: string;
}

export interface RoomsData {
  eyebrow: string;
  title: string;
  viewAllLabel: string;
  viewAllUrl: string;
  prevAriaLabel: string;
  nextAriaLabel: string;
  rooms: RoomItem[];
}

export interface RoomsProps {
  data?: RoomsData;
}

export interface WhyChooseUsItem {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: 'accommodation' | 'dining' | 'wifi' | 'wellness' | 'service' | 'pool';
}

export interface WhyChooseUsData {
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  primaryImage: string;
  primaryImageAlt: string;
  secondaryImage: string;
  secondaryImageAlt: string;
  items: WhyChooseUsItem[];
}

export interface WhyChooseUsProps {
  data?: WhyChooseUsData;
}

export interface GalleryImageItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

export interface GalleryData {
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  description: string;
  prevAriaLabel: string;
  nextAriaLabel: string;
  closeAriaLabel: string;
  images: GalleryImageItem[];
}

export interface GalleryProps {
  data?: GalleryData;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  image: string;
  imageAlt: string;
}

export interface TestimonialsData {
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  prevAriaLabel: string;
  nextAriaLabel: string;
  items: TestimonialItem[];
}

export interface TestimonialsProps {
  data?: TestimonialsData;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqData {
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  captionTitle: string;
  captionSubtitle: string;
  items: FaqItem[];
}

export interface FaqProps {
  data?: FaqData;
}

export interface ContactInfoItem {
  id: string;
  label: string;
  value: string;
  icon: 'location' | 'phone' | 'email' | 'hours';
  href?: string;
}

export interface ContactData {
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  subtitle: string;
  panelTitle: string;
  panelDescription: string;
  infoItems: ContactInfoItem[];
  formTitle: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  phonePlaceholder: string;
  messagePlaceholder: string;
  submitLabel: string;
  successMessage: string;
}

export interface ContactProps {
  data?: ContactData;
}

export interface SocialLink extends LinkItem {
  icon: string;
  ariaLabel: string;
}

export interface FooterData {
  logo: string;
  logoAlt: string;
  description: string;
  quickLinksTitle: string;
  quickLinks: LinkItem[];
  usefulLinksTitle: string;
  usefulLinks: LinkItem[];
  contactTitle: string;
  address: string;
  phone: string;
  email: string;
  copyrightText: string;
  socialLinks: SocialLink[];
}

export interface FooterProps {
  data?: FooterData;
}

export interface SiteTheme {
  fontFamily: string;
}

export interface HotelsResortsSections {
  Header: {
    variants: {
      HotelsResortsHeader2: HeaderData;
    };
  };
  Hero: {
    variants: {
      HotelsResortsHero2: HeroData;
    };
  };
  AboutUs: {
    variants: {
      HotelsResortsAboutUs2: AboutUsData;
    };
  };
  Rooms: {
    variants: {
      HotelsResortsRooms2: RoomsData;
    };
  };
  WhyChooseUs: {
    variants: {
      HotelsResortsWhyChooseUs2: WhyChooseUsData;
    };
  };
  Gallery: {
    variants: {
      HotelsResortsGallery2: GalleryData;
    };
  };
  Testimonials: {
    variants: {
      HotelsResortsTestimonials2: TestimonialsData;
    };
  };
  Faq: {
    variants: {
      HotelsResortsFaq2: FaqData;
    };
  };
  Contact: {
    variants: {
      HotelsResortsContact2: ContactData;
    };
  };
}

export interface PageComponentItem {
  key: string;
  component: string;
}

export interface HotelsResortsTemplateData {
  common: {
    theme: SiteTheme;
    Footer: FooterData;
  };
  categories: {
    HotelsResorts: {
      sections: HotelsResortsSections;
    };
  };
  pages: {
    home: {
      components: PageComponentItem[];
    };
  };
}
