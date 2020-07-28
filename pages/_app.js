import 'styles/main.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStars, faArrowSquareUp, faArrowSquareRight, faArrowSquareDown, faArrowSquareLeft, faTrophyAlt } from '@fortawesome/pro-duotone-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

library.add(faStars, faArrowSquareUp, faArrowSquareRight, faArrowSquareDown, faArrowSquareLeft, faTrophyAlt, faGithub)

export default function MyApp ({ Component, pageProps }) {
  return <Component {...pageProps} />
}
