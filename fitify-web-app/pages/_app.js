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
        <meta name="description" content="Fitify is an app that sells workout equipment and clothes"/>
        <title>FITify</title>
        <link rel = "icon" href = 
        "/favicon.ico" 
        type = "image/x-icon"></link>
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
