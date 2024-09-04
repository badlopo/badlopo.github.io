import { archiveLoader, ProseArchive } from "../utils/loader.ts";
import { Link, LoaderFunctionArgs, useLoaderData, useSearchParams } from "react-router-dom";
import { IconTag } from "../assets/icon.tsx";

const ProseGalleryPage = () => {
    const { date, items, statistics } = useLoaderData() as ProseArchive
    const [ searchParams, setSearchParams ] = useSearchParams()
    const filter = searchParams.get('category')

    const resetFilter = () => {
        setSearchParams(prev => {
            prev.delete('category')
            return prev
        })
    }
    const applyFilter = (category: string) => {
        setSearchParams(prev => {
            prev.set('category', category)
            return prev
        })
    }

    return (
        <main className={ 'gallery-view prose-gallery' }>
            <h1>Prose</h1>
            <div className={ 'meta-section' }>
                <span>Archived: { new Date(date).toLocaleDateString() }</span>
                <span style={ { marginLeft: 16 } }
                      data-tooltip-id={ 'prose-statistics' }
                      data-tooltip-content={ JSON.stringify(statistics) }
                      data-tooltip-hidden={ !!filter }>
                    Total: { items.length }
                </span>
            </div>

            {
                !!filter ? (
                    <div className={ 'filter-section' }>
                        <span>Category: <i>{ filter }</i></span>
                        <button onClick={ resetFilter }>Reset</button>
                    </div>
                ) : null
            }

            <ul>
                {
                    items.map(({ filename, title, category, created }, index) => (
                        <li key={ index }>
                            <div className={ 'operate-button' } onClick={ () => applyFilter(category) }>
                                <IconTag/>
                                <span>{ category }</span>
                            </div>
                            <Link className={ 'title' } title={ title } to={ `/prose/${ filename }` }>{ title }</Link>
                            <span className={ 'date' }>{ created }</span>
                        </li>
                    ))
                }
            </ul>
        </main>
    )
}

ProseGalleryPage.loader = async ({ request }: LoaderFunctionArgs) => {
    const proses = (await archiveLoader('prose'))!

    const url = new URL(request.url)
    const filter = url.searchParams.get('category')
    if(!!filter) {
        proses.items = proses.items.filter(prose => prose.category === filter)
    }

    return proses
}

export {
    ProseGalleryPage,
}
