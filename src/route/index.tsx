import { createHashRouter, RouteObject } from "react-router-dom";
import { RootLayout } from "./layout.tsx";
import { IndexPage } from "../pages";
import { ProseGalleryPage } from "../pages/prose_gallery.tsx";
import { ProsePage } from "../pages/prose.tsx";
import { PoemGalleryPage } from "../pages/poem_gallery.tsx";
import { PoemPage } from "../pages/poem.tsx";
import { ProjectGalleryPage } from "../pages/project_gallery.tsx";
import { AboutPage } from "../pages/about.tsx";
import { MePage } from "../pages/me.tsx";

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
                path: '/prose',
                element: <ProseGalleryPage/>
            },
            {
                path: '/prose/:filename',
                loader: ProsePage.loader,
                element: <ProsePage/>
            },
            {
                path: '/poem',
                loader: PoemGalleryPage.loader,
                element: <PoemGalleryPage/>
            },
            {
                path: '/poem/:filename',
                loader: PoemPage.loader,
                element: <PoemPage/>
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
            {
                path: '/me',
                element: <MePage/>
            }
        ],
    },
]

const router = createHashRouter(routes)

export {
    router,
}
