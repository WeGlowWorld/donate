<template>
  <div v-if="!allowed">
    Deze organisatie heeft geen toegang tot deze pagina
  </div>
  <div
    v-else-if="imagesLoaded"
    class="min-h-screen flex relative bg-[#F56900] px-4"
  >
    <div class="max-w-5xl w-full mx-auto py-16 text-white flex flex-col gap-16">
      <h1 class="text-2xl sm:text-4xl font-bold text-center mb-4">
        Feestvarken x PostNL
      </h1>
      <div class="relative max-w-3xl mx-auto">
        <img
          class="rounded-lg shadow-lg"
          src="https://www.postnl.be/api/assets/blt43aa441bfc1e29f2/blt921e23b0d59457a9/658edfc632f406040aed6ee5/feestvarken-kind-cadeau.jpg?width=2208&height=1300&fit=crop&format=webp"
        >
        <img
          src="https://weglowdashboard.blob.core.windows.net/weglow-data/postnl-logo.png"
          class="img-icon right-0 xl:-right-20"
        >
        <img
          src="https://weglowdashboard.blob.core.windows.net/weglow-data/feestvarken.svg"
          class="img-icon left-0 xl:-left-20"
        >
      </div>
      <section>
        <div>
          <h2>
            Koop een pakje voor een kind in armoede
          </h2>
          <h3 class="text-lg sm:text-xl italic text-orange-100">
            Verstuur het gratis via PostNL
          </h3>
        </div>

        <p>
          In België groeit 1 kind op 7 op in armoede en krijgt nooit een verjaardagscadeau.
          En dat willen we veranderen, samen met jou en PostNL. Koop een nieuw stuk speelgoed en
          verzend het gratis via een verzendlabel dat je kan aanvragen via het formulier hieronder.
          Geef je liever een <router-link to="/o/feestvarken-vzw/c/4H3OBDBO">gift</router-link>? Dat helpt ook! Samen bezorgen we elk kind een zorgeloze verjaardag.
        </p>
        <p>
          De cadeaus worden als onderdeel van een feestelijke verjaardagsbox bezorgd aan sociale huizen.
          Zij zorgen dat ze goed bij de ouders terechtkomen. Zo kunnen zij hun kind een cadeautje geven en
          traktaties meegeven voor in de klas. Op deze manier beleven alle kinderen een zorgeloze verjaardag!
        </p>
      </section>
      <section>
        <h2>
          Zo kan jij helpen!
        </h2>
        <ol class="list-disc ml-5">
          <li>Koop een nieuw stuk speelgoed en verpak het in een stevige doos.</li>
          <li>Vraag een gratis verzendlabel aan via het formulier op deze pagina. Dit kan tot en met 31 maart.</li>
          <li>Na het invullen van het formulier klik je op “Aanvragen”. Nu krijg je een pdf met het verzendlabel op je scherm. Dit kan je printen en vervolgens op je pakje kleven.</li>
          <li>Geef het pakje af in een PostNL-punt in je buurt. Deze kan je terugvinden in de locatiewijzer. </li>
          <li>De 4 stappen goed gevolgd? Ziezo! Je pakje is verstuurd en jij gaat een kindje heel blij maken. Bedankt voor je bijdrage!</li>
        </ol>
      </section>
      <prime-form
        :initial-values="formValues"
        :resolver="resolver"
        class="w-full h-full flex flex-col md:grid gap-x-2 gap-y-2 grid-cols-2 p-4 bg-white bg-opacity-20 rounded-lg shadow-lg"
        @submit="submit"
      >
        <h2 class="text-lg italic font-bold col-span-full">
          Informatie
        </h2>
        <custom-input-text
          v-model="formValues.email"
          class="col-span-full"
          required
          name="email"
        />
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
        <h2 class="text-lg italic font-bold col-span-full mt-8">
          Adres
        </h2>
        <custom-input-text
          v-model="formValues.address.street"
          required
          name="street"
        />
        <custom-input-text
          v-model="formValues.address.houseNumber"
          required
          name="houseNumber"
        />
        <custom-input-text
          v-model="formValues.address.houseNumberSuffix"
          name="houseNumberSuffix"
        />
        <custom-input-text
          v-model="formValues.remark"
          class="col-span-full mt-8"
          name="remark"
        />
      </prime-form>
      <section>
        <h2>
          Doneer en brand een verjaardagskaarsje!
        </h2>
        <p>
          Wil je geen cadeautje versturen, maar wel je steentje bijdragen? Dan kan je een geldbedrag naar keuze storten en
          zo een <router-link to="/o/feestvarken-vzw/c/4H3OBDBO">virtueel verjaardagskaarsje</router-link> branden!
          Zo kopen wij er iets moois mee voor de verjaardag van een kindje in armoede!
        </p>
      </section>
    </div>
    <router-link
      to="/o/feestvarken-vzw/c/4H3OBDBO"
      class="h-36 w-36 fixed bottom-4 right-4 bg-white text-[#F56900] font-bold text-2xl flex flex-col justify-center items-center rounded-full p-8 shadow-lg hover:scale-105 duration-100 cursor-pointer"
    >
      <img src="https://weglowdashboard.blob.core.windows.net/feestvarkenvzw/feestvarkenCandle.png">
      <span>Doneer</span>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Form as PrimeForm, type FormSubmitEvent } from '@primevue/forms';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';

