<template>
  <div class="flex flex-col items-center p-4 -mx-4 md:mx-auto">
    <canvas
      ref="canvas"
      :height="type?.canvas.height"
      :width="type?.canvas.width"
      class="border mb-4 w-full mx-auto"
    />
    <div class="flex items-center m-4">
      <div class="w-16 h-16 flex justify-center items-center">
        <button
          :style="{
            backgroundColor: type?.title === types[0] ? `var(--d-accent)` : 'white',
          }"
          class="h-10 w-16 border rounded-sm border-black"
          @click="selectType(types[0])"
        />
      </div>
      <div class="w-16 h-16 flex justify-center items-center">
        <button
          :style="{
            backgroundColor: type?.title === types[1] ? `var(--d-primary)` : 'white',
          }"
          class="h-16 w-8 border rounded-sm border-black"
          @click="selectType(types[1])"
        />
      </div>
      <div class="w-16 h-16 flex justify-center items-center">
        <button
          :style="{
            backgroundColor: type?.title === types[2] ? `var(--d-accent)` : 'white',
          }"
          class="h-12 w-12 border rounded-sm border-black"
          @click="selectType(types[2])"
        />
      </div>
    </div>
    <div class="flex gap-4">
      <prime-button
        severity="info"
        @click="downloadImage"
      >
        Download Image
      </prime-button>
      <prime-button
        severity="help"
        @click="shareOnInstagram"
      >
        Share to socials
      </prime-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Button as PrimeButton } from 'primevue';
import { sharePossibilities, type SharePossibility } from './canvasHelper';

export default defineComponent({
  name: 'SocialCanvas',
  components: {
    PrimeButton,
  },
  props: {
    icon: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      default: 'https://weglowdashboard.blob.core.windows.net/weglow-data/weglow-orange.svg',
    },
    bgColor: {
      type: String,
      default: '#ffffff',
    },
    name: {
      type: String,
      required: false,
    },
    desc: {
      type: String,
      required: false,
    },
  },
  setup() {
    return {
      types: sharePossibilities.map((s: SharePossibility) => s.title),
    };
  },
  data() {
    return {
      type: sharePossibilities.find((s: SharePossibility) => s.title === 'landscape'),
    };
  },
  mounted() {
    this.generateImage();
  },
  methods: {
    selectType(t: string) {
      this.type = sharePossibilities.find((s: SharePossibility) => s.title === t);
      this.generateImage();
    },
    async generateImage() {
      const canvas = this.$refs.canvas as HTMLCanvasElement;
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

      const [logo, weglow, weglowText, icon] = await Promise.all([
        this.loadImage(this.logo),
        this.loadImage('https://weglowdashboard.blob.core.windows.net/weglow-data/weglow-orange.svg'),
        this.loadImage('https://weglowdashboard.blob.core.windows.net/weglow-data/weglow.svg'),
        this.loadImage(this.icon),
      ]);
      // BG Gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#FFFFFF'); // Start color (Peach)
      gradient.addColorStop(0.8, '#DDDDDD'); // End color (Orange)
      gradient.addColorStop(1, '#FFFFFF'); // End color (Orange)
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // WeGlow logo
      const weglowH = Math.min(canvas.width * 0.7, canvas.height * 1.2);
      const weglowW = weglowH * (weglow.width / weglow.height);
      ctx.globalAlpha = 0.3;
      ctx.drawImage(weglow, canvas.width - weglowW * 0.9, canvas.height - weglowH * 0.9, weglowW, weglowH);
      // WeGlow text
      const textH = canvas.height * 0.1;
      const textW = textH * (weglowText.width / weglowText.height);
      ctx.drawImage(weglowText, 10, canvas.height - textH - 10, textW, textH);
      ctx.globalAlpha = 1;

      // Logo
      let logoH = canvas.height * 0.2;
      let logoW = logoH * (logo.width / logo.height);
      if (logoW > canvas.width * 0.3) {
        logoW = canvas.width * 0.3;
        logoH = logoW * (logo.height / logo.width);
      }
      ctx.ellipse(canvas.width / 2, logoH / 2 + 10, logoW / 2 + 40, logoH / 2 + 40, 0, 0, 2 * Math.PI);
      ctx.fillStyle = this.bgColor;
      ctx.fill();
      ctx.drawImage(logo, canvas.width / 2 - logoW / 2, 10, logoW, logoH);

      // Icon
      const iconH = canvas.height * 0.25;
      const iconW = iconH * (icon.width / icon.height);
      ctx.fillStyle = this.bgColor;
      ctx.drawImage(icon, (canvas.width - iconW) / 2, (canvas.height - iconH) * 2 / 5, iconW, iconH);

      // Text
      ctx.font = 'bold 3rem Titillium Web';
      ctx.fillStyle = `#f97316`;
      ctx.textAlign = 'center';
      // const testWidth = ctx.measureText(text).width;
      // if (testWidth > canvas.width - 10) ctx.font = 'bold 2rem Titillium Web';
      if (this.desc) ctx.fillText(`"${this.desc}"`, canvas.width / 2, canvas.height * 0.75);
      ctx.font = 'bold 2rem Titillium Web';
      if (this.name) ctx.fillText(`${this.desc ? '- ' : ''} ${this.name}`, canvas.width / 2, canvas.height * 0.75 + 50);
    },
    loadImage(src: string) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return new Promise<any>((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous'; // Important for cross-origin images
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
        return img;
      });
    },
    downloadImage() {
      const canvas = this.$refs.canvas as HTMLCanvasElement;
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'custom-image.png';
      link.click();
    },
    shareOnInstagram() {
      const canvas = this.$refs.canvas as HTMLCanvasElement;
      const imageData = canvas.toDataURL('image/png');

      // Convert dataURL to blob and share
      fetch(imageData)
        .then(res => res.blob())
        .then((blob) => {
          const file = new File([blob], 'story.png', { type: 'image/png' });

          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            navigator.share({
              files: [file],
              title: 'Share your story',
              text: 'Check this out!',
            });
          }
          else {
            alert('Sharing not supported. Download manually.');
          }
        });
    },
  },
});
</script>
