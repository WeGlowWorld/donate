<template>
  <div>
    <prime-form
      class="donate-form w-full h-full flex flex-col md:grid gap-x-2 gap-y-4 grid-cols-2"
      :resolver="resolver"
      :initial-values="formValues"
      @submit="submit"
    >
      <div class="flex justify-between w-full max-w-full mx-auto col-span-2 mb-4">
        <a
          :href="orgStore.content?.general.website"
          target="_blank"
        >
          <img
            :src="orgStore.variable('logo')"
            class="max-h-24 w-full h-full object-contain"
          >
        </a>
        <div class="w-24 h-24">
          <img
            class="w-full h-full"
            src="https://afrianafoundation.org/wp-content/uploads/2014/02/anbi-logo.png"
          >
        </div>
      </div>
      <h2>
        {{ $t('donate.donationTo', { org: orgStore.variable('org_name') }) }}
      </h2>
      <custom-input-number
        v-model="formValues.amount"
        required
        positive
        name="amount"
        :currency="orgStore.content?.general.currency"
      />
      <custom-input-text
        v-model="formValues.name"
        required
        name="name"
      />
      <custom-input-text
        v-model="formValues.description"
        class="col-span-2"
        required
        name="description"
      />

      <form-field
        v-if="hasLocation"
        name="coords"
        :initial-value="formValues.address"
        class="relative z-10"
      >
        <label
          class="italic"
          for="coords"
        >{{ $t(`fields.coords.name`) }} *</label>
        <div :class="{ 'filled-field': formValues.address.length > 0 }">
          <div
            id="geocoder"
            class="geocoder"
          />
          <div
            id="map"
            ref="map"
            class="map-container"
          />
        </div>
        <Message
          v-if="coords[0] === 0 && coords[1] === 0"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ $t(`fields.coords.errors.required`) }}
        </Message>
      </form-field>
      <custom-input-text
        v-model="formValues.email"
        required
        name="email"
      />
      <div class="flex flex-col gap-2 col-span-full">
        <custom-input-switch
          v-model="formValues.anonymous"
          name="anonymous"
          reverse
        />
        <custom-input-switch
          v-if="country === 'UK'"
          v-model="wantsFiscal"
          :name="country ==='UK' ? 'wantsFiscalUK' : 'wantsFiscal'"
          reverse
        />
      </div>
      <template v-if="orgStore.content?.general.superAdmin === 'kbs' && formKbsValues">
        <div class="col-span-2 flex">
          <h2>{{ $t(formKbsValues.company ? 'fiscal.companyFields' : 'fiscal.personalFields') }}</h2>
          <custom-input-switch
            v-model="formKbsValues.company"
            name="company"
            class="ml-auto"
          />
        </div>
        <template v-if="formKbsValues.company">
          <custom-input-text
            v-model="formKbsValues.companyName"
            required
            name="companyName"
          />
          <custom-input-text
            v-model="formKbsValues.nationalNr"
            required
            name="vatNr"
          />
        </template>
        <template v-else>
          <custom-input-text
            v-model="formKbsValues.firstName"
            required
            name="firstName"
          />
          <custom-input-text
            v-model="formKbsValues.lastName"
            required
            name="lastName"
          />
          <custom-input-text
            v-model="formKbsValues.nationalNr"
            required
            name="nationalNr"
          />
          <custom-input-select
            v-model="formKbsValues.gender"
            :options="genderOptions"
            name="gender"
          />
        </template>
        <h2>{{ $t('fiscal.locationFields') }}</h2>
        <custom-input-select
          v-model="formKbsValues.country"
          :options="countryOptions"
          name="country"
        />
        <div class="hidden md:block" />
        <custom-input-text
          v-model="formKbsValues.locality"
          required
          name="locality"
        />
        <custom-input-text
          v-model="formKbsValues.postalCode"
          required
          name="postalCode"
        />
        <custom-input-text
          v-model="formKbsValues.streetNr"
          required
          name="streetNr"
        />
        <custom-input-text
          v-model="formKbsValues.premise"
          required
          name="premise"
        />
      </template>
      <div class="md:col-span-2 ml-auto">
        <prime-button
          :loading="submitting"
          type="submit"
          :label="$t('donate.submit')"
        />
      </div>
    </prime-form>
    <div
      v-if="orgStore.content?.billing"
      class="footer"
    >
      <div>
        <p
          v-if="orgStore.content?.billing.address"
          class="text-sm"
        >
          <b>{{ $t('donate.address') }}: </b> {{ orgStore.content.billing.address }}
        </p>
        <p
          v-if="orgStore.content?.billing.email"
          class="text-sm"
        >
          <b>{{ $t('donate.email') }}: </b> {{ orgStore.content.billing.email }}
        </p>
        <p
          v-if="orgStore.content?.billing.phone"
          class="text-sm"
        >
          <b>{{ $t('donate.phone') }}: </b> {{ orgStore.content.billing.phone }}
        </p>
        <p
          v-if="orgStore.content?.billing.vatNr"
          class="text-sm"
        >
          <b>{{ $t('donate.vatNr') }}: </b> {{ orgStore.content.billing.vatNr }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Form as PrimeForm, type FormSubmitEvent } from '@primevue/forms';
import { Button as PrimeButton } from 'primevue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { donateKbsZod, donateZod } from '~/models/donation';
import countryOptions from '~/assets/europeanCountries';
import type { BackendError } from '~/models/error';

