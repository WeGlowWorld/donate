import type { Coord, Message } from '~/models/content';

export const useDonationsStore = defineStore('donationsStore', {
  state: () => ({
    messages: [] as Message[],
    coords: [] as Coord[],
    coordsFull: [] as {
      coords: Coord;
      amount?: number;
      name?: string;
      description?: string;
    }[],
    page: 0,
    initialized: false as boolean,
    error: undefined as string | undefined,
  }),
  getters: {
    hasMore(state) {
      return state.messages.length < state.coords.length;
    },
  },
  actions: {
    async init(campaignSlug: string, orgSlug: string) {
      await this.fetchDonations(campaignSlug, orgSlug);
    },
    async fetchDonations(campaignSlug: string, orgSlug: string): Promise<void> {
      try {
        const result = await useAPI<{
          messages: Message[];
          coords?: {
            coords: Coord;
            amount?: number;
            name?: string;
            description?: string;
          }[];
        }>(`/campaign/donations/${orgSlug}/${campaignSlug}`, {
          query: {
            limit: 20,
            offset: this.page * 20,
          },
        });
        if (!result) throw new Error('No content found');
        this.messages.push(...result.messages);
        if (this.page === 0) {
          this.coords.push(...(result.coords?.map(v => v.coords) || []));
          this.coordsFull.push(...(result.coords || []));
        }
      }
      catch (err) {
        if (err instanceof Error)
          this.error = err.message;
      }
      finally {
        this.initialized = true;
      }
    },
    async nextPage(campaignSlug: string, orgSlug: string) {
      this.page++;
      await this.fetchDonations(campaignSlug, orgSlug);
    },
  },
});
