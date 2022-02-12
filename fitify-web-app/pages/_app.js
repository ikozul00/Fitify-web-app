import '../styles/globals.css';
import Layout from '../modules/layout';
import Head from 'next/head';
import { Provider } from "react-redux";
import configureStore from 'redux/store';

function MyApp({ Component, pageProps }) {
  return ( 
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>
        <Provider store={configureStore()}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
    
  );
}

export default MyApp
