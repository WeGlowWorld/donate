import type { Translations } from '.';

const t: Translations = {
  campaign: {
    donate: 'Doneer',
  },
  share: {
    title: 'Delen',
    nonProfit: 'Onze non-profit',
    toWebsite: 'Naar de website',
    toHub: 'Naar de hub',
    shareTo: 'Delen op',
    copyLink: 'Kopieer link',
  },
  footer: {
    madePossibleBy: 'Mogelijk gemaakt door',
    tac: 'Gebruiksvoorwaarden',
    pp: 'Privacybeleid',
  },
  donate: {
    title: 'Doneer',
    next: 'Volgende',
    donation: 'Donatie',
    submit: 'Doneer',
  },
  messages: {
    noMessages: 'Geen berichten',
    title: 'Berichten',
  },
  thanks: {
    toFiscal: 'Naar de fiscale pagina',
    toPage: 'Naar de pagina',
  },
};

export default {
  ...t,
  fields: {
    amount: {
      name: 'Bedrag',
      errors: {
        required: 'Bedrag is verplicht',
      },
    },
    name: {
      name: 'Naam',
      errors: {
        required: 'Naam is verplicht',
      },
    },
    description: {
      name: 'Bericht',
      errors: {
        required: 'Bericht is verplicht',
      },
    },
    coords: {
      name: 'Locatie',
      errors: {
        required: 'Locatie is verplicht',
      },
    },
    email: {
      name: 'E-mail',
      errors: {
        required: 'E-mail is verplicht',
        invalid: 'Ongeldig e-mailadres',
      },
    },
    firstName: {
      name: 'Voornaam',
      errors: {
        required: 'Voornaam is verplicht',
      },
    },
    lastName: {
      name: 'Achternaam',
      errors: {
        required: 'Achternaam is verplicht',
      },
    },
    productId: {
      name: 'Gewicht van het pakje',
      errors: {
        required: 'Gewicht van het pakje is verplicht',
      },
    },
    remark: {
      name: 'Opmerking',
    },
    street: {
      name: 'Straat',
      errors: {
        required: 'Straat is verplicht',
      },
    },
    houseNumber: {
      name: 'Huisnummer',
      errors: {
        required: 'Huisnummer is verplicht',
      },
    },
    houseNumberSuffix: {
      name: 'Toevoeging',
      errors: {
        required: 'Toevoeging is verplicht',
      },
    },
    town: {
      name: 'Gemeente',
      errors: {
        required: 'Plaats is verplicht',
      },
    },
    postalCode: {
      name: 'Postcode',
      errors: {
        required: 'Postcode is verplicht',
      },
    },
  },
};
