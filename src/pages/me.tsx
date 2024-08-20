import { RawConfig, rawLoader } from "../utils/loader.ts";
import { useLoaderData } from "react-router-dom";

const MePage = () => {
    const { content } = useLoaderData() as RawConfig
    return (
        <main className={ 'post-view me' }>
            <div dangerouslySetInnerHTML={ { __html: content } }/>
        </main>
    )
}

MePage.loader = () => rawLoader('source/me.md')

export {
    MePage,
}
