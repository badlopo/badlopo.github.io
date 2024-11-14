import { create, useModal } from "@ebay/nice-modal-react";
import { ModalWrapper } from "@/modal/base.tsx";
import { useRef } from "react";

type ImageModalProps = {
    src: string
}

const ImageModal = create(({ src }: ImageModalProps) => {
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

    return (
        <ModalWrapper onBgClick={ closeModal }>
            <div ref={ modalRef } className={ 'image-modal' }>
                <img src={ src } alt=""/>
            </div>
        </ModalWrapper>
    )
})

export {
    type ImageModalProps
    ,
    ImageModal,
}
