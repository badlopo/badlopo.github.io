import { Outlet } from "react-router-dom";

const RootLayout = () => {
    return (
        <>
            <div className={ 'root-banner' }>
                <a href="/">
                    <img width={ 75 } height={ 36 } src="/lopo_animate.svg" alt=""/>
                </a>
            </div>
            <Outlet/>
        </>
    )
}

export {
    RootLayout,
}
