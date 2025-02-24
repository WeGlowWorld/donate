<template>
  <div
    v-if="imagesLoaded"
    class="postnl-page min-h-screen flex relative bg-white text-black px-4 pt-8"
  >
    <div class="max-w-5xl w-full mx-auto pb-48 flex flex-col gap-16">
      <div class="relative max-h-[40rem] mx-auto">
        <img
          class="rounded-lg shadow-lg h-full w-full object-cover"
          src="https://weglowdashboard.blob.core.windows.net/weglow-data/postnl-cover.png"
        >
      </div>
      <prime-form
        v-if="!result"
        :initial-values="formValues"
        :resolver="resolver"
        class="w-full h-full grid-cols-2 grid gap-x-2 gap-y-2 md:grid-cols-4 p-4 bg-[#f1f1f1] border-2 border-[#f46808] rounded-lg shadow-lg"
        @submit="submit"
      >
        <h1 class="text-2xl sm:text-4xl font-bold col-span-full">
          Verzendlabel aanvragen
        </h1>
        <h3 class="col-span-full mt-8">
          Informatie
        </h3>
        <custom-input-text
          v-model="formValues.email"
          class="col-span-full"
          required
          name="email"
        />
        <custom-input-text
          v-model="formValues.firstName"
          class="md:col-span-2"
          required
          name="firstName"
        />
        <custom-input-text
          v-model="formValues.lastName"
          class="md:col-span-2"
          required
          name="lastName"
        />
        <h3 class="col-span-full mt-8">
          Afzendadres
        </h3>
        <custom-input-text
          v-model="formValues.street"
          class="col-span-2"
          required
          name="street"
        />
        <custom-input-text
          v-model="formValues.houseNumber"
          required
          name="houseNumber"
        />
        <custom-input-text
          v-model="formValues.houseNumberSuffix"
          name="houseNumberSuffix"
        />
        <custom-input-text
          v-model="formValues.town"
          class="md:col-span-2"
          required
          name="town"
        />
        <custom-input-text
          v-model="formValues.postalCode"
          required
          name="postalCode"
        />
        <div class="w-full flex justify-end col-span-full mt-8">
          <button
            :disabled="loading"
            type="submit"
            class="bg-[rgb(0,26,115)] text-lg text-white font-bold py-2 px-4 rounded-lg hover:shadow-lg"
          >
            Aanvragen
          </button>
        </div>
      </prime-form>
      <div
        v-else
        class="w-full h-full flex flex-col gap-x-2 gap-4 p-4 bg-[#f1f1f1] border-2 border-[#f46808] rounded-lg shadow-lg"
      >
        <h1 class="text-2xl font-bold col-span-full">
          Dankzij jou beleeft een kind in armoede een fijne verjaardag
        </h1>
        <div
          class="flex flex-col gap-2"
          role="dialog"
        >
          <p>Je label kan je hieronder downloaden.</p>
          <div class="flex justify-start">
            <a
              class="bg-orange-600 text-white font-bold py-2 px-4 rounded-lg hover:shadow-lg"
              :download="`Verzendlabel_${result?.Barcode}.pdf`"
              :href="`data:application/pdf;base64,${result?.Labels[0].Content}`"
            >
              Download label
            </a>
          </div>
        </div>
      </div>
      <section>
        <div>
          <h2>
            Schenk een pakje aan een kind in armoede
          </h2>
          <h3 class="">
            Verstuur het gratis met PostNL
          </h3>
        </div>
        <p>
          In België groeit 1 op de 7 kinderen op in armoede.
          Voor hen is er geen feestje, geen cadeautje, geen traktatie voor in de klas…
          Soms blijven ze zelfs thuis op hun verjaardag, uit schaamte.
          En daar willen we samen met jou iets aan veranderen.
        </p>
        <p>
          Koop een nieuw stuk speelgoed en verzend het gratis.
          Vraag je verzendlabel aan via het formulier en geef een kind een onvergetelijke verjaardag.
          Liever een <a href="https://donate.weglow.world/o/feestvarken-vzw/c/4H3OBDBO"><b>gift</b></a>? Dat kan ook.
        </p>
      </section>
      <section>
        <h2>
          Zo kan jij helpen!
        </h2>
        <ol class="list-decimal ml-5">
          <li>Koop een <b>nieuw stuk speelgoed</b> en verpak het in een stevige doos.</li>
          <li>Vraag een <b>gratis verzendlabel</b> aan via het formulier. Dit kan tot en met 6 april 2025.</li>
          <li>Klik bij het formulier op “<b>Aanvragen</b>”. Je krijgt een pdf met het verzendlabel. Dit print je en kleef je op jouw doos.</li>
          <li>
            Breng je pakje naar een <b>PostNL-punt</b>. Vind
            <a
              href="https://www.postnl.be/locatiewijzer/"
              target="_blank"
            >
              <b>hier</b>
            </a> een PostNL-punt in jouw buurt.
          </li>
        </ol>
      </section>
      <section>
        <h2>
          Wat gebeurt er met mijn pakje
        </h2>
        <p>
          Feestvarken stelt met jouw cadeautje een leuk verjaardagspakket samen en bezorgt ze met PostNL aan sociale huizen.
          Zij zorgen dat ze goed bij de ouders terechtkomen.
          Zo kunnen zij hun kind een cadeautje geven, traktaties meegeven voor in de klas én een klein feestje organiseren.
          Zo gaat er géén verjaardag onopgemerkt voorbij.
        </p>
      </section>
      <section>
        <h2>
          Liever een gift? Brand een verjaardagskaarsje!
        </h2>
        <p>
          Geen tijd om een pakje te sturen? Met een donatie help je net zo goed. Dit doe je <a href="https://donate.weglow.world/o/feestvarken-vzw/c/4H3OBDBO"><b>hier</b></a>.
          Feestvarken vzw koopt er dan iets moois mee voor de verjaardag van een kindje in armoede.
          Bedankt!
        </p>
      </section>
    </div>
    <a
      href="https://donate.weglow.world/o/feestvarken-vzw/c/4H3OBDBO"
      class="h-24 w-24 sm:h-32 sm:w-32 fixed bottom-4 right-4 bg-[#F56900] flex flex-col justify-center items-center rounded-full p-4 sm:p-8 shadow-lg hover:scale-105 duration-100 cursor-pointer"
    >
      <img
        class="block h-12 w-12 sm:h-20 sm:w-20"
        src="https://weglowdashboard.blob.core.windows.net/feestvarkenvzw/feestvarkenCandle.png"
      >
      <span class="text-white font-bold text-lg sm:text-xl">Doneer</span>
    </a>
  </div>
