<script setup lang="ts">
const route = useRoute();
const { orgSlug } = route.params as { orgSlug: string };
window.location.href = `https://hub.weglow.world/o/${orgSlug}`;
</script>