export default defineComponent({
  name: 'Donate',
  components: { PrimeForm, PrimeButton },
  setup() {
    definePageMeta({
      layout: 'org',
      title: 'WeGlow Donate',
    });

    const orgStore = useOrgStore();
    const route = useRoute();

    if (!route.query['slug']) throw new Error('Campaign slug is required');

    const isKbs = orgStore.content?.general.superAdmin === 'kbs';
    const hasLocation = route.query.noLocation === undefined;
    return {
      orgStore: ref(orgStore),
      isKbs,
      countryOptions,
      coords: ref(route.query.noLocation === undefined ? [0, 0] : [-1, -1]),
      genderOptions: [{ value: 'M', label: 'M' }, { value: 'F', label: 'F' }, { value: 'X', label: 'X' }],
      formValues: ref({
        amount: parseInt(route.query.amount as string) || 0,
        email: '',
        name: '',
        description: '',
        address: '',
        anonymous: false,
      }),
      formKbsValues: ref({
        company: false,
        firstName: '',
        lastName: '',
        nationalNr: '',
        companyName: '',
        country: '',
        locality: '',
        postalCode: '',
        streetNr: '',
        premise: '',
        gender: '',
      }),
      hasLocation,
      resolver: zodResolver(isKbs ? donateKbsZod : donateZod),
      orgSlug: route.params.orgSlug as string,
      campSlug: route.query.slug as string,
    };
  },
  data() {
    return {
      wantsFiscal: true,
      map: null as unknown as mapboxgl.Map,
      submitting: false,
    };
  },
  computed: {
    country() {
      return this.orgStore.content?.general.country;
    },
  },
  mounted() {
    this.initializeMap();
  },
  methods: {
    toPage() {
      this.$router.push({
        path: `/o/${this.$route.params.orgSlug}/c/${this.$route.query.campaignSlug}`,
      });
    },
    async submit(event: FormSubmitEvent) {
      try {
        this.submitting = true;
        if (!event.valid || (this.coords[0] === 0 && this.coords[1] === 0)) return;
        const checkout = await this.orgStore.donate(
          this.orgSlug,
          this.campSlug,
          {
            ...this.formValues,
            certificate: this.isKbs ? this.formKbsValues : undefined,
            coords: this.coords,
          },
          this.wantsFiscal,
          this.$i18n.locale,
        );
        window.location.href = checkout;
      }
      catch (_err) {
        const err = _err as BackendError;
        this.$toast.add({ severity: 'error', summary: 'Error', detail: this.$t('donate.error'), life: 5000 });
        console.log(err);
      }
      finally {
        this.submitting = false;
      }
    },
    initializeMap() {
      mapboxgl.accessToken = 'pk.eyJ1Ijoid2VnbG93IiwiYSI6ImNsYXdsMG1idDBleGUzcHA0bXV6czQyaWMifQ.2JmaCHMYFmNLPQrzNQkv9A' as string;

      // Add geocoder control to the map
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl,
        placeholder: ' ',
      });
      geocoder.on('result', (e: { result: { geometry: { coordinates: [number, number] } } }) => {
        this.coords = e.result.geometry.coordinates;
      });

      // Add the geocoder to the map
      document.getElementById('geocoder')?.appendChild(geocoder.onAdd(this.map));
    },
  },
});
</script>

<style scoped>
.map-container {
  display: none;
}
h2 {
  @apply col-span-2 text-xl font-bold;
}
</style>

<style>
.donate-form .mapboxgl-ctrl-geocoder {
  width: 100%;
  max-width: 100%;
  box-shadow: none;
  background-color: var(--q-background-color);
}
.donate-form .mapboxgl-ctrl-geocoder--pin-right {
  display: none;
}
.donate-form .mapboxgl-ctrl-geocoder--icon-close {
  margin-top: 0;
}

.custom-component {
  border-radius: 4px;
  padding: 1.66rem 12px;
  font-size: 16px;
  line-height: 1.42857143;
  color: #555;
  background-color: var(--q-background);
  background-image: none;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  &:focus {
    border: 2px solid var(--q-primary);
    outline: none;
    padding: calc(1.66rem - 1px) 12px;
  }
}

.donate-form .mapboxgl-ctrl-geocoder input {
  border: 1px solid var(--p-inputtext-border-color);
  border-radius: 6px;
  padding: 12px 14px;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.54);
  line-height: 27px;
  width: 100%;
  background-color: white;
  background-image: none;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  &:focus {
    border-color: var(--p-inputtext-focus-border-color);
    box-shadow: var(--p-inputtext-focus-ring-shadow);
    outline: var(--p-inputtext-focus-ring-width) var(--p-inputtext-focus-ring-style) var(--p-inputtext-focus-ring-color);
    outline-offset: var(--p-inputtext-focus-ring-offset);
  }
}

.donate-form .mapboxgl-ctrl-geocoder--icon {
  display: none;
}

.donate-form .geocoder-pin-right {
  display: none;
}

.suggestions-wrapper {
  z-index: 1000;
  position: absolute;
  background-color: white;
  color: black;
  border: 1px solid #ccc;
}
.suggestions-wrapper ul {
  list-style-type: none;
  margin: 0;
}
.suggestions-wrapper li {
  padding: 0.25rem 0.5rem;
}
.suggestions-wrapper li:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}
</style>
