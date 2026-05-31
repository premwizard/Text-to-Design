import { z } from 'zod';

export const NavbarPropsSchema = z.object({
  logo: z.string().default('UI Studio'),
  links: z.array(
    z.union([
      z.string(),
      z.object({
        label: z.string(),
        url: z.string().optional()
      })
    ])
  ).default([]),
  actionLabel: z.string().optional(),
  actionUrl: z.string().optional()
});
