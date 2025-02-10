<script lang="ts">
export default defineComponent({
  name: 'RedirectOldCampaign',
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { orgSlug, campaignSlug } = route.params as { orgSlug: string; campaignSlug: string };
    router.push(`/o/${orgSlug}/c/${campaignSlug}`);
  },
});
</script>
