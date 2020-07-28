import 'styles/main.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar, faArrowUp, faArrowRight, faArrowDown, faArrowLeft, faTrophy } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

library.add(faStar, faArrowUp, faArrowRight, faArrowDown, faArrowLeft, faTrophy, faGithub)

export default function MyApp ({ Component, pageProps }) {
  return <Component {...pageProps} />
}
