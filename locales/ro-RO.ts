import type { Translations } from '.';

const t: Translations = {
  campaign: {
    donate: 'Donează',
    extra: 'Informații suplimentare...',
  },
  share: {
    title: 'Distribuie',
    nonProfit: 'Organizația noastră non-profit',
    toWebsite: 'Înapoi la pagină',
    toHub: 'Vezi toate campaniile noastre',
    shareTo: 'Distribuie pe',
    copyLink: 'Copiază linkul paginii',
    toDonate: 'Donează',
  },
  footer: {
    madePossibleBy: 'Realizat cu sprijinul',
    tac: 'Termeni și condiții',
    pp: 'Politica de confidențialitate',
  },
  donate: {
    title: 'Donează',
    next: 'Următorul',
    donation: 'Donație',
    submit: 'Donează',
    send: 'Trimite',
    chooseAmount: 'Alege o sumă',
    fiscal: 'Pentru o donație de 40 € sau mai mult primești (în Belgia) un certificat fiscal. Astfel, pentru o donație de 50 €, primești înapoi nu mai puțin de 22,50 € de la stat.',
    raised: 'strâns',
    canvasTitle: 'Îți mulțumim pentru donație',
    address: 'Adresă',
    phone: 'Telefon',
    email: 'E-mail',
    vatNr: 'Număr TVA',
    donationTo: 'Donează pentru',
    stripePublishKey: 'Această apelare API nu poate fi efectuată cu o cheie API publicabilă. Te rugăm să folosești o cheie API secretă.',
  },
  messages: {
    noMessages: 'Niciun mesaj',
    title: 'Mesaje',
  },
  thanks: {
    toFiscal: 'Completează pentru certificatul fiscal',
    toPage: 'Înapoi',
    download: 'Descarcă imaginea',
    share: 'Distribuie această imagine',
    title: 'Îți mulțumim pentru donație!',
    fiscalTitle: 'Lasă-ți datele fiscale!',
    fiscalDescription: 'Pentru o donație de 40 € sau mai mult vei primi (în Belgia) un certificat fiscal. Completează datele tale prin linkul de mai jos pentru a primi certificatul.',
    shareTitle: 'Ne ajuți să facem cunoscută această campanie?',
    shareDescription: 'Distribuind această acțiune pe rețelele sociale de mai jos, ne ajuți să facem cunoscută campania. Astfel putem ajunge la și mai mulți oameni și să avem un impact mai mare în atingerea obiectivelor noastre.',
    shareImageLg: 'Nu uita să distribui și imaginea din stânga! Postând-o în story-ul tău, îi încurajezi și pe prietenii tăi să doneze. Cu cât ajungem la mai mulți oameni, cu atât mai bine!',
    shareImageSm: 'Nu uita să distribui și imaginea de mai jos! Postând-o în story-ul tău, îi încurajezi și pe prietenii tăi să doneze. Cu cât ajungem la mai mulți oameni, cu atât mai bine!',
  },
  fiscal: {
    personalFields: 'Date personale',
    locationFields: 'Locație',
    companyFields: 'Date companie',
    fiscalSuccess: 'Certificatul fiscal a fost trimis cu succes!',
    fiscalError: 'A apărut o eroare la trimiterea certificatului fiscal.',
    alreadyCreated: 'Ai creat deja un certificat fiscal.',
    orderNotFound: 'Comanda nu a fost găsită.',
  },
  fields: {
    company: {
      name: 'Donează ca firmă',
      errors: {},
    },
    amount: {
      name: 'Sumă',
      errors: {
        required: 'Suma este obligatorie',
      },
    },
    name: {
      name: 'Nume',
      errors: {
        required: 'Numele este obligatoriu',
      },
    },
    description: {
      name: 'Mesaj',
      errors: {
        required: 'Mesajul este obligatoriu',
      },
    },
    coords: {
      name: 'Locație',
      errors: {
        required: 'Locația este obligatorie',
      },
    },
    email: {
      name: 'E-mail',
      errors: {
        required: 'E-mailul este obligatoriu',
        email: 'Adresă de e-mail invalidă',
        regex: 'Adresă de e-mail invalidă',
        invalid: 'Adresă de e-mail invalidă',
      },
    },
    firstName: {
      name: 'Prenume',
      errors: {
        required: 'Prenumele este obligatoriu',
      },
    },
    lastName: {
      name: 'Nume de familie',
      errors: {
        required: 'Numele de familie este obligatoriu',
      },
    },
    remark: {
      name: 'Observație',
      errors: {},
    },
    street: {
      name: 'Stradă',
      errors: {
        required: 'Strada este obligatorie',
      },
    },
    houseNumber: {
      name: 'Număr',
      errors: {
        required: 'Numărul este obligatoriu',
      },
    },
    houseNumberSuffix: {
      name: 'Sufix',
      errors: {
        required: 'Sufixul este obligatoriu',
      },
    },
    town: {
      name: 'Oraș',
      errors: {
        required: 'Localitatea este obligatorie',
      },
    },
    postalCode: {
      name: 'Cod poștal',
      errors: {
        required: 'Codul poștal este obligatoriu',
      },
    },
    anonymous: {
      name: 'Donează anonim',
      errors: {},
    },
    nationalNr: {
      name: 'Număr de identificare național',
      errors: {
        required: 'Numărul de identificare național este obligatoriu',
      },
    },
    gender: {
      name: 'Gen',
      errors: {
        required: 'Genul este obligatoriu',
      },
    },
    country: {
      name: 'Țară',
      errors: {
        required: 'Țara este obligatorie',
      },
    },
    locality: {
      name: 'Localitate',
      errors: {
        required: 'Localitatea este obligatorie',
      },
    },
    streetNr: {
      name: 'Stradă și număr',
      errors: {
        required: 'Strada și numărul sunt obligatorii',
      },
    },
    premise: {
      name: 'Apartament',
      errors: {
        required: 'Apartamentul este obligatoriu',
      },
    },
    companyName: {
      name: 'Nume companie',
      errors: {
        required: 'Numele companiei este obligatoriu',
      },
    },
    companyNr: {
      name: 'Număr de înregistrare',
      errors: {
        required: 'Numărul de înregistrare este obligatoriu',
      },
    },
    orderNr: {
      name: 'Număr comandă',
      errors: {
        required: 'Numărul comenzii este obligatoriu',
      },
    },
  },
};
export default t;
