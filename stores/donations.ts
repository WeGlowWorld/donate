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
      await this.fetchDonations(campaignSlug, orgSlug);
    },
    async fetchDonations(campaignSlug: string, orgSlug: string): Promise<void> {
      try {
        const result = await useAPI<{
          messages: Message[];
          coords?: Coord[];
        }>(`/campaign/donations/${orgSlug}/${campaignSlug}`, {
          query: {
            limit: 20,
            offset: this.page * 20,
          },
        });
        if (!result) throw new Error('No content found');

        this.messages.push(...result.messages);
        this.coords.push(...(result.coords || []));
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
