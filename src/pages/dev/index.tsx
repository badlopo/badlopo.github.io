import { ModalManager } from "@/modal";

const DevPage = () => {
    return (
        <main style={ { height: 'calc(100% - 40px)' } }>
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
