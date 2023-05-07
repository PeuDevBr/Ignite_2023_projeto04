import { AppProps } from "next/app"
import { globaStyles } from "../styles/global"
import Image from "next/image";

import logoImg from '../assets/Logo.svg'
import { Container, Header } from "../styles/pages/App";

globaStyles();

export default function MyApp({ Component, pageProps }: AppProps) {

  return (
    <Container>
      <Header>
        <Image src={logoImg} width={150} height={150} alt=""/>
      </Header>

      <Component {...pageProps} />
    </Container>
  )
}
