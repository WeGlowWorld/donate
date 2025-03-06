import type { Content } from '~/models/content';
import type { VarType, Locale, VarRefType } from '~/models/enums';

export const useCampaignStore = defineStore('campaignStore', {
  state: () => ({
    content: undefined as Content | undefined,
    initialized: false as boolean,
    error: undefined as string | undefined,
    locale: useI18n().locale.value as Locale,
  }),
  getters: {
    variable: state => (title: string, locale?: string, type?: VarType, refType?: VarRefType, refId?: string) => (state.content?.variables.find(v =>
      v.title === title
      && (!locale || v.locale === locale)
      && (!type || v.type === type)
      && (!refType || v.refType === refType)
      && (!refId || v.refId === refId),
    ) || state.content?.variables.find(v =>
      v.title === title
      && (!type || v.type === type)
      && (!refType || v.refType === refType)
      && (!refId || v.refId === refId),
    ))?.value,
  },
  async hydrate() {
    await this.actions?.init();
  },
  actions: {
    async init() {
      const { orgSlug, campaignSlug } = useRoute().params;
      try {
        const content = await useAPI<Content>(`/campaign/content/${orgSlug}/${campaignSlug}`);
        if (!content) throw new Error('No content found');

        this.content = {
          ...content,
          variables: content.variables.filter(v => v.value !== 'No translation'),
        };
        this.initialized = true;
      }
      catch (err) {
        console.log('err', err);
        if (err instanceof Error)
          this.error = err.message;
      }
      finally {
        this.initialized = true;
      }
    },
  },
});
