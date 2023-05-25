import * as Dialog from '@radix-ui/react-dialog'
import CartModal from '../CartModal'
import { Button } from '../../styles/components/CartButton'
import { HandbagSimple } from 'phosphor-react'

export default function CartButton() {

    return (
        <>
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <Button>
                        <HandbagSimple size={32} color="#8D8D99"  />
                    </Button>
                </Dialog.Trigger>
                <CartModal/>
            </Dialog.Root>
        </>
    )
}
