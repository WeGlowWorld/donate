<template>
  <prime-form
    class="w-full h-full flex flex-col md:grid gap-x-2 gap-y-4 grid-cols-2"
    :resolver="resolver"
    :initial-values="formValues"
    @submit="submit"
  >
    <div class="max-w-full mx-auto col-span-2 mb-8">
      <a
        :href="orgStore.content?.general.website"
        target="_blank"
      >
        <img
          :src="orgStore.variable('logo')"
          class="max-h-24 w-full h-full object-contain"
        >
      </a>
    </div>
    <div
      v-if="done"
      class="col-span-full"
    >
      <p>{{ $t('fiscal.fiscalSuccess') }}</p>
    </div>
    <template v-else>
      <custom-input-number
        v-model="formValues.orderNr"
        :disabled="!!$route.query.order"
        required
        :show-buttons="false"
        name="orderNr"
      />
      <custom-input-switch
        v-model="formValues.company"
        name="company"
        class="col-span-full"
      />
      <template v-if="formValues.company">
        <label class="col-span-full font-bold">{{ $t('fiscal.companyFields') }}</label>
        <custom-input-text
          v-model="formValues.companyName"
          required
          name="companyName"
        />
        <custom-input-text
          v-model="formValues.companyNr"
          required
          name="companyNr"
        />
      </template>
      <template v-else>
        <label class="col-span-full font-bold">{{ $t('fiscal.personalFields') }}</label>
        <custom-input-text
          v-model="formValues.firstName"
          required
          name="firstName"
        />
        <custom-input-text
          v-model="formValues.lastName"
          required
          name="lastName"
        />
        <custom-input-text
          v-model="formValues.nationalNr"
          required
          name="nationalNr"
        />
        <custom-input-select
          v-model="formValues.gender"
          :options="genderOptions"
          name="gender"
        />
      </template>
      <label class="col-span-full font-bold">{{ $t('fiscal.locationFields') }}</label>
      <custom-input-select
        v-model="formValues.country"
        :options="countryOptions"
        name="country"
      />
      <div class="hidden md:block" />
      <custom-input-text
        v-model="formValues.locality"
        required
        name="locality"
      />
      <custom-input-text
        v-model="formValues.postalCode"
        required
        name="postalCode"
      />
      <custom-input-text
        v-model="formValues.streetNr"
        required
        name="streetNr"
      />
      <custom-input-text
        v-model="formValues.premise"
        name="premise"
      />
      <div class="md:col-span-2 ml-auto">
        <Button
          type="submit"
          :label="$t('donate.submit')"
        />
      </div>
    </template>
  </prime-form>
</template>

<script lang="ts">
import { Form as PrimeForm, type FormSubmitEvent } from '@primevue/forms';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { certificateZod } from '~/models/donation';
import countryOptions from '~/assets/europeanCountries';
import type { NuxtError } from '#app';

export default defineComponent({
  name: 'Donate',
  components: {
    PrimeForm,
  },
  setup() {
    definePageMeta({
      layout: 'org',
    });

    const orgStore = useOrgStore();
    useSeoMeta({
      title: `Fiscal certificate | ${orgStore.orgName}`,
    });

    return {
      orgStore: ref(orgStore),
      countryOptions,
      genderOptions: [{ value: 'M', label: 'M' }, { value: 'F', label: 'F' }, { value: 'X', label: 'X' }],
    };
  },
  data() {
    return {
      done: false,
      formValues: {
        orderNr: this.$route.query.order ? parseInt(this.$route.query.order as string) : undefined,
        company: false,
        firstName: '',
        lastName: '',
        nationalNr: '',
        companyName: '',
        companyNr: '',
        country: '',
        locality: '',
        postalCode: '',
        streetNr: '',
        premise: '',
        gender: '',
      },
      resolver: zodResolver(certificateZod),
      orgSlug: this.$route.params.orgSlug,
    };
  },
  methods: {
    async submit(event: FormSubmitEvent) {
      try {
        if (!event.valid) throw new Error('Form is not valid');
        const { orderNr, companyNr, nationalNr, ...body } = this.formValues;

        const { error } = await useAsyncData('home-data', () =>
          useAPI(`/certificate/${orderNr}`, {
            method: 'POST',
            body: {
              ...body,
              nationalNr: body.company ? companyNr : nationalNr,
            },
          }),
        );
        if (error.value) throw error.value;
        this.$toast.add({ severity: 'success', summary: 'Success', detail: this.$t('fiscal.fiscalSuccess'), life: 5000 });
        this.done = true;
      }
      catch (_e) {
        const e = _e as NuxtError;
        let detail: string;
        switch (e.statusCode) {
          case 405:
            detail = this.$t('fiscal.orderNotFound');
            break;
          case 406:
            detail = this.$t('fiscal.alreadyCreated');
            break;
          default:
            detail = this.$t('fiscal.fiscalError');
        }
        this.$toast.add({ severity: 'error', summary: 'Error', detail, life: 5000 });
      }
    },
  },
});
</script>
