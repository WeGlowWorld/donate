import type { CampaignCategory, Currency, Locale, Template, VarRefType, VarType } from './enums';

export type Message = {
  name: string;
  amount: number;
  description: string;
  date: string;
};

export type Coord = [number, number];

export type DonationContent = {
  messages: Message[];
  coords: {
    coords: Coord;
    amount?: number;
    name?: string;
    description?: string;
  }[];
};

export type Content = {
  org: OrgContent;
  base: BaseContent;
  campaign: CampaignContent;
  prices: PriceContent[];
  variables: VariableContent[];
};

type OrgContent = {
  id: string;
  slug: string;
  email: string;
  currencySign: Currency;
  currency: string;
  phoneNr: string;
  country: string;
  website?: string;
  superAdmin?: string;
  locales: Locale[];
};

type BaseContent = {
  id: string;
  certificates: boolean;
  anonymous: boolean;
  template: Template;
  map: [number, number, number];
};

type CampaignContent = {
  id: string;
  ptp: boolean;
  parentSlug: string;
  slug: string;
  goal?: number;
  category?: CampaignCategory;
  raised: {
    sum: number;
    count: number;
  };
  specialForm: string | undefined;
};

type PriceContent = {
  id: string;
  amount: number;
  selected: boolean;
  image?: string;
};

export type VariableContent = {
  refId: string;
  refType: VarRefType;
  type: VarType;
  title: string;
  locale?: Locale;
  value: string;
};

export type ContentOrg = {
  variables: VariableContent[];
  general: {
    id: string;
    approvePtp: boolean;
    country: string;
    email: string;
    currency: Currency;
    locales: Locale[];
    phoneNr: string;
    slug: string;
    ogm?: string;
    website?: string;
    superAdmin?: string;
  };
  brandIdentity?: {
    primaryC: string;
    primaryTC: string;
    accentC: string;
    accentTC: string;
    backgroundC: string;
    backgroundTC: string;
  };
  billing?: {
    address: string;
    phone: string;
    email: string;
    vatNr: string;
  };
};
