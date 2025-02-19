export type Translations = {
  campaign: {
    donate: string;
  };
  share: {
    title: string;
    nonProfit: string;
    toWebsite: string;
    toHub: string;
    shareTo: string;
    copyLink: string;
  };
  donate: {
    title: string;
    next: string;
    donation: string;
    submit: string;
    chooseAmount: string;
  };
  messages: {
    title: string;
    noMessages: string;
  };
  footer: {
    madePossibleBy: string;
    tac: string;
    pp: string;
  };
  thanks: {
    toFiscal: string;
    toPage: string;
  };
  fiscal: {
    personalFields: string;
    locationFields: string;
    companyFields: string;
  };
  fields: Record<string, {
    name: string;
    errors: Record<string, string>;
  }>;
};
