import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div style={{textAlign: 'center'}}>
        <Head>
          <title>Payment Demo</title>
          <meta name="description" content="Payment Demo" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </div>
    </>
  );
}
