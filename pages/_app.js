import 'styles/main.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fad } from '@fortawesome/pro-duotone-svg-icons'

library.add(fad)

export default function MyApp ({ Component, pageProps }) {
  return <Component {...pageProps} />
}
