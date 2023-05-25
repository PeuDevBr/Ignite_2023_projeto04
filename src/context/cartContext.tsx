import React, { ReactNode, createContext, useState } from "react";

interface CartProductProps {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
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

export function CartProvider({children}: PropsProviderProps) {
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