export type Translations = {
  campaign: {
    donate: string;
    extra: string;
  };
  share: {
    title: string;
    nonProfit: string;
    toDonate: string;
    toWebsite: string;
    toHub: string;
    shareTo: string;
    copyLink: string;
  };
  donate: {
    title: string;
    next: string;
    donation: string;
    donationTo: string;
    submit: string;
    send: string;
    chooseAmount: string;
    fiscal: string;
    raised: string;
    canvasTitle: string;
    address: string;
    phone: string;
    email: string;
    vatNr: string;
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
    download: string;
    share: string;
    title: string;
    fiscalTitle: string;
    fiscalDescription: string;
    shareTitle: string;
    shareDescription: string;
    shareImageLg: string;
    shareImageSm: string;
  };
  fiscal: {
    personalFields: string;
    locationFields: string;
    companyFields: string;
    fiscalSuccess: string;
    fiscalError: string;
    alreadyCreated: string;
    orderNotFound: string;
  };
  fields: Record<string, {
    name: string;
    errors: Record<string, string>;
  }>;
};
