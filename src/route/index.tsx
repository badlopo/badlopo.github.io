import { createHashRouter, RouteObject } from "react-router-dom";
import { RootLayout } from "./layout.tsx";
import { IndexPage } from "../pages";
import { PoemPage } from "../pages/poem.tsx";
import { PostPage } from "../pages/post.tsx";
import { ProjectPage } from "../pages/project.tsx";
import { AboutPage } from "../pages/about.tsx";
import { PoemGalleryPage } from "../pages/poem_gallery.tsx";

const routes: RouteObject[] = [
    {
        element: <RootLayout/>,
        children: [
            {
                path: '/',
                element: <IndexPage/>,
            },
            {
                path: '/poem',
                element: <PoemGalleryPage/>
            },
            {
                path: '/poem/:name',
                loader: PoemPage.loader,
                element: <PoemPage/>
            },
            {
                path: '/post',
                element: <PostPage/>
            },
            {
                path: '/project',
                element: <ProjectPage/>
            },
            {
                path: '/about',
                loader: AboutPage.loader,
                element: <AboutPage/>
            },
        ],
    },
]

const router = createHashRouter(routes)

export {
    router,
}
