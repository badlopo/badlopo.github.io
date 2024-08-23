import { archiveLoader, ProjectArchive } from "../utils/loader.ts";
import { Link, useLoaderData } from "react-router-dom";
import { IconRepository, IconWebsite } from "../assets/icon.tsx";

const ProjectGalleryPage = () => {
    const { date, items } = useLoaderData() as ProjectArchive
    return (
        <main className={ 'gallery-view project-gallery' }>
            <h1>Project</h1>
            <div className={ 'meta-section' }>
                <span>Archived: { new Date(date).toLocaleDateString() }</span>
                <span style={ { marginLeft: 16 } }>Total: { items.length }</span>
            </div>

            <ul>
                {
                    items.map(({ title, description, repository, website }, index) => (
                        <li key={ index }>
                            <div>{ title }</div>
                            <div className={ 'description' }>{ description }</div>
                            <div className={ 'links' }>
                                {
                                    repository ? (
                                        <Link className={ 'operate-button' } to={ repository } target={ '_blank' }>
                                            <IconRepository/>
                                            <span>repository</span>
                                        </Link>
                                    ) : null
                                }
                                {
                                    website ? (
                                        <Link className={ 'operate-button' } to={ website } target={ '_blank' }>
                                            <IconWebsite/>
                                            <span>website</span>
                                        </Link>
                                    ) : null
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
