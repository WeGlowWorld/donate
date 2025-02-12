import type { ContentOrg } from '~/models/content';
import type { VarRefType, VarType } from '~/models/enums';
import type { DonateBody, DonateKbsBody } from '~/models/donation';

export const useOrgStore = defineStore('orgStore', {
  state: () => ({
    content: undefined as ContentOrg | undefined,
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
  },
  async hydrate(storeState) {
    const { orgSlug } = useRoute().params;
    try {
      const content = await $fetch<ContentOrg>(`https://weglow-backend.azurewebsites.net/api/org/content/${orgSlug}`);
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
  actions: {
    async donate(orgSlug: string, campSlug: string, body: DonateBody & { certificate?: DonateKbsBody }): Promise<string> {
      try {
        return await $fetch<string>(`https://weglow-backend.azurewebsites.net/api/donation/${orgSlug}/${campSlug}`, {
          method: 'POST',
          body: {
            amount: body.amount,
            donation: {
              name: body.anonymous ? '-' : body.name,
              description: body.description,
              coords: body.coords,
              anonymous: body.anonymous,
            },
            order: {
              email: body.email,
              recurring: false,
            },
            certificate: body.certificate
              ? {
                  company: body.certificate.company,
                  companyName: body.certificate.companyName,
                  firstName: body.certificate.firstName,
                  lastName: body.certificate.lastName,
                  nationalNr: body.certificate.nationalNr,
                  country: body.certificate.country,
                  locality: body.certificate.locality,
                  postalCode: body.certificate.postalCode,
                  streetNr: body.certificate.streetNr,
                  premise: body.certificate.premise,
                  gender: body.certificate.gender,
                }
              : undefined,
          },
        });
      }
      catch (err) {
        if (err instanceof Error)
          this.$state.error = err.message;
        throw err;
      }
    },
  },
});
