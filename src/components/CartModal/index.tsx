import * as Dialog from '@radix-ui/react-dialog'
import { Content, Overlay, CloseButton, Title, ProductContent, ImagenContainer, DescriptionContainer, ProductContainer, CheckoutContainer } from '../../styles/components/CartModal'
import { X } from 'phosphor-react'
import Image from 'next/image'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/cartContext'
import { formatPrice } from '../../util/format'

interface HomeProps {
    products: {
      id: string
      name: string
      imageUrl: string
      price: string
    }[]
  }

export default function CartModal() {

    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);
    const [totalCartAmount, setTotalCartAmount] = useState(0)

     const {cartProducts, updateCart} = useContext(CartContext); 

    const sumCartAmount = cartProducts.reduce((accumulator, product) => {
        return accumulator + parseFloat(product.price.replace(/[^\d,.-]/g, '').replace(',', '.'));
      }, 0);

      useEffect(() => {
        setTotalCartAmount(sumCartAmount)
      },[sumCartAmount])

      function handleRemoveProductToCart(id: string) {
        const updateCartProducts = cartProducts.filter(product => product.id !== id)

        updateCart(updateCartProducts)
      }

    async function handleBuyProduct() {
        try {
            setIsCreatingCheckoutSession(true);

            const newProducts = cartProducts.map(({ defaultPriceId }) => ({ price: defaultPriceId, quantity: 1 }));

            const response = await axios.post(`/api/checkout`, {
                products: newProducts,
            })

            const { checkoutUrl} = response.data;

            /* router.push('/checkout'); */
            // caso fosse redirecionar o usuário para uma rota interna

            window.location.href = checkoutUrl;
            // redirecionando o usuário para uma rota externa (stripe)
        } catch (err) {
            // Conectar com uma ferramenta de observabilidade (Datadog / Sentry)

            setIsCreatingCheckoutSession(false)
            
            alert('Falha ao redirecionar ao checkout!')
        }
    }
    
    return (
        <Dialog.Portal>
            <Overlay/>
            <Content>
                <Title>Sacola de compras</Title>
                
                <CloseButton>
                    <X size={24}/>
                </CloseButton>
                <ProductContainer>
                {cartProducts.map(product => {

                    return (
                        <ProductContent key={product.id}>
                            <ImagenContainer className='ImageContainer'>
                                <Image src={product.imageUrl} width={88} height={88} alt=''/>
                            </ImagenContainer>
                            <DescriptionContainer>
                                <p>{product.name}</p>
                                <span>{product.price}</span>
                                <button onClick={() => handleRemoveProductToCart(product.id)}>Remover</button>
                            </DescriptionContainer>
                        </ProductContent>
                    )
                })}
                </ProductContainer>
                <CheckoutContainer>
                    <div>
                        <div>
                            <span>Quantidade</span>
                            <span>{cartProducts.length} itens</span>
                        </div>
                        <div>
                            <span>Valor total</span>
                            <span>{formatPrice(totalCartAmount)}</span>
                        </div>
                    </div>
                    <button disabled={isCreatingCheckoutSession || cartProducts.length === 0} onClick={() => handleBuyProduct()}>Finalizar compra</button>
                </CheckoutContainer>
            </Content>
        </Dialog.Portal>
    )
}
