import { ProjectCard } from "../components/project_card.tsx";

const ProjectGalleryPage = () => {
    return (
        <div className={ '' }>
            TODO: project gallery

            {/* test case: */ }
            <ProjectCard
                title={ 'project1' }
                description={ 'this is a brief description' }
                cover={ '/lopo.svg' }
                link={ '' }/>
        </div>
    )
}

export {
    ProjectGalleryPage,
}
