import type { Coord, Message } from '~/models/content';

export const useDonationsStore = defineStore('donationsStore', {
  state: () => ({
    messages: [] as Message[],
    coords: [] as Coord[],
    page: 0,
    initialized: false as boolean,
    error: undefined as string | undefined,
  }),
  actions: {
    async init(campaignSlug: string, orgSlug: string) {
      this.fetchDonations(campaignSlug, orgSlug);
    },
    async fetchDonations(campaignSlug: string, orgSlug: string): Promise<void> {
      try {
        const result = await $fetch<{
          messages: Message[];
          coords?: Coord[];
        }>(`http://weglow-backend.azurewebsites.net/api/campaign/donations/${orgSlug}/${campaignSlug}`, {
          query: {
            limit: 20,
            offset: this.page * 20,
          },
        });
        this.messages.push(...result.messages);
      }
      catch (err) {
        if (err instanceof Error)
          this.error = err.message;
      }
      finally {
        this.initialized = true;
      }
    },
  },
});
