<template>
  <div>
    <prime-form
      class="donate-form w-full h-full flex flex-col gap-x-2 gap-y-4 grid-cols-2"
      :resolver="resolver"
      :initial-values="formValues"
      @submit="submit"
    >
      <div class="flex justify-between w-full max-w-full mx-auto col-span-2">
        <a
          :href="orgStore.content?.general.website"
          target="_blank"
        >
          <img
            :src="orgStore.variable('logo')"
            class="max-h-24 h-full object-contain"
          >
        </a>
        <div
          v-if="country === 'NL'"
          class="w-24 h-24"
        >
          <img
            class="h-full"
            src="https://afrianafoundation.org/wp-content/uploads/2014/02/anbi-logo.png"
          >
        </div>
      </div>
      <h2>
        {{ $t('donate.donationTo', { org: orgStore.variable('org_name') }) }}
      </h2>
      <select-button
        v-if="orgStore.content?.general.allowRecurring"
        v-model="recurring"
        :options="[{ value: 'oneTime', label: $t('donate.oneTime') }, { value: 'monthly', label: $t('donate.monthly') }]"
        option-value="value"
        option-label="label"
        size="small"
        class="monthly-toggle"
      />
      <p
        v-if="formValues.recurring"
        class="text-sm"
      >
        {{ $t('donate.recurringWarning') }}
      </p>
      <custom-input-number
        v-model="formValues.amount"
        positive
        name="amount"
        :currency="orgStore.content?.general.currency"
        :after="recurring === 'monthly' ? `/${$t('donate.month')}` : undefined"
      />
      <div
        v-if="country === 'UK'"
        class="border border-orange-300 bg-orange-100 p-2 rounded-lg w-full flex flex-col gap-2"
      >
        <h4 class="font-semibold">
          <i class="pi pi-star text-orange-500 mr-2" /> {{ $t('donate.supportOurPlatform') }}
        </h4>
        <p class="text-gray-700 text-sm">
          {{ $t('donate.supportOurPlatformDescription') }}
        </p>
        <div>
          <div class="flex gap-2 items-center tip-buttons">
            <checkbox
              v-model="enableTips"
              size="small"
              binary
              :pt:box:style="enableTips ? 'background-color: var(--p-orange-500); border-color: var(--p-orange-500);' : ''"
            />
            <div
              v-if="enableTips"
              class="flex gap-2 items-center"
            >
              <div class="flex gap-2">
                <Button
                  :class="{ 'custom-active': selectedTip === 10 }"
                  label="10%"
                  @click="selectTip(10)"
                />
                <Button
                  :class="{ 'custom-active': selectedTip === 12 }"
                  label="12%"
                  @click="selectTip(12)"
                />
                <Button
                  :class="{ 'custom-active': selectedTip === 15 }"
                  label="15%"
                  @click="selectTip(15)"
                />
              </div>
              <span
                v-if="formValues.tip !== undefined && formValues.tip > 0"
                class="text-sm"
              >
                =
              </span>
              <input-number
                v-model="formValues.tip"
                :currency="orgStore.content?.general.currency"
                mode="currency"
                size="small"
                :placeholder="$t('donate.otherTip')"
              />
            </div>
            <span
              v-else
            >{{ $t('donate.enableTips') }}</span>
          </div>
        </div>
        <p class="text-xs text-gray-700">
          <span class="pi pi-info-circle text-sm" /> {{ $t('donate.proceedsInfo') }}
        </p>
      </div>
      <div class="flex flex-col md:flex-row gap-2">
        <custom-input-text
          v-model="formValues.name"
          name="name"
          class="flex-1"
        />
        <custom-input-text
          v-model="formValues.email"
          name="email"
          class="flex-1"
        />
      </div>
      <custom-input-text
        v-model="formValues.description"
        name="description"
      />

      <form-field
        v-if="hasLocation"
        name="coords"
        :initial-value="formValues.address"
        class="relative z-10"
      >
        <label
          class="font-semibold"
          for="coords"
        >{{ $t(`fields.coords.name`) }}</label>
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
          v-for="key in Object.keys(orgStore.content.billing)"
          :key="key"
          class="text-sm"
        >
          <b>{{ $t(`donate.${key}`) }}: </b> {{ (orgStore.content.billing as any)[key] }}
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
import { $t } from '@primevue/themes';
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
        tip: undefined as number | undefined,
        email: '',
        name: '',
        description: '',
        address: '',
        anonymous: false,
        recurring: false,
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
      recurring: 'oneTime',
      wantsFiscal: true,
      map: null as unknown as mapboxgl.Map,
      submitting: false,
      enableTips: true,
      selectedTip: 12,
    };
  },
  computed: {
    country() {
      return this.orgStore.content?.general.country;
    },
  },
  watch: {
    recurring(newVal: string) {
      if (!newVal) {
        this.recurring = 'oneTime';
      }
      this.formValues.recurring = newVal === 'monthly';
    },
    'formValues.amount'(newVal: number) {
      if (this.country === 'UK' && this.enableTips) {
        this.formValues.tip = Math.round(newVal * this.selectedTip) / 100;
      }
    },
  },
  mounted() {
    if (this.country === 'UK') {
      // this.enableTips = true;
      this.formValues.tip = Math.round(this.formValues.amount * 12) / 100;
    }
    this.initializeMap();
  },
  methods: {
    selectTip(tip: number) {
      this.enableTips = true;
      this.selectedTip = tip;
      this.formValues.tip = Math.round(this.formValues.amount * tip) / 100;
    },
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
            tip: this.enableTips && this.formValues.tip && this.formValues.tip > 0 ? this.formValues.tip : undefined,
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

.donate-form .mapboxgl-ctrl-geocoder--input {
  border: 1px solid var(--p-inputtext-border-color);
  border-radius: 6px;
  padding: 5px 12px;
  font-size: 0.875rem;
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
  color: black;
  border: 1px solid #ccc;
  background-color: white;
}
.suggestions-wrapper ul {
  list-style-type: none;
  margin: 0;
}
.suggestions-wrapper li {
  padding: 0.25rem 0.5rem;
}
.suggestions-wrapper li:hover {
  background-color: #eeeeee;
  cursor: pointer;
}

.donate-form .monthly-toggle {
  display: flex;
  width: 100%;
}

.donate-form .monthly-toggle .p-togglebutton {
  flex-grow: 1;
  border: 1px solid var(--p-inputtext-border-color);
}

.donate-form .monthly-toggle .p-togglebutton-checked {
  background-color: var(--d-primary);
  color: var(--d-primary-text);
  border-color: var(--d-primary);
}

.tip-buttons .p-button {
  @apply bg-white border text-black border-orange-500;
  @apply text-sm px-3 py-1 !important;
  &:hover {
    @apply bg-orange-600 border-orange-600 text-white !important;
  }
}

.tip-buttons .custom-active {
  @apply text-sm px-3 py-2 bg-orange-500 text-white;
}
</style>
