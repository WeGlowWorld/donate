import type { Content } from '~/models/content';
import type { VarType, Locale, VarRefType } from '~/models/enums';

export const useCampaignStore = defineStore('campaignStore', {
  state: () => ({
    content: undefined as Content | undefined,
    initialized: false as boolean,
    error: undefined as string | undefined,
  }),
  getters: {
    variable: state => (title: string, locale?: string, type?: VarType, refType?: VarRefType, refId?: string) => state.content?.variables.find(v =>
      v.title === title
      && (!locale || v.locale === locale)
      && (!type || v.type === type)
      && (!refType || v.refType === refType)
      && (!refId || v.refId === refId),
    )?.value,
    locale: (state): Locale => {
      return (state.content?.org.locales.includes(useI18n().locale.value as Locale) ? useI18n().locale.value : state.content?.org.locales[0]) as Locale;
    },
  },
  async hydrate() {
    await this.actions?.init();
  },
  actions: {
    async init() {
      const { orgSlug, campaignSlug } = useRoute().params;
      console.log('orgSlug', orgSlug);
      try {
        const content = await $fetch<Content>(`${useRuntimeConfig().public.apiUrl}/campaign/content/${orgSlug}/${campaignSlug}`);
        console.log('content', content);
        this.content = content;
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
