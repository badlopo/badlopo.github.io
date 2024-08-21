import { archiveLoader, ProjectArchive } from "../utils/loader.ts";
import { Link, useLoaderData } from "react-router-dom";

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
                    items.map(({ title, description, repository, website, links }, index) => (
                        <li key={ index }>
                            <div>{ title }</div>
                            <div className={ 'description' }>{ description }</div>
                            <div className={ 'links' }>
                                { repository && <Link to={ repository }>Repository</Link> }
                                { website && <Link to={ website }>Website</Link> }
                                {
                                    links?.map(({ title, url }, index) => {
                                        return (
                                            <Link key={ index } to={ url }>{ title }</Link>
                                        )
                                    })
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
