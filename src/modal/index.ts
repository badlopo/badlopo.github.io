import { register, show } from "@ebay/nice-modal-react";
import { TreeviewModal } from "@/modal/treeview.tsx";

interface ShowModalFn {
    (name: 'treeview'): void
}

abstract class ModalManager {
    public static prelude() {
        register('treeview', TreeviewModal)
    }

    public static show: ShowModalFn = (name, ...args) => {
        return show(name, ...args)
    }
}

export {
    ModalManager,
}