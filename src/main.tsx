import "highlight.js/styles/github.css"
import './styles/font.css'
import './styles/index.css'

import { RouterProvider } from "react-router-dom";
import { createRoot } from 'react-dom/client'

import { router } from "./route";
import { ModalManager } from "@/modal";
import { LoadingMask } from "@/route/loading.tsx";

ModalManager.prelude()

createRoot(document.getElementById('root')!)
    .render(<RouterProvider router={ router } fallbackElement={ <LoadingMask/> }/>)
