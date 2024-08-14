import { createHashRouter, RouteObject } from "react-router-dom";
import { IndexPage } from "../pages";
import { AboutPage } from "../pages/about.tsx";
import { RootLayout } from "./layout.tsx";

const routes: RouteObject[] = [
    {
        element: <RootLayout/>,
        children: [
            {
                path: '/',
                element: <IndexPage/>,
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
