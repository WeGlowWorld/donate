export enum UserRole {
  USER = 'USER',
  MANAGER = 'MANAGER',
  ADMIN = 'ADMIN',
  SUPER = 'SUPER',
  DATA = 'DATA',
}

export enum Currency {
  EUR = '€',
  GBP = '£',
  USD = '$',
  RON = 'LEI',
}

export enum PaymentMethod {
  WORLDLINE = 'WORLDLINE',
  PAY_NL = 'PAY_NL',
  PAYCONIQ = 'PAYCONIQ',
  STRIPE = 'STRIPE',
}

export enum Locale {
  NL_BE = 'nl-BE',
  EN_US = 'en-US',
  FR_FR = 'fr-FR',
}

export enum LocaleUnderscore {
  NL_BE = 'nl_BE',
  EN_US = 'en_US',
  FR_FR = 'fr_FR',
}

export function mapLocaleToUnderscore(locale: Locale): LocaleUnderscore {
  const key = Object.keys(Locale).find(k => Locale[k as keyof typeof Locale] === locale);
  if (!key) {
    throw new Error(`No corresponding LocaleUnderscore found for Locale: ${locale}`);
  }
  return LocaleUnderscore[key as keyof typeof LocaleUnderscore];
}

export enum OrgCategory {
  HEALTH = 'HEALTH',
  ENVIRONMENT_ANIMAL = 'ENVIRONMENT_ANIMAL',
  HUMANITARIAN_AID = 'HUMANITARIAN_AID',
}

export enum SubscriptionPlan {
  BASIC = 'BASIC',
  PRO = 'PRO',
  PREMIUM = 'PREMIUM',
  CUSTOM = 'CUSTOM',
}

export enum SubscriptionStatus {
  NOT_PAID = 'NOT_PAID',
  PAID = 'PAID',
}

export enum CampaignCategory {
  CELEBRATION = 'CELEBRATION',
  SPORTS = 'SPORTS',
  IN_MEMORY = 'IN_MEMORY',
  EVENT = 'EVENT',
  OTHER = 'OTHER',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
}

export enum OrderPaymentType {
  CC = 'creditcard',
  DD = 'directdebit',
}

export enum CertificateStatus {
  PENDING = 'PENDING',
  DELIVERED = 'DELIVERED',
}

export enum Template {
  BASIC_MODERN = 'BASIC_MODERN',
  BASIC_CLASSIC = 'BASIC_CLASSIC',
  CHRISTMAS_TREE = 'CHRISTMAS_TREE',
  CHRISTMAS_GIFTS = 'CHRISTMAS_GIFTS',
  CHRISTMAS_STARS = 'CHRISTMAS_STARS',
  EASTER_FIELD = 'EASTER_FIELD',
}

export enum VarRefType {
  ORG = 'o',
  CAMPAIGN = 'c',
  PRICE = 'p',
  BASE = 'b',
}
export enum VarType {
  IMAGE = 'i',
  TRANSLATION = 't',
  COLOR = 'c',
}

export type LimitOffset = {
  limit: number;
  offset: number;
};
