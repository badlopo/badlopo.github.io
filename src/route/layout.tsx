import { Link, NavLink, Outlet } from "react-router-dom";
import { Tooltip } from "react-tooltip";

const RootLayout = () => {
    return (
        <>
            <Tooltip/>

            <nav>
                <Link to={ '/' }>
                    <img width={ 75 } height={ 36 } src="/lopo_animate.svg" alt=""/>
                </Link>

                <div className={ 'navbar' }>
                    <NavLink to={ '/prose' }>Prose</NavLink>
                    {/*<NavLink to={ '/poem' }>Poem</NavLink>*/ }
                    <NavLink to={ '/project' }>Project</NavLink>
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
}
