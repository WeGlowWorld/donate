<template>
  <basic-modern-card :title="$t('share.title')">
    <div class="px-4 py-8 flex flex-wrap justify-center gap-2">
      <Button
        v-for="link of links"
        :key="link.icon"
        :href="link.url"
        target="_blank"
        as="a"
        size="large"
        :pt:root:style="{ backgroundColor: link.color, border: 'none' }"
        :label="link.label"
        raised
      />
      <Button
        as="button"
        size="large"
        :pt:root:style="{ backgroundColor: '#f37125', border: 'none' }"
        :label="$t('share.copy')"
        raised
        @click="copyLink"
      />
    </div>
  </basic-modern-card>
</template>

<script lang="ts">
export default defineComponent({
  name: 'BasicModernShare',
  setup() {
    const route = useRoute();
    const links = [
      {
        icon: 'facebook',
        label: 'Facebook',
        url: `https://www.facebook.com/sharer/sharer.php?u=${route.fullPath}`,
        color: '#1877f2',
      },
      {
        icon: 'twitter',
        label: 'Twitter',
        url: `https://twitter.com/intent/tweet?url=${route.fullPath}`,
        color: '#1da1f2',
      },
      {
        icon: 'linkedin',
        label: 'LinkedIn',
        url: `https://www.linkedin.com/shareArticle?mini=true&url=${route.fullPath}`,
        color: '#0077b5',
      },
      {
        icon: 'whatsapp',
        label: 'WhatsApp',
        url: `https://api.whatsapp.com/send?text=${route.fullPath}`,
        color: '#25d366',
      },
    ];
    return { links };
  },
  methods: {
    copyLink() {
      navigator.clipboard.writeText(window.location.href);
    },
  },
});
</script>
