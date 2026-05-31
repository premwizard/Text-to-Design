import { z } from 'zod';

export const FeatureItemSchema = z.object({
  title: z.string().default('Feature Title'),
  description: z.string().default('Feature description.'),
  icon: z.string().optional()
});

export const FeaturePropsSchema = z.object({
  items: z.array(FeatureItemSchema).default([])
});
