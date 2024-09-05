import { archiveLoader, ProseArchive } from "../utils/loader.ts";
import { Link, LoaderFunctionArgs, useLoaderData, useSearchParams } from "react-router-dom";
import { IconTag } from "../assets/icon.tsx";
import { useState } from "react";

const ProseGalleryPage = () => {
    const { date, items, statistics } = useLoaderData() as ProseArchive
    const [ searchParams, setSearchParams ] = useSearchParams()
    const filter = searchParams.get('category')
    const [ _showStatistics, setShowStatistics ] = useState<boolean>(false)
    const showStatistics = _showStatistics && !filter

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
                <span style={ { marginLeft: 16 } }>Total: { items.length }</span>
                {
                    !!filter ? null : (
                        <button style={ { marginLeft: 16 } }
                                onClick={ () => setShowStatistics(v => !v) }>
                            Statistics
                        </button>
                    )
                }
            </div>

            {
                !!filter ? (
                    <div className={ 'filter-section' }>
                        <span>Category: <i>{ filter }</i></span>
                        <button onClick={ resetFilter }>Reset</button>
                    </div>
                ) : null
            }

            {
                showStatistics ? (
                    <ul className={ 'statistic-block' }>
                        {
                            Object.entries(statistics).map(([ category, count ]) => {
                                return (
                                    <li key={ category } className={ 'statistic-item' }>
                                        <span className={ 'title' }>{ category }: </span>
                                        <span>{ count }</span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                ) : null
            }

            <ul>
                {
                    items.map(({ filename, title, category, created }, index) => (
                        <li className={ 'prose-item' } key={ index }>
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
