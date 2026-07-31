import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Cognilabs — IT Services & Software Development',
    short_name: 'Cognilabs',
    description:
      'Leading IT company in Tashkent, Uzbekistan. Web, mobile, AI, Telegram bots, CRM/ERP and digital products.',
    start_url: '/en',
    display: 'standalone',
    background_color: '#0b0b0d',
    theme_color: '#0b0b0d',
    icons: [
      { src: '/logo1.png', sizes: '192x192', type: 'image/png' },
      { src: '/logo1.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
