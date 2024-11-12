import { Link, NavLink, Outlet } from "react-router-dom";
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
    useEffect(() => {
        // add event listener to save scroll position on page unload
        window.addEventListener('beforeunload', () => {
            const container = document.getElementById('root')!
            sessionStorage.setItem('@scroll', container.scrollTop.toString())
        })
    }, [])

    useLayoutEffect(() => {
        // restore scroll position on page load (if any)
        const scrollTop = sessionStorage.getItem('@scroll')
        if(!!scrollTop) {
            const container = document.getElementById('root')!
            container.scrollTop = parseFloat(scrollTop)
        }
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
                    <NavLink to={ '/me' }>Me</NavLink>
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
