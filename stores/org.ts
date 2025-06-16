import type { ContentOrg } from '~/models/content';
import { Locale, type VarRefType, type VarType } from '~/models/enums';
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
    orgName: state => state.content?.variables.find(v => v.title === 'org_name')?.value,
  },
  async hydrate() {
    await this.actions?.init();
  },
  actions: {
    async init() {
      if (this.initialized) return;
      const route = useRoute();
      try {
        this.content = await useAPI<ContentOrg>(`/org/content/${route.params.orgSlug}`, {
          query: {
            campaignSlug: route.query.slug,
          },
        });
        this.initialized = true;
      }
      catch (err) {
        if (err instanceof Error)
          this.error = err.message;
      }
      finally {
        this.initialized = true;
      }
    },
    async donate(orgSlug: string, campSlug: string, body: DonateBody & { certificate?: DonateKbsBody }, wantsFiscal = true, locale = Locale.NL_BE): Promise<string> {
      try {
        console.log(orgSlug);
        return await useAPI<string>(`/donation/${orgSlug}/${campSlug}`, {
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
              recurring: orgSlug === 'dummy-org' ? true : false,
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
          query: {
            wants_fiscal: wantsFiscal ? undefined : '0',
            locale: locale,
          },
        });
      }
      catch (err) {
        console.error(err);
        this.$toast.add({ severity: 'error', summary: 'Error', detail: err, life: 5000 });
        if (err instanceof Error)
          this.$state.error = err.message;
        throw err;
      }
    },
  },
});
