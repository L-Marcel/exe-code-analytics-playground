import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html translate="no">
        <Head>
          <meta name="google" content="notranslate"/>
          <title>Exe Code Analytics</title>
        </Head>
        <body>
          <Main/>
          <NextScript/>
        </body>
      </Html>
    );
  };
};