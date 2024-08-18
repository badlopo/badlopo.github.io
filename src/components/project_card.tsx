import { Link } from "react-router-dom";

type ProjectCardProps = {
    title: string
    description: string
    cover?: string
    link: string
}

const ProjectCard = ({ title, description, cover, link }: ProjectCardProps) => {
    return (
        <div className={ 'project-card' }>
            <div className="title">
                <Link to={ link } target={ '_blank' }>
                    { title }
                </Link>
            </div>
            <div className={ 'description' }>{ description }</div>
            { cover ? <img src={ cover } alt=""/> : null }
        </div>
    )
}

export {
    ProjectCard,
}
