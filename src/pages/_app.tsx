import { AppProps } from "next/app"
import { globaStyles } from "../styles/global"

globaStyles();

export default function MyApp({ Component, pageProps }: AppProps) {

  return <Component {...pageProps} />
}
