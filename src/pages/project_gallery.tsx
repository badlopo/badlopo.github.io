import { ProjectCard } from "../components/project_card.tsx";

const ProjectGalleryPage = () => {
    return (
        <main className={ 'gallery-view project-gallery' }>
            <ProjectCard
                title={ 'project1' }
                description={ 'this is a brief description' }
                cover={ '/lopo.svg' }
                link={ '' }/>
            <ProjectCard
                title={ 'project1' }
                description={ 'this is a brief description' }
                link={ '' }/>
        </main>
    )
}

// TODO: Add loader
ProjectGalleryPage.loader = () => null

export {
    ProjectGalleryPage,
}
