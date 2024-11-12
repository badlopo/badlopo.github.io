import { ModalManager } from "@/modal";

const DevPage = () => {
    return (
        <main>
            <button onClick={ () => {
                ModalManager.show('treeview')
            } }>show treeview modal
            </button>
        </main>
    )
}

export {
    DevPage,
}
