<template>
  <prime-form
    class="w-full h-full flex flex-col md:grid gap-x-2 gap-y-4 grid-cols-2"
    :resolver="resolver"
    :initial-values="formValues"
    @submit="submit"
  >
    <div class="max-w-full mx-auto col-span-2 mb-4">
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
    <h2>
      {{ $t('donate.donation') }}
    </h2>
    <custom-input-number
      v-model="formValues.amount"
      required
      positive
      name="amount"
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
      name="coords"
      :initial-value="formValues.address"
      class="relative"
    >
      <label
        class="italic"
        for="coords"
      >{{ $t(`fields.coords.name`) }} *</label>
      <div>
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
    <custom-input-switch
      v-model="formValues.anonymous"
      name="anonymous"
      class="ml-auto col-span-2"
    />
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
      <Button
        type="submit"
        :label="$t('donate.submit')"
      />
    </div>
  </prime-form>
</template>

<script lang="ts">
import { Form as PrimeForm, type FormSubmitEvent } from '@primevue/forms';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { donateKbsZod, donateZod } from '~/models/donation';
import countryOptions from '~/assets/europeanCountries';

export default defineComponent({
  name: 'Donate',
  components: { PrimeForm },
  setup() {
    definePageMeta({
      layout: 'org',
      title: 'WeGlow Donate',
    });

    const orgStore = useOrgStore();
    const route = useRoute();

    if (!route.query['slug']) throw new Error('Campaign slug is required');

    const isKbs = orgStore.content?.general.superAdmin === 'kbs';

    return {
      orgStore: ref(orgStore),
      isKbs,
      countryOptions,
      coords: ref([0, 0]),
      genderOptions: [{ value: 'M', label: 'M' }, { value: 'F', label: 'F' }, { value: 'X', label: 'X' }],
      formValues: ref({
        amount: parseInt(route.query.amount as string) || 123,
        email: '',
        name: '',
        description: '',
        address: ref(''),
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
      resolver: zodResolver(isKbs ? donateKbsZod : donateZod),
      orgSlug: route.params.orgSlug as string,
      campSlug: route.query.slug as string,
    };
  },
  data() {
    return {
      map: null as unknown as mapboxgl.Map,
    };
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
        if (!event.valid) return;
        const checkout = await this.orgStore.donate(
          this.orgSlug,
          this.campSlug,
          {
            ...this.formValues,
            certificate: this.isKbs ? this.formKbsValues : undefined,
            coords: this.coords,
          },
        );
        window.location.href = checkout;
      }
      catch (err) {
        console.error(err);
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
.mapboxgl-ctrl-geocoder {
  width: 100%;
  max-width: 100%;
  box-shadow: none;
  background-color: var(--q-background-color);
}

.mapboxgl-ctrl-geocoder--icon-close {
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

.mapboxgl-ctrl-geocoder input {
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

.mapboxgl-ctrl-geocoder--icon {
  display: none;
}

.geocoder-pin-right {
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
