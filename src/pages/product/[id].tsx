import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product"
import { GetStaticPaths, GetStaticProps } from "next"
import { stripe } from "../../lib/stripe"
import Stripe from "stripe"
import { formatPrice } from "../../util/format"
import Image from "next/image";
import axios from "axios"
import { useContext, useState } from "react"
import Head from "next/head"
import { CartContext } from "../../context/cartContext"
import { useRouter } from "next/router"

interface ProductProps {
    product: {
      id: string
      name: string
      imageUrl: string
      price: string
      description: string
      defaultPriceId: string
    }
  }

export default function Product({ product } : ProductProps) {

    const { isFallback } = useRouter()

     const {AddProduct, cartProducts} = useContext(CartContext); 

     function checkIfProductExistsInCart(id: string) {
        return cartProducts.some(product => product.id === id);
      }

    function handleAddProductToCart() {
            if(!checkIfProductExistsInCart(product.id)) {
                AddProduct(product)
            }
    }

    if ( isFallback ) {
        return <h3>Loading...</h3>
    }
 
    return (
        <>
        <Head>
            <title>{product.name} | Ignite Shop</title>
        </Head>
        <ProductContainer>
            <ImageContainer>
                <Image src={product.imageUrl} width={520} height={480} alt=""/>
            </ImageContainer>

            <ProductDetails>
                <h1>{product.name}</h1>
                <span>{product.price}</span>

                <p>{product.description}</p>

                <button /* disabled={isCreatingCheckoutSession} */ onClick={handleAddProductToCart}>
                    Colocar na sacola
                </button>
            </ProductDetails>
        </ProductContainer>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    // Buscar os produtos mais vendidos / mais acessados
    return {
        paths: [
            { params: { id: 'prod_NrNHH7UFHmNSoX'}}
        ],
        fallback: true,
        /* fallback: 'blocking', */
    }
}

export const getStaticProps: GetStaticProps<any, { id: string} > = async ({ params }) => {
    const productID = params.id

    const product = await stripe.products.retrieve(productID, {
        expand: ['default_price']
    })

    const price = product.default_price as Stripe.Price

    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                price: formatPrice(price.unit_amount / 100),
                description: product.description,
                defaultPriceId: price.id
              }
        },
        revalidate: 60 * 60 * 24, //24 hours
    }
}