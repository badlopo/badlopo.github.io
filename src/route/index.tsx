import { createHashRouter, RouteObject } from "react-router-dom";
import { IndexPage } from "../pages";

const routes: RouteObject[] = [
    {
        path: '/',
        element: <IndexPage/>,
    }
]

const router = createHashRouter(routes)

export {
    router,
}
