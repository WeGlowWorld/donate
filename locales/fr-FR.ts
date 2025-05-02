import type { Translations } from '.';

const t: Translations = {
  campaign: {
    donate: 'Donner',
    extra: 'Encore quelques informations....',
  },
  share: {
    title: 'Partager',
    nonProfit: 'Notre ONG',
    toDonate: 'Vers le site web',
    toWebsite: 'Vers notre site web',
    toHub: 'Regarder toutes nos actions',
    shareTo: 'Partager sur',
    copyLink: 'Copier le lien',
  },
  footer: {
    madePossibleBy: 'Rendu possible par',
    tac: 'Conditions d\'utilisation',
    pp: 'Politique de confidentialité',
  },
  donate: {
    title: 'Donner',
    next: 'Suivant',
    donation: 'Donation',
    donationTo: 'Don à {org}',
    submit: 'Donner',
    send: 'Envoyer',
    chooseAmount: 'Choisissez un montant',
    fiscal: 'Pour un don de 40 € ou plus, vous recevrez un reçu fiscal (en Belgique).',
    raised: 'collectés',
    canvasTitle: 'Merci pour votre don',
    address: 'Adresse',
    phone: 'Numéro de téléphone',
    email: 'E-mail',
    vatNr: 'Numéro de TVA',
    stripePublishKey: 'Cette API ne peut pas être appelée avec une clé API publiable. Veuillez utiliser une clé API secrète.',
  },
  messages: {
    noMessages: 'Pas de messages',
    title: 'Messages',
  },
  thanks: {
    toFiscal: 'Vers la page fiscale',
    toPage: 'Vers la page',
    download: 'Télécharger l\'image',
    share: 'Partager l\'image',
    title: 'Merci pour votre don!',
    fiscalTitle: 'Laissez vos informations fiscales!',
    fiscalDescription: 'Pour un don de 40 € ou plus, vous recevrez un reçu fiscal (en Belgique). Remplissez vos informations via le lien ci-dessous pour recevoir le reçu.',
    shareTitle: 'Aidez-vous à faire circuler cette campagne?',
    shareDescription: 'En partageant cette action sur les réseaux sociaux ci-dessous, vous nous aidez à faire circuler cette campagne. Cela nous permet d\'atteindre encore plus de personnes et d\'avoir un plus grand impact pour atteindre nos objectifs.',
    shareImageLg: 'N\'oubliez pas de partager l\'image à gauche! En la plaçant dans votre story, vous incitez également vos amis à faire un don. Plus nous atteignons de personnes, mieux c\'est!',
    shareImageSm: 'N\'oubliez pas de partager l\'image ci-dessous! En la plaçant dans votre story, vous incitez également vos amis à faire un don. Plus nous atteignons de personnes, mieux c\'est!',
  },
  fiscal: {
    personalFields: 'Données personnelles',
    locationFields: 'Emplacement',
    companyFields: 'Données de l\'entreprise',
    fiscalSuccess: 'Votre certificat fiscal a été soumis avec succès!',
    fiscalError: 'Une erreur s\'est produite lors de la soumission de votre certificat fiscal.',
    alreadyCreated: 'Vous avez déjà créé un certificat fiscal.',
    orderNotFound: 'Commande non trouvée.',
  },
  fields: {
    company: {
      name: 'Faire un don en tant qu\'entreprise',
      errors: {},
    },
    amount: {
      name: 'Montant',
      errors: {
        required: 'Montant requis',
      },
    },
    name: {
      name: 'Nom',
      errors: {
        required: 'Nom requis',
      },
    },
    description: {
      name: 'Message',
      errors: {
        required: 'Message requis',
      },
    },
    coords: {
      name: 'Emplacement de ton don',
      errors: {
        required: 'Emplacement requis',
      },
    },
    email: {
      name: 'E-mail',
      errors: {
        required: 'E-mail requis',
        email: 'E-mail invalide',
        regex: 'E-mail invalide',
        invalid: 'E-mail invalide',
      },
    },
    firstName: {
      name: 'Prénom',
      errors: {
        required: 'Prénom requis',
      },
    },
    lastName: {
      name: 'Nom de famille',
      errors: {
        required: 'Nom de famille requis',
      },
    },
    remark: {
      name: 'Remarque',
      errors: {},
    },
    street: {
      name: 'Rue',
      errors: {
        required: 'Rue requise',
      },
    },
    houseNumber: {
      name: 'Numéro de maison',
      errors: {
        required: 'Numéro de maison requis',
      },
    },
    houseNumberSuffix: {
      name: 'Suffixe de numéro de maison',
      errors: {
        required: 'Suffixe de numéro de maison requis',
      },
    },
    town: {
      name: 'Ville',
      errors: {
        required: 'Ville requise',
      },
    },
    postalCode: {
      name: 'Code postal',
      errors: {
        required: 'Code postal requis',
      },
    },
    anonymous: {
      name: 'Anonyme',
      errors: {},
    },
    nationalNr: {
      name: 'Numéro national',
      errors: {
        required: 'Numéro national requis',
      },
    },
    gender: {
      name: 'Genre',
      errors: {
        required: 'Genre requis',
      },
    },
    country: {
      name: 'Pays',
      errors: {
        required: 'Pays requis',
      },
    },
    locality: {
      name: 'Localité',
      errors: {
        required: 'Localité requise',
      },
    },
    streetNr: {
      name: 'Rue et numéro de maison',
      errors: {
        required: 'Rue et numéro de maison requis',
      },
    },
    premise: {
      name: 'Bus',
      errors: {
        required: 'Bus requis',
      },
    },
    companyName: {
      name: 'Nom de l\'entreprise',
      errors: {
        required: 'Nom de l\'entreprise requis',
      },
    },
    companyNr: {
      name: 'Numéro d\'entreprise',
      errors: {
        required: 'Numéro d\'entreprise requis',
      },
    },
    orderNr: {
      name: 'Numéro de commande',
      errors: {
        required: 'Numéro de commande requis',
      },
    },
  },
};

export default t;
