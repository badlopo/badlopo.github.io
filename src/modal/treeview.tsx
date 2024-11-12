import { create } from "@ebay/nice-modal-react";
import { ModalWrapper } from "@/modal/base.tsx";

const TreeviewModal = create(() => {
    return (
        <ModalWrapper>
            <div>
                <h1>Treeview Modal</h1>
                <p>This is a treeview modal</p>
            </div>
        </ModalWrapper>
    )
})

export {
    TreeviewModal,
}