import { Link, NavLink, Outlet } from "react-router-dom";

const RootLayout = () => {
    return (
        <>
            <div className={ 'root-banner' }>
                <Link style={ { marginRight: 36 } } to={ '/' }>
                    <img width={ 75 } height={ 36 } src="/lopo_animate.svg" alt=""/>
                </Link>

                <NavLink to={ '/poem' }>Poem</NavLink>
                <NavLink to={ '/post' }>Post</NavLink>
                <NavLink to={ '/project' }>Project</NavLink>
            </div>

            <Outlet/>
        </>
    )
}

export {
    RootLayout,
}
