import '../styles/globals.css'
import Layout from '../modules/layout'

function MyApp({ Component, pageProps }) {
  return ( 
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp
