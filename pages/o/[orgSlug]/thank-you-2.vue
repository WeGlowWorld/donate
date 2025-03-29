<template>
  <div class="w-full h-full flex flex-col gap-12">
    <div class="max-w-full mx-auto">
      <a
        :href="orgStore.content?.general.website"
        target="_blank"
      >
        <img
          :src="logo"
          class="max-h-24 w-full h-full object-contain"
        >
      </a>
    </div>
    <div v-if="donation">
      <thank-you-canvas
        :logo="logo"
        :icon="icon"
        :name="donation?.name"
      />
    </div>
    <span
      v-else-if="!loaded"
      class="pi pi-spinner pi-spin w-fit h-fit"
    />
    <template v-else>
      <p class="text-lg font-bold">
        Bedankt voor uw donatie!
      </p>
      <div
        v-if="certificate"
        class="flex flex-col gap-4 text-justify"
      >
        <p>Met deze donatie heeft u recht op een fiscaal attest. Het mailtje om deze gegevens in te vullen is al onderweg, maar als u dit liever nu direct doet kan u op volgende link klikken.</p>
        <PrimeButton
          as="a"
          :href="fiscalLink"
          :label="$t('thanks.toFiscal')"
          raised
          :pt:root:style="{ backgroundColor: 'var(--d-primary)', color: 'var(--d-primary-text)', border: 'none', padding: '0.75rem 2rem 0.75rem 2rem', width: 'fit-content' }"
        />
      </div>
      <div class="flex flex-col gap-4 text-justify">
        <p>Help ons nog verder door uw donatie ook te delen op één van deze sociale media, en spoor vrienden, familie en collega's aan om hetzelfde te doen.</p>
        <div class="flex flex-wrap gap-2 w-full">
          <PrimeButton
            v-for="sm of socialMedia"
            :key="sm.name"
            as="a"
            raised
            :icon="sm.logo"
            target="_blank"
            :pt:root:style="{ backgroundColor: sm.color, border: 'none', padding: '0.75rem 2rem 0.75rem 2rem' }"
            :href="`${sm.link}${pageLink}`"
          />
          <PrimeButton
            :label="$t('share.copyLink')"
            class="ml-auto"
            raised
            :pt:root:style="{ backgroundColor: 'var(--d-primary)', color: 'var(--d-primary-text)', border: 'none', padding: '0.75rem 2rem 0.75rem 2rem' }"
            @click="copyLink"
          />
        </div>
      </div>
    </template>
    <template v-if="0">
      <p>
        No donation was found
      </p>
    </template>
    <PrimeButton
      as="a"
      :label="$t('thanks.toPage')"
      raised
      :pt:root:style="{ width: 'fit-content', backgroundColor: 'var(--d-accent)', color: 'var(--d-accent-text)', border: 'none', padding: '0.75rem 2rem 0.75rem 2rem' }"
      :href="pageLink"
    />
  </div>
</template>
<!-- v-if="certificate" -->

<script lang="ts">
import { Button as PrimeButton } from 'primevue';
import type { ThankYouDonation } from '~/models/donation';

export default defineComponent({
  name: 'Donate',
  components: {
    PrimeButton,
  },
  setup() {
    definePageMeta({
      layout: 'org',
      title: 'WeGlow Donate | Thanks!',
    });

    const { slug, returning, order, certificate } = useRoute().query;
    return {
      route: ref(useRoute()),
      orgStore: ref(useOrgStore()),
      returning: returning !== '0' || returning === null,
      certificate: certificate === '1',
      campaignSlug: slug,
      orderNr: order,
      socialMedia: {
        Facebook: {
          name: 'Facebook',
          logo: 'pi pi-facebook',
          link: 'https://www.facebook.com/sharer/sharer.php?u=',
          color: '#1877F2',
        },
        WhatsApp: {
          name: 'WhatsApp',
          logo: 'pi pi-whatsapp',
          link: 'https://api.whatsapp.com/send?text=',
          color: '#25D366',
        },
        X: {
          name: 'X',
          logo: 'pi pi-twitter',
          link: 'https://x.com/intent/tweet?text=',
          color: '#000000',
        },
        LinkedIn: {
          name: 'LinkedIn',
          logo: 'pi pi-linkedin',
          link: 'https://www.linkedin.com/sharing/share-offsite/?url=',
          color: '#0077B5',
        },
      },
    };
  },
  data() {
    return {
      donation: undefined as ThankYouDonation | undefined,
      loaded: false,
    };
  },
  computed: {
    pageLink() {
      return `${window.location.origin}/o/${this.route.params.orgSlug}/c/${this.campaignSlug}`;
    },
    fiscalLink() {
      return `${window.location.origin}/o/${this.route.params.orgSlug}/fiscal-certificate?order=${this.orderNr}`;
    },
    logo() {
      return this.orgStore.variable('logo');
    },
    icon() {
      const priceIcon = this.orgStore.content?.variables.find(v => v.title.includes('price_'));
      if (priceIcon) return priceIcon.value;
      console.log(this.orgStore.content?.variables);
      return this.orgStore.variable('icon') as string;
    },
  },
  async mounted() {
    try {
      if (!this.orderNr || !this.campaignSlug) throw new Error('No order number or campaign slug');
      this.donation = await useAPI<ThankYouDonation>(`/donation/${this.orderNr}/${this.campaignSlug}`);
      this.loaded = true;
    }
    catch {
      this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No donation was found', life: 5000 });
    }
    finally {
      this.loaded = true;
    }
  },
  methods: {
    copyLink() {
      navigator.clipboard.writeText(this.pageLink);
    },
  },
});
// /o/feestvarken-vzw/thank-you?returning=1&certificate=0&slug=4H3OBDBO&order=2df6cf11-9f5d-48b9-b66f-4e8d4bfefef5 donated link
</script>
