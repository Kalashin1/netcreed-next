import { z } from 'zod';

export const BillingFormSchema = {
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  address: z.string(),
  secondaryAddress: z.string().optional(),
  country: z.string().max(3).min(3),
  state: z.string(),
  zip: z.string().max(6).min(6),
} as const;