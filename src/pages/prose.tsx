import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { ProseConfig, proseLoader } from "../utils/loader.ts";

const ProsePage = () => {
    const { title, createTime, modifyTime, content } = useLoaderData() as ProseConfig
    return (
        <main>
            <h1 style={ { marginTop: 12, textAlign: 'center' } }>{ title }</h1>
            <div style={ { margin: '16px 0', fontSize: 13, fontFamily: 'Atkinson', textAlign: 'center' } }>
                <span>Created at: { createTime.toLocaleDateString() }</span>
                <span style={ { marginLeft: 16 } }>Last modified: { modifyTime.toLocaleDateString() }</span>
            </div>
            <div dangerouslySetInnerHTML={ { __html: content } }/>
        </main>
    )
}

ProsePage.loader = ({ params }: LoaderFunctionArgs) => proseLoader(`/source/post/${ params.name }.md`)

export {
    ProsePage,
}