function loadImagesAsync(urls: string[]): Promise<HTMLImageElement[]> {
  return Promise.all(urls.map(url =>
    new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      img.src = url;
    }),
  ));
}

export default defineComponent({
  name: 'Postnl',
  components: { PrimeForm },
  setup() {
    if (useRoute().params.orgSlug !== 'feestvarken-vzw') useRouter().push('/o/');

    return {
      allowed: useRoute().params.orgSlug === 'feestvarken-vzw',
      packages: [
        {
          label: '0kg - 5kg',
          value: '7237d06e-79ca-4e9d-a19d-894e264e7d99',
        },
        {
          label: '5kg - 10kg',
          value: '91d44416-c59c-4c7f-84cd-af6b06450e0d',
        },
        {
          label: '10kg - 20kg',
          value: '26cb0534-7a39-47fc-b9fd-fbdd9c2141a4',
        },
      ],
      labelResponse: ref(undefined as undefined | {
        Barcode: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Labels: Array<any>;
      }),
      resolver: zodResolver(z.object({
        email: z.string().nonempty('required').email('email'),
        firstName: z.string().nonempty('required'),
        lastName: z.string().nonempty('required'),
        address: z.object({
          houseNumber: z.string().nonempty('required'),
          houseNumberSuffix: z.string().optional(),
          street: z.string().nonempty('required'),
          postalCode: z.string().nonempty('required'),
          town: z.string().nonempty('required'),
        }),
        agreedToTerms: z.literal(true),
        remark: z.string().optional(),
      })),
    };
  },
  data() {
    return {
      imagesLoaded: false,
      formValues: {
        productId: '7237d06e-79ca-4e9d-a19d-894e264e7d99',
        email: '',
        firstName: '',
        lastName: '',
        address: {
          houseNumber: '',
          houseNumberSuffix: '',
          street: '',
          postalCode: '',
          town: '',
        },
        agreedToTerms: true,
        remark: '',
      },
    };
  },
  async mounted() {
    try {
      await loadImagesAsync([
        'https://weglowdashboard.blob.core.windows.net/feestvarkenvzw/feestvarkenCandle.png',
        'https://www.postnl.be/api/assets/blt43aa441bfc1e29f2/blt921e23b0d59457a9/658edfc632f406040aed6ee5/feestvarken-kind-cadeau.jpg?width=2208&height=1300&fit=crop&format=webp',
        'https://weglowdashboard.blob.core.windows.net/weglow-data/postnl-logo.png',
        'https://weglowdashboard.blob.core.windows.net/weglow-data/feestvarken.svg',
      ]);
      this.imagesLoaded = true;
    }
    catch (err) {
      console.error(err);
    }
  },
  methods: {
    async submit(e: FormSubmitEvent) {
      console.log(this.formValues);
      console.log(e);
    },
  },
});
</script>

<style scoped>
.img-icon {
  @apply absolute top-1/2 h-24 md:h-40 -translate-y-12 md:-translate-y-20;
}
section {
  @apply flex flex-col gap-4;
}
section h2 {
  @apply text-xl sm:text-3xl font-bold;
}
section a {
  @apply underline bg-orange-100 px-1 text-orange-500;
}
</style>
