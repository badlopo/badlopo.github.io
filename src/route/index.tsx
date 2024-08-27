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
import { HiddenPage } from "../pages/hidden.tsx";

const routes: RouteObject[] = [
    {
        element: <RootLayout/>,
        loader: RootLayout.loader,
        children: [
            {
                path: '/',
                element: <IndexPage/>,
            },
            {
                path: '/prose',
                loader: ProseGalleryPage.loader,
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
                loader: ProjectGalleryPage.loader,
                element: <ProjectGalleryPage/>
            },
            {
                path: '/about',
                loader: AboutPage.loader,
                element: <AboutPage/>
            },
            {
                path: '/me',
                loader: MePage.loader,
                element: <MePage/>
            },
            {
                path: '/hidden',
                element: <HiddenPage/>
            }
        ],
    },
]

const router = createHashRouter(routes)

export {
    router,
}
