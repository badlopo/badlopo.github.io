import { createHashRouter, RouteObject } from "react-router-dom";
import { RootLayout } from "./layout.tsx";
import { IndexPage } from "../pages";
import { PoemGalleryPage } from "../pages/poem_gallery.tsx";
import { PoemPage } from "../pages/poem.tsx";
import { PostGalleryPage } from "../pages/post_gallery.tsx";
import { PostPage } from "../pages/post.tsx";
import { ProjectGalleryPage } from "../pages/project_gallery.tsx";
import { AboutPage } from "../pages/about.tsx";

const routes: RouteObject[] = [
    {
        element: <RootLayout/>,
        children: [
            {
                path: '/',
                loader: IndexPage.loader,
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
                element: <PostGalleryPage/>
            },
            {
                path: '/post/:name',
                loader: PostPage.loader,
                element: <PostPage/>
            },
            {
                path: '/project',
                element: <ProjectGalleryPage/>
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
