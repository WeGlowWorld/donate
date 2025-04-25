<template>
  <div
    class="w-screen md:h-screen flex md:flex-col items-center"
  >
    <div
      v-if="loaded && donation"
      class="w-full lg:h-full flex flex-col-reverse lg:flex-row items-center justify-center"
    >
      <div
        class="flex-1 w-full lg:h-full flex items-center justify-center py-4"
        style="background-color: var(--d-primary);"
      >
        <thank-you-portrait-canvas
          v-if="canvasType === 'portrait'"
          v-model="canvasType"
          :type="canvasObj"
        />
        <thank-you-landscape-canvas
          v-else-if="canvasType === 'landscape'"
          v-model="canvasType"
          :type="canvasObj"
        />
        <thank-you-square-canvas
          v-else-if="canvasType === 'square'"
          v-model="canvasType"
          :type="canvasObj"
        />
      </div>
      <div
        style="background-color: var(--d-background); color: var(--d-background-text);"
        class="w-full lg:h-full text-left flex-1 flex flex-col gap-16 items-center justify-center p-4 md:p-16"
      >
        <div
          style="background-color: var(--d-background);"
          class="max-w-100% w-fit p-4 rounded-lg mb-8"
        >
          <img
            :src="canvasObj.logo"
            alt="Logo"
            class="w-96 max-h-96 mx-auto"
          >
        </div>
        <div class="text-4xl font-bold w-full -mt-12">
          <p>{{ $t('thanks.title') }}</p>
        </div>
        <div
          v-if="qps.certificate"
          class="w-full flex flex-col gap-4 justify-end"
        >
          <h2 class="text-2xl font-semibold">
            {{ $t('thanks.fiscalTitle') }}
          </h2>
          <p>{{ $t('thanks.fiscalDescription') }}</p>
          <prime-button
            class="ml-auto"
            as="a"
            :href="fiscalLink"
            :label="$t('thanks.toFiscal')"
            raised
            :pt:root:style="{ backgroundColor: 'var(--d-primary)', color: 'var(--d-primary-text)', border: 'none', padding: '0.75rem 2rem 0.75rem 2rem', width: 'fit-content' }"
          />
        </div>
        <div
          class="w-full flex flex-col gap-4 justify-end"
        >
          <h2 class="text-2xl font-semibold">
            {{ $t('thanks.shareTitle') }}
          </h2>
          <p>{{ $t('thanks.shareDescription') }}</p>
          <p class="hidden md:block">
            {{ $t('thanks.shareImageLg') }}
          </p>
          <p class="md:hidden">
            {{ $t('thanks.shareImageSm') }}
          </p>
          <div class="w-full flex gap-2 flex-wrap">
            <prime-button
              v-for="sm of socialMedia"
              :key="sm.name"
              as="a"
              size="large"
              raised
              :icon="sm.logo"
              target="_blank"
              :pt:root:style="{ backgroundColor: sm.color, border: 'none', padding: '0.5rem 2rem' }"
              :href="`${sm.link}${pageLink}`"
            />
            <prime-button
              :label="$t('share.copyLink')"
              class="ml-auto"
              raised
              :pt:root:style="{ backgroundColor: 'var(--d-primary)', color: 'var(--d-primary-text)', border: 'none', padding: '0.75rem 2rem 0.75rem 2rem' }"
              @click="copyLink"
            />
          </div>
          <prime-button
            :label="$t('share.toDonate')"
            as="router-link"
            :to="`/o/${$route.params.orgSlug}/c/${qps.slug}`"
            class="ml-auto"
            raised
            :pt:root:style="{ backgroundColor: 'var(--d-accent)', color: 'var(--d-accent-text)', border: 'none', padding: '0.75rem 2rem 0.75rem 2rem' }"
            @click="copyLink"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Button as PrimeButton } from 'primevue';
import type { ThankYouDonation } from '~/models/donation';
import { VarRefType, VarType } from '~/models/enums';

export default defineComponent({
  components: {
    PrimeButton,
  },
  setup() {
    definePageMeta({
      layout: 'thank-you',
    });
    const route = useRoute();
    return {
      qps: {
        order: route.query.order,
        slug: route.query.slug,
        returning: route.query.returning === '1' || route.query.returning === 'true',
        certificate: route.query.certificate === '1' || route.query.certificate === 'true',
      },
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
      orgStore: ref(useOrgStore()),
    };
  },
  data() {
    return {
      canvasType: 'portrait',
      donation: undefined as ThankYouDonation | undefined,
      loaded: false,
    };
  },
  computed: {
    canvasObj() {
      const icon = this.orgStore.content?.variables.find(v => v.title.includes('price_'))?.value || this.orgStore.variable('icon') as string;
      const logo = this.orgStore.variable('logo', undefined, VarType.IMAGE, VarRefType.ORG) as string;
      return {
        icon,
        logo,
        bgColor: this.orgStore.content?.brandIdentity?.primaryC as string,
        name: this.donation?.name as string,
        desc: this.donation?.description as string,
      };
    },
    pageLink() {
      return `${window.location.origin}/o/${this.$route.params.orgSlug}/c/${this.$route.query.slug}`;
    },
    fiscalLink() {
      return `${window.location.origin}/o/${this.$route.params.orgSlug}/fiscal-certificate?order=${this.$route.query.order}`;
    },
  },
  async mounted() {
    try {
      await this.orgStore.init();
      if (!this.$route.query.order || !this.$route.query.slug) throw new Error('No order number or campaign slug');
      this.donation = await useAPI<ThankYouDonation>(`/donation/${this.$route.query.order}/${this.$route.query.slug}`);
      this.loaded = true;
    }
    catch {
      this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No donation was found', life: 5000 });
      if (this.$route.query.slug) {
        this.$router.push(`/o/${this.$route.params.orgSlug}/c/${this.$route.query.slug}`);
      }
      else {
        window.location.href = `https://hub.weglow.world/o/${this.$route.params.orgSlug}`;
      }
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

// localhost:3000/o/zebrapad-vzw/thank-you?returning=1&certificate=0&slug=43194OGT&order=17715&orderId=2883996189X8d704&orderStatusId=100&paymentSessionId=2883996189
</script>

<style scoped>
.right {
  background-color: var(--d-primary);
}
.logo-div {

}
</style>
