import { HeaderContent } from "../../styles/components/Header";
import Image from "next/image";

import logoImg from '../../assets/Logo.svg'
import Link from "next/link";

import * as Dialog from '@radix-ui/react-dialog'
import CartModal from '../CartModal'
import { Button } from '../../styles/components/CartButton'
import { HandbagSimple } from 'phosphor-react'

/* interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
  }
} */

export default function Header(/* { product } : ProductProps */) {

    return (
        <HeaderContent>
            <Link href={'/'}>
                <Image src={logoImg} width={150} height={150} alt=""/>
            </Link>
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <Button>
                        <HandbagSimple size={32} color="#8D8D99"  />
                    </Button>
                </Dialog.Trigger>
                <CartModal/>
            </Dialog.Root>
        </HeaderContent>
    )
}
