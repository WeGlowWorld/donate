export function darkenHexColor(hex: string, factor: number): string {
  console.log(hex);
  if (!/^#[0-9A-Fa-f]{6}$/i.test(hex)) throw new Error('Invalid hex color format.');
  return `#${hex.slice(1).match(/../g)!
    .map(c => Math.max(0, Math.min(255, Math.floor(parseInt(c, 16) * factor)))
      .toString(16).padStart(2, '0'))
    .join('')}`;
}
