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
    send: 'Verstuur',
    chooseAmount: 'Kies zelf een bedrag',
    fiscal: 'Bij een donatie van €40 of meer ontvang je (in België) een fiscaal attest.',
    raised: 'opgehaald',
    canvasTitle: 'Bedankt voor je donatie',
  },
  messages: {
    noMessages: 'Geen berichten',
    title: 'Berichten',
  },
  thanks: {
    toFiscal: 'Naar de fiscale pagina',
    toPage: 'Naar de pagina',
  },
  fiscal: {
    personalFields: 'Persoonlijke gegevens',
    locationFields: 'Locatie',
    companyFields: 'Bedrijfsgegevens',
    fiscalSuccess: 'Uw fiscaal certificaat is succesvol ingediend!',
    fiscalError: 'Er is een fout opgetreden bij het indienen van uw fiscaal certificaat.',
    alreadyCreated: 'U heeft al een fiscaal certificaat aangemaakt.',
    orderNotFound: 'Bestelling niet gevonden.',
  },
  fields: {
    company: {
      name: 'Doneren als bedrijf',
      errors: {},
    },
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
        email: 'Ongeldig e-mailadres',
        regex: 'Ongeldig e-mailadres',
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
      errors: {},
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
    anonymous: {
      name: 'Anoniem doneren',
      errors: {},
    },
    nationalNr: {
      name: 'Rijksregisternummer',
      errors: {
        required: 'Rijksregisternummer is verplicht',
      },
    },
    gender: {
      name: 'Geslacht',
      errors: {
        required: 'Geslacht is verplicht',
      },
    },
    country: {
      name: 'Land',
      errors: {
        required: 'Land is verplicht',
      },
    },
    locality: {
      name: 'Gemeente',
      errors: {
        required: 'Gemeente is verplicht',
      },
    },
    streetNr: {
      name: 'Straat en huisnummer',
      errors: {
        required: 'Straat en huisnummer is verplicht',
      },
    },
    premise: {
      name: 'Bus',
      errors: {
        required: 'Bus is verplicht',
      },
    },
    companyName: {
      name: 'Bedrijfsnaam',
      errors: {
        required: 'Bedrijfsnaam is verplicht',
      },
    },
    companyNr: {
      name: 'Ondernemingsnummer',
      errors: {
        required: 'Ondernemingsnummer is verplicht',
      },
    },
    orderNr: {
      name: 'Bestelnummer',
      errors: {
        required: 'Bestelnummer is verplicht',
      },
    },
  },
};

export default t;
