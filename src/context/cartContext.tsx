import React, { ReactNode, createContext, useState } from "react";
import { GetStaticPaths, GetStaticProps } from 'next'
import Stripe from 'stripe'
import { stripe } from "../lib/stripe";
import { formatPrice } from "../util/format";


interface CartProductProps {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
}

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

interface PropsContextType {
  cartProducts: CartProductProps[],
  AddProduct: (product: CartProductProps) => void
  updateCart: (products: CartProductProps[]) => void
}

export const CartContext = createContext({} as PropsContextType)

interface PropsProviderProps {
    children: ReactNode
  }

export function CartProvider({children}: PropsProviderProps, { product } : ProductProps ) {
    const [cartProducts, setCartProducts] = useState<CartProductProps[]>([])

    function AddProduct(product: CartProductProps) {
      setCartProducts([...cartProducts, product])
    }

    function updateCart(products: CartProductProps[]) {
      setCartProducts(products)
    }

  return (
    <CartContext.Provider value={{cartProducts, AddProduct, updateCart}}>
      {children}
    </CartContext.Provider>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Buscar os produtos mais vendidos / mais acessados
  return {
      paths: [
          { params: { id: 'prod_NrNHH7UFHmNSoX'}}
      ],
      fallback: 'blocking',
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