import { ReactNode, MouseEvent, useEffect } from 'react'
import { useRef } from 'react'

const ModalWrapper = ({ children, onBgClick }: { children: ReactNode, onBgClick?: VoidFunction }) => {
    const ref = useRef<HTMLDivElement | null>(null)

    const handleClick = (ev: MouseEvent<HTMLDivElement>) => {
        if(ev.target === ref.current) {
            ev.stopPropagation()
            ev.preventDefault()
            onBgClick?.()
        }
    }

    useEffect(() => {
        // memorize the original overflow style of body
        const mem = document.body.style.overflow

        // disable scroll when modal is shown
        document.body.style.overflow = 'hidden'

        return () => {
            // restore the original overflow style of body
            document.body.style.overflow = mem
        }
    }, [])

    return (
        <div ref={ ref } className={
            'fixed z-[100] w-full h-full top-0 left-0 bg-[#00000080] flex flex-col items-center justify-center'
        } onClick={ handleClick }>
            { children }
        </div>
    )
}

export {
    ModalWrapper,
}