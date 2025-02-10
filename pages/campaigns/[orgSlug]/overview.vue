<script lang="ts">
export default defineComponent({
  name: 'RedirectOldCampaign',
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { orgSlug } = route.params as { orgSlug: string; campaignSlug: string };
    router.push(`https://hub.weglow.world/o/${orgSlug}`);
  },
});
</script>
