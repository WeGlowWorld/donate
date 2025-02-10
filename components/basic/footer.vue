<template>
  <div class="standard-footer flex flex-col gap-4 items-center justify-between bg-white w-screen shadow-2xl p-2 md:p-4 text-sm">
    <a
      href="https://www.weglow.world"
      target="_blank"
    >
      <img
        src="https://weglowdashboard.blob.core.windows.net/logos/weglow-zwart.svg"
        alt="WeGlow Logo"
        class="h-8 md:h-12"
      >
    </a>
    <span>
      {{ $t('footer.madePossibleBy') }}
      <a
        href="https://www.weglow.world"
        target="_blank"
        class="font-bold"
      >WeGlow.World</a>
    </span>
    <span>© Copyright {{ year }}</span>
    <div>
      <a
        :href="tac"
        target="_blank"
        class="font-bold"
      >{{ $t('footer.tac') }}</a>
      &
      <a
        :href="pp"
        target="_blank"
        class="font-bold"
      >{{ $t('footer.pp') }}</a>
    </div>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs';
import type { Locale } from '~/models/enums';

export default defineComponent({
  name: 'StandardFooter',
  data() {
    return {
      year: dayjs().year(),
    };
  },
  computed: {
    pp() {
      switch (this.$i18n.locale as Locale) {
        case 'nl-BE':
          return 'https://weglowdashboard.blob.core.windows.net/avgweglow/Privacy%20Statement%20NL.pdf';
        case 'fr-FR':
          return 'https://weglowdashboard.blob.core.windows.net/avgweglow/Privacy%20Statement%20FR.pdf';
        default:
          return 'https://weglowdashboard.blob.core.windows.net/avgweglow/Privacy%20Statement%20EN.pdf';
      }
    },
    tac() {
      switch (this.$i18n.locale as Locale) {
        case 'nl-BE':
          return 'https://weglowdashboard.blob.core.windows.net/avgweglow/Algemene%20Voorwaarden%20WeGlow%20NL.pdf';
        case 'fr-FR':
          return 'https://weglowdashboard.blob.core.windows.net/avgweglow/Algemene%20Voorwaarden%20WeGlow%20FR.pdf';
        default:
          return 'https://weglowdashboard.blob.core.windows.net/avgweglow/Terms%20and%20Conditions%20WeGlow%20EN.pdf';
      }
    },
  },
});
</script>
