import { z } from 'zod';

export const AllowedTypes = [
  'hero',
  'navbar',
  'features',
  'pricing',
  'testimonials',
  'faq',
  'cta',
  'footer',
  'cards',
  'stats',
  'form'
];

export const ActionSchema = z.object({
  type: z.enum(['navigate', 'open-modal', 'submit-form']),
  target: z.string().optional(),
  label: z.string().optional()
});

export const ImageSchema = z.object({
  url: z.string().url().or(z.string()),
  alt: z.string().optional()
});

export const StyleSchema = z.object({
  theme: z.enum(['light', 'dark', 'modern saas', 'minimal', 'glassmorphism']).default('dark'),
  align: z.enum(['left', 'center', 'right']).default('center'),
  padding: z.enum(['small', 'medium', 'large']).default('medium')
}).default({});

export const LayoutSchema = z.object({
  desktop: z.string().optional(),
  tablet: z.string().optional(),
  mobile: z.string().optional()
}).optional();

export const AnimationSchema = z.object({
  type: z.enum(['fade-up', 'fade-in', 'slide-right', 'zoom-in']).optional(),
  duration: z.number().optional()
}).optional();

// Base component fields
export const BaseComponentSchema = z.object({
  id: z.string().optional(),
  type: z.enum(AllowedTypes),
  variant: z.string().optional(),
  style: StyleSchema.optional().default({}),
  layout: LayoutSchema.optional(),
  animation: AnimationSchema.optional(),
  content: z.record(z.any()).optional(),
  props: z.record(z.any()).optional(),
  children: z.array(z.any()).optional()
});

export const PageDesignSchema = z.object({
  primaryColor: z.string().default('#3b82f6'),
  secondaryColor: z.string().default('#0f172a'),
  borderRadius: z.enum(['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full']).default('lg'),
  font: z.string().default('Inter')
}).default({});

// Specific component schemas
export const PricingPropsSchema = z.object({
  plans: z.array(
    z.object({
      title: z.string().default('Plan'),
      price: z.string().default('$0'),
      period: z.string().default('month'),
      description: z.string().optional(),
      features: z.array(z.string()).default([]),
      buttonLabel: z.string().default('Choose Plan'),
      buttonUrl: z.string().optional()
    })
  ).default([])
});

export const TestimonialsPropsSchema = z.object({
  testimonials: z.array(
    z.object({
      name: z.string().default('User Name'),
      role: z.string().optional(),
      quote: z.string().default('Feedback message.')
    })
  ).default([])
});

export const FaqPropsSchema = z.object({
  items: z.array(
    z.object({
      question: z.string().default('Question?'),
      answer: z.string().default('Answer text.')
    })
  ).default([])
});

export const CtaPropsSchema = z.object({
  title: z.string().default('Ready to get started?'),
  subtitle: z.string().optional(),
  buttonLabel: z.string().optional(),
  buttonUrl: z.string().optional(),
  secondaryButtonLabel: z.string().optional(),
  secondaryButtonUrl: z.string().optional()
});

export const FooterPropsSchema = z.object({
  copyright: z.string().default('© 2026 MyApp'),
  links: z.array(
    z.union([
      z.string(),
      z.object({
        label: z.string(),
        url: z.string().optional()
      })
    ])
  ).default([])
});

export const CardsPropsSchema = z.object({
  items: z.array(
    z.object({
      title: z.string().default('Card Title'),
      description: z.string().default('Card body description.'),
      button: z.string().optional(),
      buttonUrl: z.string().optional(),
      icon: z.string().optional()
    })
  ).default([])
});

export const StatsPropsSchema = z.object({
  stats: z.array(
    z.object({
      label: z.string().default('Metric'),
      value: z.string().default('0')
    })
  ).default([])
});

export const FormPropsSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  fields: z.array(
    z.union([
      z.string(),
      z.object({
        name: z.string(),
        label: z.string().optional(),
        placeholder: z.string().optional(),
        type: z.string().default('text')
      })
    ])
  ).default([]),
  button: z.string().optional()
});

export const PageSchema = z.object({
  page: z.string().optional().default('landing'),
  design: PageDesignSchema.optional(),
  designSystem: z.record(z.any()).optional(),
  layoutStrategy: z.record(z.any()).optional(),
  components: z.array(z.any())
});
