import { useLoaderData } from "react-router-dom";
import { RawConfig, rawLoader } from "../utils/loader.ts";

const IndexPage = () => {
    const { content } = useLoaderData() as RawConfig
    return (
        <main className={ 'post-view index' }>
            <div dangerouslySetInnerHTML={ { __html: content } }/>
        </main>
    )
}

IndexPage.loader = () => rawLoader(`/source/poem/the_fly.md`)

export {
    IndexPage,
}
