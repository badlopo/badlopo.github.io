import { Link, NavLink, Outlet, useBlocker, useLocation } from "react-router-dom";
import { useEffect, useLayoutEffect } from "react";
import { Provider } from "@ebay/nice-modal-react";

const RootLayout = () => {
    return (
        <Provider>
            <Outlet/>
        </Provider>
    )
}

const AppLayout = () => {
    const location = useLocation()

    // we use 'useBlocker' to do something before nav-out
    useBlocker(() => {
        const container = document.getElementById('root')!
        sessionStorage.setItem(`@scroll/${ location.pathname }`, container.scrollTop.toString())
        return false
    })

    // restore
    useLayoutEffect(() => {
        const scrollTop = sessionStorage.getItem(`@scroll/${ location.pathname }`) || '0'
        const container = document.getElementById('root')!
        container.scrollTop = parseFloat(scrollTop)
    }, [ location ])

    useEffect(() => {
        // add event listener to save scroll position on page unload
        window.addEventListener('beforeunload', () => {
            const container = document.getElementById('root')!
            sessionStorage.setItem(`@scroll/${ location.pathname }`, container.scrollTop.toString())
        })
    }, [])

    return (
        <>
            <nav>
                <Link to={ '/' }>
                    <img width={ 75 } height={ 36 } src="/lopo_animate.svg" alt=""/>
                </Link>

                <div className={ 'navbar' }>
                    <NavLink to={ '/prose' }>Prose</NavLink>
                    <NavLink to={ '/about' }>About</NavLink>
                </div>
            </nav>

            <Outlet/>
        </>
    )
}

export {
    RootLayout,
    AppLayout,
}
