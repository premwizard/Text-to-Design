import React from 'react';
import { NavbarPropsSchema } from '../schemas/navbarSchema';
import { HeroPropsSchema } from '../schemas/heroSchema';
import { FeaturePropsSchema } from '../schemas/featureSchema';
import {
  PricingPropsSchema,
  TestimonialsPropsSchema,
  FaqPropsSchema,
  CtaPropsSchema,
  FooterPropsSchema,
  CardsPropsSchema,
  StatsPropsSchema,
  FormPropsSchema
} from '../schemas/commonSchema';

// Lazy loaded components for optimized bundle sizes
const Navbar = React.lazy(() => import('../components/Navbar'));
const Hero = React.lazy(() => import('../components/Hero'));
const Features = React.lazy(() => import('../components/Features'));
const Pricing = React.lazy(() => import('../components/Pricing'));
const Testimonials = React.lazy(() => import('../components/Testimonials'));
const Faq = React.lazy(() => import('../components/Faq'));
const Cta = React.lazy(() => import('../components/Cta'));
const Footer = React.lazy(() => import('../components/Footer'));
const Cards = React.lazy(() => import('../components/Cards'));
const Stats = React.lazy(() => import('../components/Stats'));
const Form = React.lazy(() => import('../components/Form'));

export const componentRegistry = {
  navbar: {
    name: 'Navbar',
    renderer: Navbar,
    schema: NavbarPropsSchema,
    defaultProps: {
      logo: 'UI Studio',
      links: ['Home', 'Features', 'Pricing', 'FAQ']
    },
    optionalVariants: ['standard', 'sticky', 'minimal', 'modern'],
    variants: {
      standard: React.lazy(() => import('../components/Navbar').then(m => ({ default: m.NavbarStandard }))),
      sticky: React.lazy(() => import('../components/Navbar').then(m => ({ default: m.NavbarSticky }))),
      minimal: React.lazy(() => import('../components/Navbar').then(m => ({ default: m.NavbarMinimal }))),
      modern: React.lazy(() => import('../components/Navbar').then(m => ({ default: m.NavbarSticky })))
    }
  },
  hero: {
    name: 'Hero',
    renderer: Hero,
    schema: HeroPropsSchema,
    defaultProps: {
      title: 'Build your next page with confidence',
      subtitle: 'A complete landing flow powered by a dynamic prompt-driven UI generator.',
      cta: 'Get Started'
    },
    optionalVariants: ['split', 'centered', 'gradient', 'minimal', 'fullscreen', 'split-image'],
    variants: {
      centered: React.lazy(() => import('../components/Hero').then(m => ({ default: m.HeroCentered }))),
      minimal: React.lazy(() => import('../components/Hero').then(m => ({ default: m.HeroMinimal }))),
      fullscreen: React.lazy(() => import('../components/Hero').then(m => ({ default: m.HeroFullscreen }))),
      gradient: React.lazy(() => import('../components/Hero').then(m => ({ default: m.HeroFullscreen }))),
      'split-image': React.lazy(() => import('../components/Hero').then(m => ({ default: m.HeroSplit }))),
      split: React.lazy(() => import('../components/Hero').then(m => ({ default: m.HeroSplit })))
    }
  },
  features: {
    name: 'Features',
    renderer: Features,
    schema: FeaturePropsSchema,
    defaultProps: {
      items: [
        { title: 'Flexible layouts', description: 'Build landing pages, dashboards, and content experiences with the same system.' },
        { title: 'Responsive design', description: 'Every section adapts beautifully to desktop, tablet, and mobile screens.' },
        { title: 'Theme-ready', description: 'Light and dark mode support is built into every component.' }
      ]
    },
    optionalVariants: ['grid', 'list', 'alternating-rows'],
    variants: {
      grid: React.lazy(() => import('../components/Features').then(m => ({ default: m.FeaturesGrid }))),
      list: React.lazy(() => import('../components/Features').then(m => ({ default: m.FeaturesList }))),
      'alternating-rows': React.lazy(() => import('../components/Features').then(m => ({ default: m.FeaturesAlternating }))),
      alternating: React.lazy(() => import('../components/Features').then(m => ({ default: m.FeaturesAlternating })))
    }
  },
  pricing: {
    name: 'Pricing',
    renderer: Pricing,
    schema: PricingPropsSchema,
    defaultProps: {
      plans: [
        { title: 'Starter', price: '$19', period: 'month', description: 'Perfect for small teams.', features: ['3 projects', 'Basic support'], buttonLabel: 'Get started' },
        { title: 'Growth', price: '$49', period: 'month', description: 'For growing teams.', features: ['Unlimited projects', 'Priority support'], buttonLabel: 'Start free trial' }
      ]
    },
    optionalVariants: ['grid', 'highlighted', 'minimal-table'],
    variants: {
      grid: React.lazy(() => import('../components/Pricing').then(m => ({ default: m.PricingCards }))),
      cards: React.lazy(() => import('../components/Pricing').then(m => ({ default: m.PricingCards }))),
      highlighted: React.lazy(() => import('../components/Pricing').then(m => ({ default: m.PricingComparison }))),
      comparison: React.lazy(() => import('../components/Pricing').then(m => ({ default: m.PricingComparison }))),
      'minimal-table': React.lazy(() => import('../components/Pricing').then(m => ({ default: m.PricingMinimalTable }))),
      table: React.lazy(() => import('../components/Pricing').then(m => ({ default: m.PricingMinimalTable })))
    }
  },
  testimonials: {
    name: 'Testimonials',
    renderer: Testimonials,
    schema: TestimonialsPropsSchema,
    defaultProps: {
      testimonials: [
        { name: 'Mia Carter', role: 'Product Lead', quote: 'The UI renderer helped us ship a polished page in hours.' },
        { name: 'Noah Patel', role: 'Founder', quote: 'The theme system feels refreshingly modern and usable.' }
      ]
    },
    optionalVariants: ['grid', 'carousel', 'stacked'],
    variants: {
      grid: React.lazy(() => import('../components/Testimonials').then(m => ({ default: m.TestimonialsGrid }))),
      carousel: React.lazy(() => import('../components/Testimonials').then(m => ({ default: m.TestimonialsCarousel }))),
      stacked: React.lazy(() => import('../components/Testimonials').then(m => ({ default: m.TestimonialsStacked }))),
      rows: React.lazy(() => import('../components/Testimonials').then(m => ({ default: m.TestimonialsStacked })))
    }
  },
  faq: {
    name: 'FAQ',
    renderer: Faq,
    schema: FaqPropsSchema,
    defaultProps: {
      items: [
        { question: 'What is this platform?', answer: 'This is an AI-powered Text-to-Design production rendering platform.' },
        { question: 'Is it responsive?', answer: 'Yes, it adapts perfectly to mobile, tablet, and desktop views.' }
      ]
    },
    optionalVariants: ['accordion', 'list'],
    variants: {
      accordion: React.lazy(() => import('../components/Faq').then(m => ({ default: m.FaqAccordion }))),
      list: React.lazy(() => import('../components/Faq').then(m => ({ default: m.FaqList })))
    }
  },
  cta: {
    name: 'CTA',
    renderer: Cta,
    schema: CtaPropsSchema,
    defaultProps: {
      title: 'Ready to build something amazing?',
      subtitle: 'Instantly generate responsive screens from prompt descriptions.',
      buttonLabel: 'Get Started'
    },
    optionalVariants: ['standard', 'minimal', 'gradient'],
    variants: {
      standard: React.lazy(() => import('../components/Cta').then(m => ({ default: m.CtaStandard }))),
      minimal: React.lazy(() => import('../components/Cta').then(m => ({ default: m.CtaMinimal }))),
      gradient: React.lazy(() => import('../components/Cta').then(m => ({ default: m.CtaGradient })))
    }
  },
  footer: {
    name: 'Footer',
    renderer: Footer,
    schema: FooterPropsSchema,
    defaultProps: {
      copyright: '© 2026 Generated UI Studio',
      links: ['Privacy Policy', 'Terms of Service', 'Contact Us']
    },
    optionalVariants: ['simple', 'detailed', 'centered-logo'],
    variants: {
      simple: React.lazy(() => import('../components/Footer').then(m => ({ default: m.FooterSimple }))),
      detailed: React.lazy(() => import('../components/Footer').then(m => ({ default: m.FooterGridColumns }))),
      'grid-columns': React.lazy(() => import('../components/Footer').then(m => ({ default: m.FooterGridColumns }))),
      'centered-logo': React.lazy(() => import('../components/Footer').then(m => ({ default: m.FooterCenteredLogo }))),
      centered: React.lazy(() => import('../components/Footer').then(m => ({ default: m.FooterCenteredLogo })))
    }
  },
  cards: {
    name: 'Cards',
    renderer: Cards,
    schema: CardsPropsSchema,
    defaultProps: {
      items: [
        { title: 'Card 1', description: 'Description 1' },
        { title: 'Card 2', description: 'Description 2' }
      ]
    },
    optionalVariants: ['grid', 'glass', 'minimal', 'stats', 'masonry'],
    variants: {
      grid: React.lazy(() => import('../components/Cards').then(m => ({ default: m.CardsGrid }))),
      glass: React.lazy(() => import('../components/Cards').then(m => ({ default: m.CardsGlass }))),
      minimal: React.lazy(() => import('../components/Cards').then(m => ({ default: m.CardsMinimal }))),
      stats: React.lazy(() => import('../components/Cards').then(m => ({ default: m.CardsStats }))),
      masonry: React.lazy(() => import('../components/Cards').then(m => ({ default: m.CardsMasonry })))
    }
  },
  stats: {
    name: 'Stats',
    renderer: Stats,
    schema: StatsPropsSchema,
    defaultProps: {
      stats: [
        { label: 'Active Users', value: '10K+' },
        { label: 'Uptime', value: '99.9%' }
      ]
    },
    optionalVariants: ['grid', 'simple'],
    variants: {
      grid: React.lazy(() => import('../components/Stats').then(m => ({ default: m.StatsGrid }))),
      simple: React.lazy(() => import('../components/Stats').then(m => ({ default: m.StatsSimple })))
    }
  },
  form: {
    name: 'Form',
    renderer: Form,
    schema: FormPropsSchema,
    defaultProps: {
      title: 'Get in touch',
      description: 'Fill out the form below and we will contact you shortly.',
      fields: ['Name', 'Email', 'Message'],
      button: 'Submit'
    },
    optionalVariants: ['contact', 'login', 'signup'],
    variants: {
      contact: React.lazy(() => import('../components/Form').then(m => ({ default: m.FormContact }))),
      login: React.lazy(() => import('../components/Form').then(m => ({ default: m.FormLogin }))),
      signup: React.lazy(() => import('../components/Form').then(m => ({ default: m.FormSignup })))
    }
  }
};

