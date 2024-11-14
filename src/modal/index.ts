import { register, show } from "@ebay/nice-modal-react";
import { TreeviewModal } from "@/modal/treeview.tsx";
import { ImageModal, type ImageModalProps } from "@/modal/image.tsx";

interface ShowModalFn {
    (name: 'treeview'): Promise<void>

    (name: 'image', props: ImageModalProps): Promise<void>
}

abstract class ModalManager {
    public static prelude() {
        register('treeview', TreeviewModal)
        register('image', ImageModal)
    }

    public static show: ShowModalFn = (name, ...args: any[]) => {
        return show(name, ...args)
    }
}

export {
    ModalManager,
}
