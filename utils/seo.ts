export const varsToSeo = ({ title, description, image }: { title?: string; description?: string; image?: string }): {
  title?: string;
  description?: string;
  contentType: 'text/html; charset=utf-8';
  robots: 'index, follow';

  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogLocale: 'nl-BE';
  ogUrl: 'https://donate.weglow.world/o/feestvarken-vzw/postnl';
  ogType: 'website';
  twitterCard: 'summary_large_image';
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  viewport: 'width=device-width, initial-scale=1';
  charset: 'utf-8';
  author: 'WeGlow';
} => ({
  title,
  description,
  contentType: 'text/html; charset=utf-8',
  robots: 'index, follow',

  ogTitle: title,
  ogDescription: description,
  ogImage: image,
  ogImageAlt: title,
  ogLocale: 'nl-BE',
  ogUrl: 'https://donate.weglow.world/o/feestvarken-vzw/postnl',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: image,
  viewport: 'width=device-width, initial-scale=1',
  charset: 'utf-8',
  author: 'WeGlow',
});
