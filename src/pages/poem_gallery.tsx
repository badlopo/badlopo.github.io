import { Link, useLoaderData } from "react-router-dom";
import { archiveLoader, PoemArchive } from "../utils/loader.ts";

const PoemGalleryPage = () => {
    const { date, total, items } = useLoaderData() as PoemArchive
    return (
        <main className={ 'gallery-view poem-gallery' }>
            <h1>Poem</h1>
            <div className={ 'meta-section' }>
                <span>Archived: { new Date(date).toLocaleDateString() }</span>
                <span style={ { marginLeft: 16 } }>Total: { total }</span>
            </div>

            <ul>
                {
                    items.map(({ title, filename }, index) => (
                        <li key={ index }>
                            <Link to={ `/poem/${ filename }` }>
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
