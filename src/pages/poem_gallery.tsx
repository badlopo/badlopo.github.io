import { Link, useLoaderData } from "react-router-dom";
import { archiveLoader, PoemArchive } from "../utils/loader.ts";

const PoemGalleryPage = () => {
    const { date, total, items } = useLoaderData() as PoemArchive
    return (
        <main className={ 'gallery-view poem-gallery' }>
            <h1>Poems</h1>
            <div className={ 'meta-section' }>
                <span>Updated: { new Date(date).toLocaleDateString() }</span>
                <span style={ { marginLeft: 16 } }>Total: { total }</span>
            </div>

            <ul>
                {
                    items.map(({ title, path }, index) => (
                        <li key={ index }>
                            <Link to={ `/poem/${ path }` }>
                                { title }
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </main>
    )
}

PoemGalleryPage.loader = () => archiveLoader('poem')

export {
    PoemGalleryPage,
}
