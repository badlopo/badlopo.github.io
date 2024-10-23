import Styles from './index.module.css'
import { useEffect, useRef } from "react";

type CarouselKeyframe = {
    '--carousel-width': string,
    '--container-bg': string,
    '--body-offset-y': string,
}

const KEYFRAME_QUEUE: CarouselKeyframe[] = [
    {
        '--carousel-width': '50px', '--container-bg': '#E7F0FE',
        '--body-offset-y': '0'
    },
    {
        '--carousel-width': '100px', '--container-bg': '#E7F5EB',
        '--body-offset-y': 'calc(-1 * var(--carousel-height))'
    },
    {
        '--carousel-width': '50px', '--container-bg': '#FBEEE5',
        '--body-offset-y': 'calc(-2 * var(--carousel-height))'
    },
    {
        '--carousel-width': '50px', '--container-bg': '#E7F0FE',
        '--body-offset-y': 'calc(-3 * var(--carousel-height))'
    },
    {
        '--carousel-width': '50px', '--container-bg': '#E7F5EB',
        '--body-offset-y': 'calc(-4 * var(--carousel-height))'
    },
    {
        '--carousel-width': '80px', '--container-bg': '#FAF5D8',
        '--body-offset-y': 'calc(-5 * var(--carousel-height))'
    },
    {
        '--carousel-width': '50px', '--container-bg': '#E7F0FE',
        '--body-offset-y': 'calc(-6 * var(--carousel-height))'
    },
]

const CarouselText = ({ className = '' }: { className?: string }) => {
    const ref = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const el = ref.current!

        let animation: Animation | null = null
        let step = 0

        const stepForward = () => {
            const keyframes = KEYFRAME_QUEUE.slice(step, step + 2)
            animation = el.animate(keyframes, {
                // 切换动画持续时间
                duration: 1000,
                // 切换动画结束后停留时间
                endDelay: 1000,
                iterations: 1,
                easing: 'ease',
                fill: 'forwards'
            })
            animation.onfinish = () => {
                step = (step + 1) % 6
                stepForward()
            }
            animation.oncancel = () => {
                animation = null
                console.log('animation cancel')
            }
        }
        stepForward()

        return () => {
            if(animation) animation.cancel()
        }
    }, [])

    return (
        <div ref={ ref } className={ `${ Styles.carouselContainer } ${ className }` }>
            <div className={ Styles.carouselBody }>
                <div className={ Styles.carouselItem } style={ { color: '#1967D2' } }>
                    一二
                </div>
                <div className={ Styles.carouselItem } style={ { color: '#56A56C' } }>
                    三四五六七
                </div>
                <div className={ Styles.carouselItem } style={ { color: '#D17724' } }>
                    八九
                </div>
                <div className={ Styles.carouselItem } style={ { color: '#1967D2' } }>
                    上下
                </div>
                <div className={ Styles.carouselItem } style={ { color: '#56A56C' } }>
                    左右
                </div>
                <div className={ Styles.carouselItem } style={ { color: '#B48B00' } }>
                    前中后
                </div>
                <div className={ Styles.carouselItem } style={ { color: '#1967D2' } }>
                    一二
                </div>
            </div>
        </div>
    )
}

const DevPage = () => {
    return (
        <main>
            <h1>Dev Page</h1>

            <span>prefix segment</span>
            <CarouselText/>
            <span>suffix segment</span>
        </main>
    )
}

export {
    DevPage,
}
