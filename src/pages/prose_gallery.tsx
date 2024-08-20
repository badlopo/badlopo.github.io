import { archiveLoader, ProseArchive } from "../utils/loader.ts";
import { Link, useLoaderData } from "react-router-dom";

const ProseGalleryPage = () => {
    const { date, total, items } = useLoaderData() as ProseArchive
    return (
        <main className={ 'gallery-view prose-gallery' }>
            <h1>Prose</h1>
            <div className={ 'meta-section' }>
                <span>Archived: { new Date(date).toLocaleDateString() }</span>
                <span style={ { marginLeft: 16 } }>Total: { total }</span>
            </div>

            <ul>
                {
                    items.map(({ title, filename }, index) => (
                        <li key={ index }>
                            <Link to={ `/prose/${ filename }` }>
                                { title }
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </main>
    )
}

ProseGalleryPage.loader = () => archiveLoader('prose')

export {
    ProseGalleryPage,
}