</template>

<script lang="ts">
import { Form as PrimeForm, type FormSubmitEvent } from '@primevue/forms';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { useFavicon } from '@vueuse/core';
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
    const title = 'Feestvarken x PostNL';
    const desc = 'In België groeit 1 op de 7 kinderen op in armoede. Voor hen is er geen feestje, geen cadeautje, geen traktatie voor in de klas… Soms blijven ze zelfs thuis op hun verjaardag, uit schaamte. En daar willen we samen met jou iets aan veranderen.';
    const img = 'https://weglowdashboard.blob.core.windows.net/weglow-data/postnl-cover.png';

    useSeoMeta(varsToSeo({
      title,
      description: desc,
      image: img,
    }));

    useFavicon('https://weglowdashboard.blob.core.windows.net/weglow-data/logo-postnl-outline.svg');

    return {
      resolver: zodResolver(z.object({
        productId: z.string().uuid(),
        email: z.string().nonempty('required').email('email'),
        firstName: z.string().nonempty('required'),
        lastName: z.string().nonempty('required'),
        houseNumber: z.string().nonempty('required'),
        houseNumberSuffix: z.string().optional(),
        street: z.string().nonempty('required'),
        postalCode: z.string().nonempty('required'),
        town: z.string().nonempty('required'),
        agreedToTerms: z.literal(true),
      })),
    };
  },
  data() {
    return {
      imagesLoaded: false,
      loading: false,
      result: undefined as {
        Barcode: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Labels: Array<any>;
      } | undefined,
      formValues: {
        productId: '7237d06e-79ca-4e9d-a19d-894e264e7d99',
        email: '',
        firstName: '',
        lastName: '',
        houseNumber: '',
        houseNumberSuffix: '',
        street: '',
        postalCode: '',
        town: '',
        agreedToTerms: true,
      },
    };
  },
  async mounted() {
    this.$i18n.locale = 'nl-BE';
    const style = document.documentElement.style;
    style.setProperty('--p-primary-200', 'var(--p-orange-200)');
    style.setProperty('--p-primary-300', 'var(--p-orange-300)');
    style.setProperty('--p-primary-400', 'var(--p-orange-400)');
    style.setProperty('--p-primary-500', 'var(--p-orange-500)');
    style.setProperty('--p-primary-600', 'var(--p-orange-600)');
    style.setProperty('--p-primary-700', 'var(--p-orange-700)');
    style.setProperty('--p-primary-800', 'var(--p-orange-800)');
    try {
      await loadImagesAsync([
        'https://weglowdashboard.blob.core.windows.net/feestvarkenvzw/feestvarkenCandle.png',
        'https://weglowdashboard.blob.core.windows.net/weglow-data/postnl-cover.png',
        'https://weglowdashboard.blob.core.windows.net/weglow-data/postnl-logo.png',
        'https://weglowdashboard.blob.core.windows.net/weglow-data/feestvarken.svg',
        'https://weglowdashboard.blob.core.windows.net/weglow-data/logo-postnl-outline.svg',
      ]);
      this.imagesLoaded = true;
    }
    catch (err) {
      console.error(err);
    }
  },
  methods: {
    async submit(e: FormSubmitEvent) {
      if (!e.valid) return;
      try {
        this.loading = true;
        this.result = await $fetch(`${useRuntimeConfig().public.apiUrl}/postnl/label`, {
          method: 'POST',
          body: this.formValues,
        });
      }
      catch (err) {
        console.error(err);
      }
      finally {
        this.loading = false;
      }
    },
  },
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,400..900;1,400..900&display=swap');
.postnl-page {
  font-family: 'Hanken Grotesk', sans-serif;
}
.img-icon {
  @apply absolute bottom-4 h-24 md:h-40;
}
section {
  @apply flex flex-col gap-4;
}
section h2 {
  @apply text-xl sm:text-3xl font-bold;
}
h1 {
  color: rgb(0,26,115)
}
h2 {
  color: #f46808;
}
h3 {
  color: rgb(0,26,115);
  @apply text-lg font-semibold sm:text-xl italic;
}
section a {
  color: #f46808;
}
.text-bold, b {
  color: #f46808;
}
</style>
