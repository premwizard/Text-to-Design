import { z } from 'zod';

export const HeroPropsSchema = z.object({
  title: z.string().default('Build faster with dynamic layouts'),
  subtitle: z.string().default('Enter a prompt and render sections immediately.'),
  cta: z.string().optional(),
  ctaSecondary: z.string().optional(),
  ctaUrl: z.string().optional(),
  ctaSecondaryUrl: z.string().optional()
});
