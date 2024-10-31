import { archiveLoader } from "@/utils/loader.ts";

const GraphPage = () => {
    return (
        <main className={ 'prose-view graph' }>

        </main>
    )
}

GraphPage.loader = async () => {
    const proses = (await archiveLoader('prose'))!

    // TODO: process
    console.log('got prose archive:', proses)

    return null
}

export {
    GraphPage,
}