/**
 * Resolves a missing or null component variant dynamically based on the design system.
 */
export function resolveVariant(type, designSystem = {}) {
  const themeId = String(designSystem.theme || 'modern').toLowerCase();
  const primaryColor = String(designSystem.colors?.primary || '').toLowerCase();
  
  // Detect design system traits
  const isDark = themeId.includes('dark') || themeId === 'luxury' || designSystem.colors?.background === '#020617';
  const isMinimal = themeId === 'minimal' || designSystem.typography?.font?.includes('Mono') || designSystem.typography?.font?.includes('Inter');
  const isBold = themeId === 'bold' || themeId === 'startup' || primaryColor.includes('gradient') || ['#ef4444', '#f59e0b', '#10b981'].includes(primaryColor);
  
  if (type === 'hero') {
    if (isMinimal) return 'minimal';
    if (isBold) return 'gradient';
    if (isDark) return 'fullscreen';
    return 'centered';
  }
  
  if (type === 'navbar') {
    if (isMinimal) return 'minimal';
    if (isDark) return 'sticky';
    return 'standard';
  }
  
  if (type === 'cards') {
    if (isMinimal) return 'minimal';
    if (isBold) return 'grid';
    if (isDark) return 'glass';
    return 'stats';
  }
  
  if (type === 'features') {
    if (isMinimal) return 'list';
    if (isBold) return 'alternating-rows';
    return 'grid';
  }
  
  if (type === 'pricing') {
    if (isMinimal) return 'minimal-table';
    if (isBold) return 'comparison';
    return 'cards';
  }
  
  if (type === 'testimonials') {
    if (isMinimal) return 'stacked';
    if (isBold) return 'carousel';
    return 'grid';
  }
  
  if (type === 'faq') {
    if (isMinimal) return 'list';
    return 'accordion';
  }
  
  if (type === 'cta') {
    if (isMinimal) return 'minimal';
    if (isBold) return 'gradient';
    return 'standard';
  }
  
  if (type === 'footer') {
    if (isMinimal) return 'simple';
    if (isBold) return 'grid-columns';
    return 'centered-logo';
  }
  
  if (type === 'stats') {
    if (isMinimal) return 'simple';
    return 'grid';
  }
  
  if (type === 'form') {
    if (isMinimal) return 'contact';
    if (isBold) return 'signup';
    return 'login';
  }
  
  return 'standard';
}
