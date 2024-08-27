import { Link, NavLink, Outlet } from "react-router-dom";
import { IconMusic } from "../assets/icon.tsx";

const song = 'Ye Elders of Israel'

const RootLayout = () => {
    return (
        <>
            <nav>
                <Link style={ { marginRight: 36 } } to={ '/' }>
                    <img width={ 75 } height={ 36 } src="/lopo_animate.svg" alt=""/>
                </Link>

                <NavLink to={ '/prose' }>Prose</NavLink>
                <NavLink to={ '/poem' }>Poem</NavLink>
                <NavLink to={ '/project' }>Project</NavLink>
                <NavLink to={ '/about' }>About</NavLink>
                <NavLink to={ '/me' }>Me</NavLink>

                <i style={ { flex: 1 } }/>

                <div className={ 'player' }>
                    <IconMusic/>
                    <span>{ song }</span>
                </div>
            </nav>

            <Outlet/>
        </>
    )
}

RootLayout.loader = () => {
    if(!!window._player) {
        return null
    }

    const player = new Audio('/audio/Ye Elders of Israel.m4a')
    window._player = player
    // player.loop = true
    window.onclick = () => {
        player.play()
        window.onclick = null
    }

    return null
}

export {
    RootLayout,
}
