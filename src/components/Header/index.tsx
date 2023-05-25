import { HeaderContent } from "../../styles/components/Header";
import Image from "next/image";

import logoImg from '../../assets/Logo.svg'
import Link from "next/link";

import * as Dialog from '@radix-ui/react-dialog'
import CartModal from '../CartModal'
import { Button } from '../../styles/components/CartButton'
import { HandbagSimple } from 'phosphor-react'

export default function Header() {

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
