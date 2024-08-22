import { archiveLoader, ProseArchive } from "../utils/loader.ts";
import { Link, LoaderFunctionArgs, useLoaderData, useSearchParams } from "react-router-dom";
import { IconTag } from "../assets/icon.tsx";

const ProseGalleryPage = () => {
    const { date, total, items } = useLoaderData() as ProseArchive
    const [ searchParams, setSearchParams ] = useSearchParams()
    const filter = searchParams.get('category')

    const handleFilter = (category: string) => {
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
                <span style={ { marginLeft: 16 } }>Total: { total }</span>
            </div>

            {/* TODO: show filter & clear button */ }

            <ul>
                {
                    items.map(({ filename, title, category }, index) => (
                        <li key={ index }>
                            <div className={ 'category' } onClick={ () => handleFilter(category) }>
                                <IconTag/>
                                <span>{ category }</span>
                            </div>
                            <Link to={ `/prose/${ filename }` }>{ title }</Link>
                        </li>
                    ))
                }
            </ul>
        </main>
    )
}

ProseGalleryPage.loader = async ({ request }: LoaderFunctionArgs) => {
    const proses = await archiveLoader('prose')

    const url = new URL(request.url)
    const filter = url.searchParams.get('category')
    if(!!filter && !!proses) {
        proses.items = proses.items.filter(prose => prose.category === filter)
    }

    return proses
}

export {
    ProseGalleryPage,
}
