import { PostConfig } from "../utils/loader.ts";

const PostError = () => {
    return (
        <div style={ { marginTop: 48, textAlign: 'center' } }>
            <h1>404</h1>
            <h2>Post not found</h2>
        </div>
    )
}

const PostRenderer = ({ config }: { config: PostConfig }) => {
    if(!config) return <PostError/>

    const { title, createTime, modifyTime, content } = config
    return (
        <>
            <h1 style={ { marginTop: 48, textAlign: 'center' } }>{ title }</h1>
            <div style={ { margin: '16px 0', fontSize: 13, fontFamily: 'Atkinson', textAlign: 'center' } }>
                <span>Created at: { createTime.toLocaleDateString() }</span>
                <span style={ { marginLeft: 16 } }>Last modified: { modifyTime.toLocaleDateString() }</span>
            </div>
            <div className={ 'post-wrapper' } dangerouslySetInnerHTML={ { __html: content } }/>
        </>
    )
}

export {
    PostRenderer,
}
