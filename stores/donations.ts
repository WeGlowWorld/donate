import type { Coord, Message } from '~/models/content';

export const useDonationsStore = defineStore('donationsStore', {
  state: () => ({
    messages: [] as Message[],
    coords: [] as Coord[],
    page: 0,
    initialized: false as boolean,
    error: undefined as string | undefined,
  }),
  async hydrate(storeState) {
    const { orgSlug, campaignSlug } = useRoute().params;

    try {
      const result = await $fetch<{
        messages: Message[];
        coords: Coord[];
      }>(`http://localhost:8000/api/campaign/donations/${orgSlug}/${campaignSlug}`);
      storeState.messages = result.messages;
      storeState.coords = result.coords;
      storeState.page += 1;
    }
    catch (err) {
      if (err instanceof Error)
        storeState.error = err.message;
    }
    finally {
      storeState.initialized = true;
    }
  },
  actions: {
    async fetchDonations(campaignSlug: string, orgSlug: string): Promise<void> {
      try {
        const result = await $fetch<{
          messages: Message[];
          coords?: Coord[];
        }>(`http://localhost:8000/api/campaign/donations/${orgSlug}/${campaignSlug}`, {
          query: {
            limit: 20,
            offset: this.page * 20,
          },
        });
        this.messages.push(...result.messages);
      }
      catch (err) {
        if (err instanceof Error)
          this.$state.error = err.message;
      }
      finally {
        this.$state.initialized = true;
      }
    },
  },
});
