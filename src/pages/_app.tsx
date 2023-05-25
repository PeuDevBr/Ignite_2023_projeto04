import { AppProps } from "next/app"
import { globaStyles } from "../styles/global"
import { Container} from "../styles/pages/App";
import Header from "../components/Header";
import { CartProvider } from "../context/cartContext";

globaStyles();

export default function MyApp({ Component, pageProps }: AppProps) {

  return (
    <CartProvider>
      <Container>
        <Header/>

        <Component {...pageProps} />
     </Container>
    </CartProvider>
  )
}
