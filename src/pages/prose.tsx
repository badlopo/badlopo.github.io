import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { ProseConfig, proseLoader } from "../utils/loader.ts";
import { IconMenu } from "../assets/icon.tsx";
import { Tooltip } from "react-tooltip";

const ProsePage = () => {
    const { title, created, updated, content, headings } = useLoaderData() as ProseConfig

    const navigateTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <main className={ 'prose-view prose' }>
            <h1>{ title }</h1>
            <div className={ 'meta-section' }>
                <span>Created: { created }</span>
                {
                    updated
                        ? <span style={ { marginLeft: 16 } }>Updated: { updated }</span>
                        : null
                }
            </div>
            <div dangerouslySetInnerHTML={ { __html: content } }/>

            {
                headings && <>
                    <div className={ 'floating-menu' }>
                        <div className={ 'menu-item' } data-tooltip-id={ 'tooltip-menu' }>
                            <IconMenu className={ 'menu' }/>
                        </div>
                    </div>
                    <Tooltip
                        id={ 'tooltip-menu' }
                        clickable disableStyleInjection
                        className={ 'catalog-wrapper' }
                        style={ { zIndex: 20 } }
                        children={
                            <>
                                <div className={ 'catalog-title' }>目录</div>
                                <hr/>
                                <div className={ 'catalog-body' }>
                                    {
                                        headings.map(({ id, indent, text }) => {
                                            return (
                                                <div key={ id }
                                                     className={ `catalog-item indent_${ indent }` } title={ text }
                                                     onClick={ () => navigateTo(id) }>
                                                    { text }
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </>
                        }/>
                </>
            }
        </main>
    )
}

ProsePage.loader = ({ params }: LoaderFunctionArgs) => proseLoader(params.filename!)

export {
    ProsePage,
}
