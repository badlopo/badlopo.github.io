import { PostConfig, postLoader } from "../utils/loader.ts";
import { useLoaderData } from "react-router-dom";
import { PostRenderer } from "../layouts/post.tsx";

const AboutPage = () => {
    const config = useLoaderData() as PostConfig
    return <PostRenderer config={ config }/>
}

AboutPage.loader = () => postLoader('/source/about/about.md')

export {
    AboutPage,
}
