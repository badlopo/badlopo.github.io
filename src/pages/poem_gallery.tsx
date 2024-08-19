import { Link, useLoaderData } from "react-router-dom";
import { archiveLoader, PoemArchive } from "../utils/loader.ts";

const PoemGalleryPage = () => {
    const { date, total, items } = useLoaderData() as PoemArchive
    return (
        <main className={ 'poem-gallery' }>
            <h1 style={ { marginTop: 12, textAlign: 'center' } }>Poems</h1>
            <div style={ { margin: '16px 0', fontSize: 13, fontFamily: 'Atkinson', textAlign: 'center' } }>
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
