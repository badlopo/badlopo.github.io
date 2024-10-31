import { archiveLoader } from "@/utils/loader.ts";

const TreePage = () => {
    return (
        <main className={ 'prose-view tree' }>

        </main>
    )
}

TreePage.loader = async () => {
    const proses = (await archiveLoader('prose'))!

    // TODO: process
    console.log('got prose archive:', proses)

    return null
}

export {
    TreePage,
}
