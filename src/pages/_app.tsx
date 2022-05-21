import type { AppProps } from "next/app";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
};

export default MyApp;
