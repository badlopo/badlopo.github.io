import { archiveLoader, ProjectArchive } from "../utils/loader.ts";
import { Link, useLoaderData } from "react-router-dom";
import { IconRepository, IconWebsite } from "../assets/icon.tsx";

const ProjectGalleryPage = () => {
    const { date, total, items } = useLoaderData() as ProjectArchive
    return (
        <main className={ 'gallery-view project-gallery' }>
            <h1>Project</h1>
            <div className={ 'meta-section' }>
                <span>Archived: { new Date(date).toLocaleDateString() }</span>
                <span style={ { marginLeft: 16 } }>Total: { total }</span>
            </div>

            <ul>
                {
                    items.map(({ title, description, repository, website }, index) => (
                        <li key={ index }>
                            <div>{ title }</div>
                            <div className={ 'description' }>{ description }</div>
                            <div className={ 'links' }>
                                {
                                    repository && <Link title={ 'Repository' } to={ repository } target={ '_blank' }>
                                        <IconRepository className={ 'icon' }/>
                                    </Link>
                                }
                                {
                                    website && <Link title={ 'Website' } to={ website } target={ '_blank' }>
                                        <IconWebsite className={ 'icon' }/>
                                    </Link>
                                }
                            </div>
                        </li>
                    ))
                }
            </ul>
        </main>
    )
}

ProjectGalleryPage.loader = () => archiveLoader('project')

export {
    ProjectGalleryPage,
}
