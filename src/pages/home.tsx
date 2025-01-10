// const QUOTE = [
//     // 'Then am I',
//     // 'A happy fly,',
//     // 'If I live,',
//     // 'Or if I die.',
//     'seek out the righteous,',
//     'where’er they may be!',
// ]

import { useLoaderData } from "react-router-dom";
import { RawConfig, rawLoader } from "@/utils/loader.ts";

const HomePage = () => {
    const { content } = useLoaderData() as RawConfig
    return (
        <main className={ 'home-page prose-view' }>
            <div dangerouslySetInnerHTML={ { __html: content } }/>
        </main>
    )
}

HomePage.loader = () => rawLoader('source/home.md')

export {
    HomePage,
}
