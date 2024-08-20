import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { ProseConfig, proseLoader } from "../utils/loader.ts";

const ProsePage = () => {
    const { title, created, updated, content } = useLoaderData() as ProseConfig
    return (
        <main className={ 'post-view prose' }>
            <h1>{ title }</h1>
            <div className={ 'meta-section' }>
                <span>Created: { created }</span>
                {
                    updated
                        ? <span style={ { marginLeft: 16 } }>Updated: { updated }</span>
                        : null
                }
            </div>
            <div dangerouslySetInnerHTML={ { __html: content } }/>
        </main>
    )
}

ProsePage.loader = ({ params }: LoaderFunctionArgs) => proseLoader(params.filename!)

export {
    ProsePage,
}
