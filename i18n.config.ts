import EN_US from './locales/en-US';
import FR_FR from './locales/fr-FR';
import NL_BE from './locales/nl-BE';

export default defineI18nConfig(() => ({
  legacy: false,
  defaultLocale: 'nl-BE',
  strategy: 'no_prefix',
  locales: ['nl-BE', 'fr-FR', 'en-US'],
  messages: {
    'nl-BE': NL_BE,
    'fr-FR': FR_FR,
    'en-US': EN_US,
  },
}));
