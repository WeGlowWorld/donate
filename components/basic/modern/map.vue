<template>
  <div class="flex-1 flex shadow-xl rounded-lg overflow-hidden h-[30rem]">
    <div
      ref="mapContainer"
      class="h-full w-full"
    />
    <div
      ref="messagesScroll"
      :class="[
        'card cursor-pointer h-full max-w-[90%] flex-shrink-0 transition-all duration-300 ease-in-out border-l border-black border-solid overflow-scroll',
        messagesOpen ? 'w-80': 'w-12',
      ]"
      @scroll="onScroll"
      @click="messagesOpen = !messagesOpen"
    >
      <div class="w-80 h-full">
        <div
          v-for="message in messages"
          :key="`${message.name}-${message.date}`"
          class="message flex flex-col mx-2 py-4 text-sm"
        >
          <div class="flex justify-between">
            <div><b>{{ message.name }}</b></div>
            <div>{{ message.date }}</div>
          </div>
          <div class="flex justify-between">
            <div>{{ message.description }}</div>
            <div class="w-12 text-right shrink-0">
              <b>{{ message.amount }}</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import 'mapbox-gl/dist/mapbox-gl.css';
import type { Map, MapboxOptions, Marker } from 'mapbox-gl';
import mapboxgl from 'mapbox-gl';
import dayjs from 'dayjs';

export default defineComponent({
  name: 'BasicModernMap',
  setup() {
    return {
      campaignStore: ref(useCampaignStore()),
      donationStore: ref(useDonationsStore()),
    };
  },
  data() {
    return {
      messagesOpen: false,
      map: null as unknown as Map,
      markers: [] as Marker[],
      fetchingNew: false,
    };
  },
  computed: {
    currency() {
      return this.campaignStore.content?.org.currencySign;
    },
    messages() {
      return this.donationStore.messages.map(v => ({
        ...v,
        amount: `${this.currency} ${v.amount}`,
        date: dayjs(v.date).format('DD/MM/YYYY'),
      }));
    },
  },
  mounted() {
    mapboxgl.accessToken = 'pk.eyJ1Ijoid2VnbG93IiwiYSI6ImNsYXdsMG1idDBleGUzcHA0bXV6czQyaWMifQ.2JmaCHMYFmNLPQrzNQkv9A' as string;
    const basemap = this.campaignStore.content?.base.map;
    if (!basemap) return;

    // @ts-expect-error Just writing something
    this.map = new mapboxgl.Map({
      container: this.$refs.mapContainer,
      style: 'mapbox://styles/weglow/clbe7xzo2000514t825nyh63a',
      center: [basemap[1], basemap[0]],
      zoom: basemap[2],
    } as MapboxOptions);

    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.addControl(new mapboxgl.AttributionControl());
    this.map.addControl(new mapboxgl.FullscreenControl());

    this.map.on('load', () => {
      this.updateMap();
      this.map.on('moveend', () => {
        this.updateMarkers();
      });
    });
  },
  unmounted() {
    this.map.remove();
  },
  methods: {
    async onScroll() {
      if (this.fetchingNew) return;
      const container = this.$refs.messagesScroll as HTMLElement;
      if (container && this.donationStore.hasMore) {
        const nearBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 10;
        if (nearBottom) {
          this.fetchingNew = true;
          await this.donationStore.nextPage(this.$route.params.campaignSlug as string, this.$route.params.orgSlug as string);
          this.fetchingNew = false;
        }
      }
    },
    updateMap() {
      const candlesGeojson = {
        type: 'FeatureCollection',
        features: this.donationStore.coords.map(l => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [l[1], l[0]],
          },
          properties: {},
        })),
      };

      if (this.map.getLayer('points')) {
        this.map.removeLayer('points');
      }
      if (this.map.getSource('candles')) {
        this.map.removeSource('candles');
      }

      this.map.addSource('candles', {
        type: 'geojson',
        // eslint-disable-next-line
        data: candlesGeojson as any,
        cluster: true,
        clusterRadius: 30,
      });

      this.map.addLayer({
        id: 'points',
        type: 'symbol',
        source: 'candles',
        layout: {
          'text-field': ['get', 'title'],
          'text-font': ['Prompt', 'Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 1.25],
          'text-anchor': 'top',
        },
      });
      this.map.on('sourcedata', () => this.updateMarkers());
    },
    updateMarkers() {
      const features = this.map.querySourceFeatures('candles', {
        sourceLayer: 'symbol',
      });

      const newMarkers = [] as Marker[];

      features.forEach((feature) => {
        // eslint-disable-next-line
        const coords = (feature.geometry as any).coordinates;
        const props = feature.properties;

        if (!props) {
          return;
        }

        const el = document.createElement('div');
        el.className = 'marker';
        const sanitizedURL = this.campaignStore.variable('icon', this.$i18n.locale)?.replace(/\(/g, '\\(').replace(/\)/g, '\\)');
        el.style.backgroundImage = `url(${sanitizedURL})`;

        if (props.cluster) {
          el.innerHTML = `<span class="marker_icon">${props.point_count}</span>`;
        }

        // eslint-disable-next-line
        const marker = new mapboxgl.Marker(el).setLngLat(coords).addTo(this.map as any);
        newMarkers.push(marker);
      });

      // Remove old markers
      this.markers.forEach(marker => marker.remove());

      // Update markers array
      this.markers = newMarkers;
    },
  },
});
</script>

<style>
.fs-map {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: -1rem;
  z-index: 10000;
  background-color: #f5f5f5;
}

.map-container {
  height: 30rem;
  flex: 1 1 0;
}

.mapboxgl-ctrl-attrib {
  display: none;
}

.marker {
  background-size: cover;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
}

.marker_icon {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 3;
  right: -1rem;
  top: -0.75rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  border: #ffffff 1px;
  color: var(--t-title-text);
  background-color: var(--t-title);
  font-size: 12px;
  font-weight: bold;
}

.fs-button {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  width: 2rem;
  height: 2rem;
  z-index: 100;
  background-color: white;
  color: black;
}

.card {
  background-color: var(--t-card);
  color: var(--t-card-text);
}

.message:not(:last-child) {
  border-bottom: 1px solid var(--t-card-text);
}
</style>
