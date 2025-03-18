<template>
  <basic-classic-card
    :title="$t('share.title')"
    content-class="flex flex-col lg:flex-row gap-4 px-4 py-8 gap-8"
  >
    <div class="flex-1 flex flex-col gap-4">
      <h2 class="text-xl font-semibold">
        {{ $t('share.nonProfit') }}
      </h2>
      <div class="flex flex-wrap justify-left gap-2">
        <Button
          v-if="website"
          as="a"
          size="large"
          class="border-none"
          :href="website"
          :label="$t('share.toWebsite')"
          raised
        />
        <Button
          as="a"
          size="large"
          class="border-none"
          :href="`https://hub.weglow.world/o/${$route.params.orgSlug}`"
          :label="$t('share.toHub')"
          raised
        />
      </div>
    </div>
    <div class="lg:flex-shrink lg:flex-grow flex flex-col gap-4">
      <h2 class="text-xl font-semibold lg:text-right">
        {{ $t('share.shareTo') }}
      </h2>
      <div class="flex flex-wrap lg:justify-end gap-2">
        <Button
          v-for="link of links"
          :key="link.icon"
          :href="link.url+shareUrl"
          target="_blank"
          :icon="`pi pi-${link.icon}`"
          as="a"
          size="large"
          :pt:root:style="{ backgroundColor: link.color, border: 'none', padding: '0.65rem 1.5rem' }"
          raised
        />
      </div>
      <Button
        as="button"
        size="large"
        class="border-none w-fit lg:ml-auto"
        icon="pi pi-link"
        :label="$t('share.copyLink')"
        raised
        @click="copyLink"
      />
    </div>
  </basic-classic-card>
</template>

<script lang="ts">
export default defineComponent({
  name: 'BasicModernShare',
  setup() {
    const links = [
      {
        icon: 'facebook',
        url: `https://www.facebook.com/sharer/sharer.php?u=`,
        color: '#1877f2',
      },
      {
        icon: 'twitter',
        url: `https://x.com/intent/tweet?url=`,
        color: '#050505',
      },
      {
        icon: 'linkedin',
        url: `https://www.linkedin.com/shareArticle?mini=true&url=`,
        color: '#0077b5',
      },
      {
        icon: 'whatsapp',
        url: `https://api.whatsapp.com/send?text=`,
        color: '#25d366',
      },
    ];
    return {
      links,
      website: useCampaignStore().content?.org.website,
    };
  },
  computed: {
    shareUrl() {
      return window.location.origin + this.$route.fullPath;
    },
  },
  methods: {
    copyLink() {
      navigator.clipboard.writeText(window.location.href);
    },
  },
});
</script>
