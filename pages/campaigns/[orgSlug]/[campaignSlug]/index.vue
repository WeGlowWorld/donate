<script setup lang="ts">
const router = useRouter();
const route = useRoute();
const { orgSlug, campaignSlug } = route.params as { orgSlug: string; campaignSlug: string };
router.push(`/o/${orgSlug}/c/${campaignSlug}`);
</script>
