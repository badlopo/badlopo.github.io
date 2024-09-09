import { CSSProperties } from "react";

type IconProps = {
    className?: string
    style?: CSSProperties
    onClick?: VoidFunction
}

const IconMenu = ({ className, style, onClick }: IconProps) => {
    return (
        <svg className={ className } style={ style } onClick={ onClick }
             viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
             width="1em" height="1em" fill="currentColor">
            <path d="M170.666667 213.333333m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"/>
            <path d="M170.666667 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"/>
            <path d="M170.666667 810.666667m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"/>
            <path
                d="M896 778.666667H362.666667c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h533.333333c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32zM362.666667 245.333333h533.333333c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32H362.666667c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32zM896 480H362.666667c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h533.333333c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z"/>
        </svg>
    )
}

const IconTag = ({ className, style, onClick }: IconProps) => {
    return (
        <svg className={ className } style={ style } onClick={ onClick }
             viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
             width="1em" height="1em" fill="currentColor">
            <path
                d="M483.2 790.3L861.4 412c1.7-1.7 2.5-4 2.3-6.3l-25.5-301.4c-0.7-7.8-6.8-13.9-14.6-14.6L522.2 64.3c-2.3-0.2-4.7 0.6-6.3 2.3L137.7 444.8c-3.1 3.1-3.1 8.2 0 11.3l334.2 334.2c3.1 3.2 8.2 3.2 11.3 0z m122.7-533.4c18.7-18.7 49.1-18.7 67.9 0 18.7 18.7 18.7 49.1 0 67.9-18.7 18.7-49.1 18.7-67.9 0-18.7-18.7-18.7-49.1 0-67.9z"/>
            <path
                d="M889.7 539.8l-39.6-39.5c-3.1-3.1-8.2-3.1-11.3 0l-362 361.3-237.6-237c-3.1-3.1-8.2-3.1-11.3 0l-39.6 39.5c-3.1 3.1-3.1 8.2 0 11.3l243.2 242.8 39.6 39.5c3.1 3.1 8.2 3.1 11.3 0l407.3-406.6c3.1-3.1 3.1-8.2 0-11.3z"/>
        </svg>
    )
}

export {
    IconMenu,
    IconTag,
}
