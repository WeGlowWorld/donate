import type { Content } from '~/models/content';
import { VarType, type Locale, type VarRefType } from '~/models/enums';

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
  async hydrate(storeState) {
    const { orgSlug, campaignSlug } = useRoute().params;
    try {
      const content = await $fetch<Content>(`http://localhost:8000/api/campaign/content/${orgSlug}/${campaignSlug}`);
      console.log(content.variables.filter(v => v.type === VarType.COLOR));
      storeState.content = content;
      storeState.initialized = true;
    }
    catch (err) {
      if (err instanceof Error)
        storeState.error = err.message;
    }
    finally {
      storeState.initialized = true;
    }
  },
});
