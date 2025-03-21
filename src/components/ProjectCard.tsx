import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  demoUrl?: string;
  date: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="neo-card group overflow-hidden"
    >
      <div className="relative overflow-hidden h-48 md:h-56">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <Link 
            to={`/projects/${project.id}`}
            className="inline-flex items-center gap-1 text-white font-medium hover:underline"
          >
            View Details <ExternalLink size={16} />
          </Link>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map((tag, idx) => (
            <span key={idx} className="neo-tag bg-neo-blue/10 text-neo-blue text-xs">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-bold mb-2 truncate">{project.title}</h3>
        <div 
          className="text-gray-600 mb-4 line-clamp-2 prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: project.description }}
        />
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{project.date}</span>
          <Link 
            to={`/projects/${project.id}`}
            className="neo-button text-sm py-1"
          >
            View Project
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
