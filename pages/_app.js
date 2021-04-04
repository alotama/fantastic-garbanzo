import '../styles/normalize.css'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

// export function reportWebVitals(metric) {
//   console.log(metric)
// }

export default MyApp
