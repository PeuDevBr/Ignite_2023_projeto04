import { styled } from '..'
import * as Dialog from '@radix-ui/react-dialog'

export const Title = styled(Dialog.Title, {
    position: 'absolute',
    top: '4rem',
    left: '2rem',

})

export const Overlay = styled(Dialog.Overlay, {
    position: 'fixed',
    width: '100vw%',
    height: '100vh%',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',

})

export const Content = styled(Dialog.Content, {
    backgroundColor: '$gray800',
    position: 'fixed',
    width: '24%',
    height: '100%',
    right: 0,
    top: 0,

})

export const CloseButton = styled(Dialog.Close, {
  
    position: 'absolute',
    backgroundColor: 'transparent',
    border: 8,
    top: '1.5rem',
    right: '1.5rem',
    lineHeight: 0,
    cursor: 'pointer',
    color: '$gray100',

})

export const ProductContainer = styled('div', {
    position: 'relative',
    overflow: 'hidden',

    top: '8rem',
    left: '2rem',


    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',

})

export const ProductContent = styled('div', {
    
    display: 'flex',
    gap: '1rem',
})

export const ImagenContainer = styled('div', {
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%);',
    borderRadius: 8,
    height: 93,
    width: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
})

export const DescriptionContainer = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'start',

    p: {
        color: '$gray500',
        fontSize: '$md',
    },

    span: {
        fontSize: '$md',
        fontWeight: 'bold'
    },

    button: {
        color: '$green500',
        backgroundColor: 'transparent',
        border: 0,
        cursor: 'pointer',
        fontSize: '$md',

        '&:disabled': {
            opacity: 0.6,
            cursor: 'not-allowed',
        },

        '&:not(:disabled):hover': {
            color: '$green300'
        }
    }
    
})

export const CheckoutContainer = styled('footer', {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',

    div: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',

        div: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },

        '& > div + div': {
            fontSize: '$lg',
            fontWeight: 'bold',
        }

    },


    button: {
        backgroundColor: '$green500',
        border: 0,
        color: '$white',
        borderRadius: 8,
        padding: '1.25rem',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '$md',
        marginTop: '2rem',

        '&:disabled': {
            opacity: 0.6,
            cursor: 'not-allowed',
        },

        '&:not(:disabled):hover': {
            backgroundColor: '$green300'
        }
    }
})