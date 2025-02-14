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
};

export default {
  ...t,
  fields: {
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
