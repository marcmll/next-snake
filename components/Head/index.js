import Head from 'next/head'

export default function HeadComponent () {
  return (
    <Head>
      <title>Snake | Built by Marc Müller</title>
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <meta name='author' content='Marc Müller' />
      <meta name='description' content='Minimal Snake browser game built, using Next.js' />
      <meta name='keywords' content='snake, snake game, browser game, nextjs, react' />

      {/* OG Meta Tags */}
      <meta property='og:url' content='https://next-snake.vercel.app/' />
      <meta property='og:type' content='website' />
      <meta property='og:site_name' content='Next-Snake' />
      <meta property='og:title' content='Next-Snake | Built by Marc Müller' />
      <meta property='og:description' content='Minimal Snake browser game, built using Next.js' />
      <meta property='og:image' content='https://next-snake.vercel.app/twitter-summary-card.jpg' />
      <meta property='og:image:width' content='512' />
      <meta property='og:image:height' content='512' />

      {/* Twitter Card */}
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:url' content='https://next-snake.vercel.app/' />
      <meta name='twitter:site' content='@seven11nash' />
      <meta name='twitter:title' content='Next-Snake | Built by Marc Müller' />
      <meta name='twitter:description' content='Minimal Snake browser game, built using Next.js' />
      <meta name='twitter:image' content='https://next-snake.vercel.app/twitter-summary-card.jpg' />
    </Head>
  )
}
