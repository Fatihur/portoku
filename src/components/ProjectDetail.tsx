import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, ExternalLink, Github, Tag } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { Project } from "./ProjectCard";
import { toast } from "sonner";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      
      try {
        const docRef = doc(db, "projects", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProject({ id: docSnap.id, ...docSnap.data() } as Project);
        } else {
          toast.error("Project not found!");
          navigate("/projects", { replace: true });
        }
      } catch (error) {
        console.error("Error fetching project:", error);
        toast.error("Failed to load project details");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-24 flex justify-center">
        <div className="animate-pulse flex flex-col w-full max-w-4xl">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
          <div className="h-80 bg-gray-200 rounded-lg mb-8"></div>
          <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
          <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
          <div className="h-4 bg-gray-200 rounded mb-2 w-5/6"></div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Project not found</h2>
        <p className="mb-8">The project you're looking for doesn't exist or has been removed.</p>
        <Link to="/projects" className="neo-button">
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <Link to="/projects" className="inline-flex items-center gap-2 text-neo-blue hover:underline mb-8">
        <ArrowLeft size={20} />
        Back to Projects
      </Link>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">{project.title}</h1>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag, idx) => (
            <span key={idx} className="neo-tag bg-neo-blue/10 text-neo-blue">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center text-gray-500 mb-8">
          <Calendar size={18} className="mr-2" />
          <span>{project.date}</span>
        </div>
        
        <div className="neo-card overflow-hidden mb-8">
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            className="w-full h-auto object-cover"
          />
        </div>
        
        <div className="neo-card p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">About this project</h2>
          <div 
            className="text-gray-600 leading-relaxed prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: project.description }}
          />
        </div>
        
        {project.demoUrl && (
          <div className="flex justify-center mb-8">
            <a 
              href={project.demoUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="neo-button bg-neo-blue text-white border-neo-blue inline-flex items-center gap-2"
            >
              View Live Demo <ExternalLink size={18} />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
