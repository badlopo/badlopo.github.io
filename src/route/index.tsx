import { createHashRouter, RouteObject } from "react-router-dom";
import { AppLayout, RootLayout } from "./layout.tsx";
import { HomePage } from "@/pages/home.tsx";
import { ProsePage } from "@/pages/prose.tsx";
import { ProseGalleryPage } from "@/pages/prose_gallery.tsx";
import { AboutPage } from "@/pages/about.tsx";
import { MePage } from "@/pages/me.tsx";
import { DevPage } from "@/pages/dev";
import { TreeviewPage } from "@/pages/treeview";

const routes: RouteObject[] = [
    {
        element: <RootLayout/>,
        children: [
            {
                element: <AppLayout/>,
                children: [
                    {
                        path: '/',
                        element: <HomePage/>,
                    },
                    {
                        path: '/prose',
                        loader: ProseGalleryPage.loader,
                        element: <ProseGalleryPage/>,
                    },
                    {
                        path: '/prose/:filename',
                        loader: ProsePage.loader,
                        element: <ProsePage/>,
                    },
                    {
                        path: '/about',
                        loader: AboutPage.loader,
                        element: <AboutPage/>,
                    },
                    {
                        path: '/me',
                        loader: MePage.loader,
                        element: <MePage/>,
                    },
                ],
            },
            {
                path: '/treeview',
                loader: TreeviewPage.loader,
                element: <TreeviewPage/>,
            },
            {
                path: '/dev',
                element: <DevPage/>,
            },
        ],
    },
]

const router = createHashRouter(routes)

export {
    router,
}
