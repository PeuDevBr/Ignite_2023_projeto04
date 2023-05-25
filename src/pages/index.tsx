
import { GetStaticProps } from "next";
import Link from 'next/link'
import Head from "next/head";

import Image from "next/image";
import { Button, HomeContainer, Product } from "../styles/pages/home";

import { useKeenSlider } from 'keen-slider/react'

import { stripe } from "../lib/stripe";

import 'keen-slider/keen-slider.min.css'
import Stripe from "stripe";
import { formatPrice } from "../util/format";
import { HandbagSimple } from "phosphor-react";

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: string
  }[]
}

export default function Home({products} : HomeProps) {

  const [ sliderRef ] = useKeenSlider({
    slides: {
      perView: 2.5,
      spacing: 48,
    }
  })

  return (
    <>
    <Head>
      <title>Home | Ignite Shop</title>
    </Head>
    <HomeContainer ref={sliderRef} className="kee-slider">
      {products.map(product => {
        return (
          <Link key={product.id} href={`/product/${product.id}`} prefetch={false}>
          <Product             
            className="keen-slider__slide"
          >
            <Image src={product.imageUrl} width={520} height={480} alt=""/>

            <footer>
              <div>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </div>
                  <Button>
                    <HandbagSimple size={32} color="#fff"  />
                  </Button>
            </footer>
          </Product>
          </Link>
        )
      })}
    </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map( product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: formatPrice(price.unit_amount / 100), // preço vem em centavos
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2, // 2 horas para a página ser atualizada com as novas informações
  }
}