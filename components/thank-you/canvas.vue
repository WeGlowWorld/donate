<template>
  <div class="flex flex-col items-center p-4 -mx-4">
    <canvas
      ref="canvas"
      :height="type?.canvas.height"
      :width="type?.canvas.width"
      class="border mb-4 w-full"
    />
    <button
      class="px-4 py-2 bg-blue-500 text-white rounded"
      @click="downloadImage"
    >
      Download Image
    </button>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { sharePossibilities, type SharePossibility } from './canvasHelper';

export default defineComponent({
  name: 'SocialCanvas',
  props: {
    type: {
      type: Object as PropType<SharePossibility>,
      default: sharePossibilities[1],
    },
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
  },
  mounted() {
    this.generateImage();
  },
  methods: {
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
      ctx.globalAlpha = 0.4;
      ctx.drawImage(weglow, canvas.width - weglowW * 0.9, canvas.height - weglowH * 0.9, weglowW, weglowH);
      // WeGlow text
      const textH = canvas.height * 0.1;
      const textW = textH * (weglowText.width / weglowText.height);
      ctx.drawImage(weglowText, 20, canvas.height - textH - 20, textW, textH);
      ctx.globalAlpha = 1;

      // Icon
      const iconH = canvas.height * 0.3;
      const iconW = iconH * (icon.width / icon.height);
      // ctx.drawImage(icon, canvas.width / 2 - iconW / 2, 20, iconW, iconH);
      ctx.drawImage(icon, 20, 20, iconW, iconH);

      // Logo
      let logoH = canvas.height * 0.2;
      let logoW = logoH * (logo.width / logo.height);
      if (logoW > canvas.width * 0.3) {
        logoW = canvas.width * 0.3;
        logoH = logoW * (logo.height / logo.width);
      }
      ctx.globalAlpha = 0.6;
      ctx.fillStyle = this.bgColor;
      ctx.ellipse(canvas.width / 2, canvas.height - logoH / 2, logoW / 2 + 20, logoH + 20, 0, 0, 2 * Math.PI);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.drawImage(logo, canvas.width / 2 - logoW / 2, canvas.height - logoH - 20, logoW, logoH);

      // Text
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

<style scoped>
canvas {
  border-color: var('--d-primary');
  border: 1px solid;
}
</style>
