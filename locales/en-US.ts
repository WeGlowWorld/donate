import type { Translations } from '.';

const t: Translations = {
  campaign: {
    donate: 'Donate',
    extra: 'A little more information...',
  },
  share: {
    title: 'Share',
    nonProfit: 'Our non-profit',
    toDonate: 'Back to the page',
    toWebsite: 'To our website',
    toHub: 'See all our campaigns',
    shareTo: 'Share to',
    copyLink: 'Copy link',
  },
  footer: {
    madePossibleBy: 'Made possible by',
    tac: 'Terms and conditions',
    pp: 'Privacy policy',
  },
  donate: {
    title: 'Donate',
    next: 'Next',
    donation: 'Donation',
    donationTo: 'Donation to {org}',
    submit: 'Donate',
    send: 'Send',
    chooseAmount: 'Choose an amount',
    fiscal: 'For a donation of €40 or more, you will receive a fiscal receipt (in Belgium).',
    raised: 'raised',
    canvasTitle: 'Thank you for your donation',
    address: 'Address',
    phone: 'Phone number',
    email: 'E-mail',
    vatNr: 'VAT number',
    error: 'An error occurred while processing your donation. Please try again later.',
    stripePublishKey: 'This API call cannot be made with a publishable API key. Please use a secret API key.',
    bottomText: {
      general: 'We will always securely store your personal data and only process it for the purpose for which it was collected.',
      country: {
        UK: 'By completing this form I communicate that I am a UK taxpayer & I want to Gift Aid my donation. I understand that if I pay less Income Tax and/or Capital Gains Tax than the amount of Gift Aid claimed on all my donations in that tax year it is my responsibility to pay any difference.',
      },
    },
    month: 'month',
    oneTime: 'One-time',
    monthly: 'Monthly',
    recurringWarning: 'Attention: this donation is a recurring monthly donation. This donation will repeat every month until you cancel it. If you want to cancel this donation, you need to contact the organization.',
  },
  messages: {
    noMessages: 'No messages',
    title: 'Messages',
  },
  thanks: {
    toFiscal: 'To the fiscal page',
    toPage: 'To the page',
    download: 'Download image',
    share: 'Share image',
    title: 'Thank you for your donation!',
    fiscalTitle: 'Leave your fiscal details!',
    shareTitle: 'Will you help us spread the word about this campaign?',
    shareDescription: 'By sharing this action on the social media below, you help us to spread this campaign further. This allows us to reach even more people and have a greater impact in achieving our goals.',
    shareImageLg: 'Don\'t forget to share the image on the left! By placing it in your story, you also encourage your friends to donate. The more people we reach, the better!',
    shareImageSm: 'Don\'t forget to share the image below! By placing it in your story, you also encourage your friends to donate. The more people we reach, the better!',
    fiscalText: {
      UK: 'For a donation done by a UK taxpayer, you can claim a Gift Aid certificate. Please fill in your details via the link below to receive the Gift Aid Declaration.',
      BE: 'For a donation of €40 or more, you will receive a fiscal receipt (in Belgium). Fill in your details via the link below to receive the receipt.',
    },
  },
  fiscal: {
    personalFields: 'Personal details',
    locationFields: 'Location',
    companyFields: 'Company details',
    fiscalSuccess: 'Your fiscal certificate has been successfully submitted!',
    fiscalError: 'An error occurred while submitting your fiscal certificate.',
    alreadyCreated: 'You have already created a fiscal certificate.',
    orderNotFound: 'Order not found.',
  },
  fields: {
    company: {
      name: 'Donate as a company',
      errors: {},
    },
    amount: {
      name: 'Amount',
      errors: {
        required: 'Amount required',
      },
    },
    name: {
      name: 'Name',
      errors: {
        required: 'Name required',
      },
    },
    description: {
      name: 'Message',
      errors: {
        required: 'Message required',
      },
    },
    coords: {
      name: 'Where are you donating from?',
      errors: {
        required: 'Location required (does not have to be your exact address)',
      },
    },
    email: {
      name: 'E-mail',
      errors: {
        required: 'E-mail required',
        email: 'E-mail invalid',
        regex: 'E-mail invalid',
        invalid: 'E-mail invalid',
      },
    },
    firstName: {
      name: 'First name',
      errors: {
        required: 'First name required',
      },
    },
    lastName: {
      name: 'Last name',
      errors: {
        required: 'Last name required',
      },
    },
    remark: {
      name: 'Remark',
      errors: {},
    },
    street: {
      name: 'Street',
      errors: {
        required: 'Street required',
      },
    },
    houseNumber: {
      name: 'House number',
      errors: {
        required: 'House number required',
      },
    },
    houseNumberSuffix: {
      name: 'House number suffix',
      errors: {
        required: 'House number suffix required',
      },
    },
    town: {
      name: 'City',
      errors: {
        required: 'City required',
      },
    },
    postalCode: {
      name: 'Postal code',
      errors: {
        required: 'Postal code required',
      },
    },
    anonymous: {
      name: 'Anonymous',
      errors: {},
    },
    nationalNr: {
      name: 'National number',
      errors: {
        required: 'National number required',
      },
    },
    gender: {
      name: 'Gender',
      errors: {
        required: 'Gender required',
      },
    },
    country: {
      name: 'Country',
      errors: {
        required: 'Country required',
      },
    },
    locality: {
      name: 'Town',
      errors: {
        required: 'Town required',
      },
    },
    streetNr: {
      name: 'Street and house number',
      errors: {
        required: 'Street and house number required',
      },
    },
    premise: {
      name: 'Apartment or unit',
      errors: {},
    },
    companyName: {
      name: 'Company name',
      errors: {
        required: 'Company name required',
      },
    },
    companyNr: {
      name: 'Company number',
      errors: {
        required: 'Company number required',
      },
    },
    orderNr: {
      name: 'Order number',
      errors: {
        required: 'Order number required',
      },
    },
    wantsFiscal: {
      name: 'I want a fiscal certificate',
      errors: {},
    },
    wantsFiscalUK: {
      name: 'I want a Gift Aid Declaration',
      errors: {},
    },
    recurring: {
      name: 'Recurring monthly donation',
      errors: {},
    },
  },
};

export default t;
