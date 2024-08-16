import { Link } from "react-router-dom";

type ProjectCardProps = {
    title: string
    description: string
    cover: string
    link: string
}

const ProjectCard = ({ title, description, cover, link }: ProjectCardProps) => {
    return (
        <Link to={ link } target={ '_blank' }>
            <div className={ 'project-card' }>
                <img src={ cover } alt=""/>
                <div className={ 'title' }>{ title }</div>
                <div className={ 'description' }>{ description }</div>
            </div>
        </Link>
    )
}

export {
    ProjectCard,
}
