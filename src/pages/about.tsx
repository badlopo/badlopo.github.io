import { RawConfig, rawLoader } from "../utils/loader.ts";
import { useLoaderData } from "react-router-dom";

const AboutPage = () => {
    const { content } = useLoaderData() as RawConfig
    return (
        <main>
            <div dangerouslySetInnerHTML={ { __html: content } }/>
        </main>
    )
}

AboutPage.loader = () => rawLoader('/source/about.md')

export {
    AboutPage,
}