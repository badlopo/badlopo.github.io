import './index.css'

import { useEffect, useRef } from "react";

const DevPage = () => {
    const ref = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const el = ref.current!

        el.animate([
            { '--carousel-transform': 'translateY(0px)' },
            { '--carousel-transform': 'translateY(30px)' },

            // { '--carousel-offset': '24px' },
            // { '--carousel-offset': '30px' },

            // { transform: 'translateY(0)' },
            // { transform: 'translateY(-24px)' },
        ], {
            duration: 1000,
            iterations: 1,
            easing: 'ease',
        })
    }, [])

    return (
        <main>
            <h1>Dev Page</h1>

            <span>prefix segment</span>
            <div ref={ ref } className={ 'baseline carousel-container' }>
                <div className={ 'carousel-body' }>
                    <div className={ 'carousel-item' }>
                        AAA
                    </div>
                    <div className={ 'carousel-item' }>
                        BBB
                    </div>
                    <div className={ 'carousel-item' }>
                        CCC
                    </div>
                    <div className={ 'carousel-item' }>
                        BBB
                    </div>
                </div>
            </div>
            <span>suffix segment</span>
        </main>
    )
}

export {
    DevPage,
}
