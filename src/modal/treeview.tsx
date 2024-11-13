import { create, useModal } from "@ebay/nice-modal-react";
import { ModalWrapper } from "@/modal/base.tsx";
import { useEffect, useRef } from "react";

const TreeviewModal = create(() => {
    const modalRef = useRef<HTMLDivElement | null>(null)
    const { resolve, remove } = useModal()

    const closeModal = () => {
        const el = modalRef.current!
        const animation = el.animate([
            { transform: 'scale(1)' },
            { transform: 'scale(0)' },
        ], {
            duration: 300,
            fill: 'forwards',
            easing: 'ease-out',
        })
        animation.onfinish = () => {
            resolve()
            remove()
        }
    }

    const handleMessage = (ev: MessageEvent<{ action: string }>) => {
        if(ev.data.action === '@lopo/close-modal') closeModal()
    }

    useEffect(() => {
        window.addEventListener('message', handleMessage)
        return () => window.removeEventListener('message', handleMessage)
    }, [])

    return (
        <ModalWrapper onBgClick={ closeModal }>
            <div ref={ modalRef } className={ 'treeview-modal' }>
                <iframe src={ '/#/treeview?target=_parent' }/>
            </div>
        </ModalWrapper>
    )
})

export {
    TreeviewModal,
}
