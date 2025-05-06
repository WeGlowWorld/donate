import { z } from 'zod';
import type { Currency, Locale, OrderStatus, PaymentMethod } from './enums';

export const certificateZod = z.object({
  company: z.boolean(),
  companyName: z.string().nullable(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  nationalNr: z.string().nullable(),
  companyNr: z.string().nullable(),
  country: z.string().length(2, 'length'),
  locality: z.string().nonempty('required'),
  postalCode: z.string().nonempty('required'),
  streetNr: z.string().nonempty('required'),
  premise: z.string().nullable(),
  gender: z.string(),
}).refine(
  data =>
    (data.company && data.companyName && data.companyNr)
    || (!data.company && data.firstName && data.lastName && data.nationalNr),
  {
    message:
      'required',
  },
);
export type CreateCertificateBody = z.infer<typeof certificateZod>;

// donate
export const donateZod = z.object({
  amount: z.number({
    required_error: 'required',
    invalid_type_error: 'required',
  }).lt(9999, 'lte').finite('required'),
  email: z.string().nonempty('required').email('email').max(255, 'max'),
  name: z.string().nonempty('required').max(255),
  description: z.string().nonempty('required').max(255),
  address: z.array(z.number()).length(2, 'required'),
  anonymous: z.boolean(),
});
export const donate2Zod = z.object({
  amount: z.number().lt(9999, 'lte').finite(),
  email: z.string().email('email').max(255, 'max'),
  name: z.string().max(255),
  description: z.string().max(255),
  coords: z.array(z.number()).length(2),
  anonymous: z.boolean(),
});
export type DonateBody = z.infer<typeof donate2Zod>;

// donate
export const donateKbsZod = z.object({
  company: z.boolean(),
  companyName: z.string().nullable(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  nationalNr: z.string().nonempty('required'),
  country: z.string().length(2, 'length'),
  locality: z.string().nonempty('required'),
  postalCode: z.string().nonempty('required'),
  streetNr: z.string().nonempty('required'),
  premise: z.string().nullable(),
  gender: z.string().nonempty('required'),
});
export type DonateKbsBody = z.infer<typeof donateKbsZod>;

export type ThankYouDonation = {
  status: OrderStatus;
  method: PaymentMethod;
  amount: number;
  name: string;
  description: string;
  currency: Currency;
  locale: Locale;
};
