import { Link, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { archiveLoader, ProseArchive } from "@/utils/loader.ts";
import { IconTag } from "@/assets/icon.tsx";
import { ModalManager } from "@/modal";

const ProseGalleryPage = () => {
    const { filter, date, items } = useLoaderData() as ProseArchive & { filter?: string }

    return (
        <main className={ 'gallery-view prose-gallery-page' }>
            <h1>Prose</h1>
            <div className={ 'meta-section' }>
                <span>Archived: { new Date(date).toLocaleDateString() }</span>
                <span style={ { marginLeft: 16 } }>Total: { items.length }</span>
                <button style={ { marginLeft: 16 } }
                        onClick={ () => ModalManager.show('treeview') }>
                    Treeview
                </button>
            </div>

            {
                !!filter ? (
                    <div className={ 'filter-section' }>
                        <span>Category: <i>{ filter }</i></span>
                        <Link to={ '/prose' }>
                            <button>Reset</button>
                        </Link>
                    </div>
                ) : null
            }

            <ul>
                {
                    items.map(({ filename, title, categories, created }, index) => (
                        <li className={ 'prose-item' } key={ index }>
                            <div className={ 'categories' }>
                                <IconTag/>
                                {
                                    categories.map((category, index) => {
                                        return (
                                            <Link key={ category } className={ 'category' }
                                                  to={ `/prose?category=${ category }` }>
                                                { index > 0 ? ', ' : null }
                                                { category }
                                            </Link>
                                        )
                                    })
                                }
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
        proses.items = proses.items.filter(prose => prose.categories.includes(filter))

        // @ts-expect-error use as expando
        proses.filter = filter
    }

    return proses
}

export {
    ProseGalleryPage,
}
