import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { RawConfig, rawLoader } from "../utils/loader.ts";

const PoemPage = () => {
    const { content } = useLoaderData() as RawConfig
    return (
        <main>
            <div dangerouslySetInnerHTML={ { __html: content } }/>
        </main>
    )
}

PoemPage.loader = ({ params }: LoaderFunctionArgs) => rawLoader(`/source/poem/${ params.name }.md`)

export {
    PoemPage,
}
