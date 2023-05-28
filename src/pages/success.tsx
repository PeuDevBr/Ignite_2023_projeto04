import Link from "next/link";
import Head from "next/head";
import { ImageContainer, ImageContent, SuccessContainer } from "../styles/pages/success";
import { GetServerSideProps } from "next";
import { stripe } from "../lib/stripe";
import Stripe from "stripe";
import Image from "next/image";

interface SuccessProps {
    customerName: string,
    product: {
        quantity: number,
        imageUrl: string
    }
}

export default function Success({customerName, list}: any) {
    console.log(list.products)

    return (
        <>
        <Head>
            <title>Confirmação de compra | Ignite Shop</title>
            <meta name="robots" content="noindex"/>
        </Head>
        <SuccessContainer>
            <h1>Compra efetuada!</h1>

            <ImageContainer>

                {list.products.map(product => {

                    return (
                        <ImageContent key={product.price.product.images[0]}>
                            <Image src={product.price.product.images[0]} width={150} height={150} alt=""/>
                        </ImageContent>
                    )
                })}

            </ImageContainer>

            <p>
                Uhuul <strong>{customerName}</strong>, sua compra de <strong>{list.quantity} </strong>
                camisetas já está a caminho da sua casa.
            </p>

            <Link href='/'>
                Voltar ao catálogo
            </Link>
        </SuccessContainer>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    if(!query.session_id){
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    const sessionId = String(query.session_id);

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items', 'line_items.data.price.product']
    })

    const customerName = session.customer_details.name;

    return {
        props: {
            customerName,
            list: {
                quantity: session.line_items.data.length,
                products: session.line_items.data,
            }
        }
    }
}
