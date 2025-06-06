<template>
  <div class="flex flex-col max-w-screen justify-center items-center">
    <div class="h-[60vh] flex justify-center items-center">
      <canvas
        ref="canvas"
        :height="1920"
        :width="1080"
        class="border h-[30rem] md:h-[60vh] max-h-screen shadow-xl"
      />
    </div>
    <div class="flex items-center m-4 w-full justify-center">
      <div class="w-12 h-12 flex justify-center items-center">
        <button
          class="h-6 w-10 border rounded-sm border-black bg-white"
          @click="$emit('update:modelValue', 'landscape')"
        />
      </div>
      <div class="w-12 h-12 flex justify-center items-center">
        <button
          :style="{ backgroundColor: `var(--d-accent)` }"
          class="h-10 w-6 border rounded-sm border-black"
        />
      </div>
      <div class="w-12 h-12 flex justify-center items-center">
        <button
          class="h-8 w-8 border rounded-sm border-black bg-white"
          @click="$emit('update:modelValue', 'square')"
        />
      </div>
    </div>
    <div class="flex gap-4">
      <prime-button
        severity="success"
        :label="$t('thanks.download')"
        @click="downloadImage"
      />
      <prime-button
        id="share-button-tag-id"
        as="a"
        severity="info"
        :label="$t('thanks.share')"
        @click="shareImage"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Button as PrimeButton } from 'primevue';

export default defineComponent({
  name: 'PortraitCanvas',
  components: {
    PrimeButton,
  },
  props: {
    modelType: {
      type: String,
      default: 'portrait',
    },
    type: {
      type: Object as PropType<{
        icon: string;
        logo: string;
        bgColor: string;
        name: string;
        desc: string;
      }>,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  mounted() {
    this.generateImage();
  },
  methods: {
    async generateImage() {
      const canvas = this.$refs.canvas as HTMLCanvasElement;
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

      const [logo, weglowText, icon] = await Promise.all([
        this.loadImage(this.type.logo),
        this.loadImage('https://weglowdashboard.blob.core.windows.net/weglow-data/weglow.svg'),
        this.loadImage(this.type.icon),
      ]);

      // BG Gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#FFFFFF');
      gradient.addColorStop(0.8, '#DDDDDD');
      gradient.addColorStop(1, '#FFFFFF');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // WeGlow text
      ctx.globalAlpha = 0.4;
      const textH = canvas.height * 0.05;
      const textW = textH * (weglowText.width / weglowText.height);
      ctx.drawImage(weglowText, 10, canvas.height - textH - 10, textW, textH);
      ctx.globalAlpha = 1;

      // Logo
      let logoH = canvas.height * 0.3;
      let logoW = logoH * (logo.width / logo.height);
      if (logoW > canvas.width * 0.7) {
        logoW = canvas.width * 0.7;
        logoH = logoW * (logo.height / logo.width);
      }
      ctx.drawImage(logo, (canvas.width - logoW) / 2, 20, logoW, logoH);

      // Icon
      const iconH = canvas.height * 0.4;
      const iconW = iconH * (icon.width / icon.height);
      ctx.fillStyle = this.type.bgColor;
      ctx.drawImage(icon, (canvas.width - iconW) / 2, (canvas.height - iconH) / 2, iconW, iconH);

      // Text
      let fontHeight: number;
      switch (true) {
        case this.type.desc.length > 100:
          fontHeight = 3;
          break;
        case this.type.desc.length > 20:
          fontHeight = 4;
          break;
        default:
          fontHeight = 5;
          break;
      }
      ctx.font = `bold ${fontHeight}rem Titillium Web`;
      ctx.fillStyle = '#333333';
      ctx.textAlign = 'center';
      const lines = [] as string[];
      if (this.type.desc) {
        const words = this.type.desc.split(' ');
        let line = '';
        for (let i = 0; i < words.length; i++) {
          const testLine = line + words[i] + ' ';
          const metrics = ctx.measureText(testLine);
          const testWidth = metrics.width;

          if (testWidth > canvas.width) {
            lines.push(line);
            line = words[i] + ' ';
          }
          else if (i === words.length - 1 && lines.length === 0) {
            lines.push(testLine);
          }
          else {
            line = testLine;
          }
        }
        for (let i = 0; i < Math.min(4, lines.length); i++) {
          ctx.fillText(`${i === 0 ? '"' : ''}${lines[i]}${i === lines.length - 1 ? '"' : ''}`.replace(' "', '"'), canvas.width / 2, canvas.height * 0.90 - (lines.length - i) * 52);
        }
      }
      ctx.font = 'bold 3rem Titillium Web';
      if (this.type.name && this.type.name !== '-') ctx.fillText(`${this.type.desc ? '- ' : ''} ${this.type.name}`, canvas.width / 2, canvas.height * 0.90);
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
      link.download = 'weglow-donation.png';
      link.click();
    },
    shareImage() {
      const canvas = this.$refs.canvas as HTMLCanvasElement;
      const imageData = canvas.toDataURL('image/png');

      // Convert dataURL to blob and share
      fetch(imageData)
        .then(res => res.blob())
        .then((blob) => {
          const file = new File([blob], 'story.png', { type: 'image/png' });
          const url = `${window.location.origin}/o/${this.$route.params.orgSlug}/c/${this.$route.query.campaignSlug}`;
          if (navigator.canShare && navigator.canShare({ files: [file], url })) {
            navigator.share({
              files: [file],
              url,
              title: 'test',
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
