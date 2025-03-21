
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";
import Layout from "../components/Layout";
import ProjectCard, { Project } from "../components/ProjectCard";
import { Filter, Search, X } from "lucide-react";

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(collection(db, "projects"), orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);
        const projectsData: Project[] = [];
        const tagsSet = new Set<string>();
        
        querySnapshot.forEach((doc) => {
          const project = { id: doc.id, ...doc.data() } as Project;
          projectsData.push(project);
          
          // Collect all tags
          project.tags.forEach(tag => tagsSet.add(tag));
        });
        
        setProjects(projectsData);
        setFilteredProjects(projectsData);
        setAllTags(Array.from(tagsSet));
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let result = projects;
      
      // Apply search filter
      if (searchTerm) {
        const lowercasedTerm = searchTerm.toLowerCase();
        result = result.filter(
          project => 
            project.title.toLowerCase().includes(lowercasedTerm) || 
            project.description.toLowerCase().includes(lowercasedTerm)
        );
      }
      
      // Apply tag filters
      if (selectedTags.length > 0) {
        result = result.filter(project => 
          selectedTags.some(tag => project.tags.includes(tag))
        );
      }
      
      setFilteredProjects(result);
    };
    
    applyFilters();
  }, [searchTerm, selectedTags, projects]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTags([]);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">My Projects</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in">
            Explore my portfolio of work showcasing my skills and experience
            in various technologies and domains.
          </p>
        </div>
        
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative w-full md:w-auto flex-grow md:max-w-md">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search projects..."
                className="neo-input pl-10 w-full"
              />
            </div>
            
            <button 
              className="neo-button inline-flex items-center gap-2 md:flex-none"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
            
            {(searchTerm || selectedTags.length > 0) && (
              <button 
                className="neo-button py-1 px-3 text-sm inline-flex items-center gap-1"
                onClick={clearFilters}
              >
                Clear all <X size={14} />
              </button>
            )}
          </div>
          
          {showFilters && (
            <div className="mt-6 p-6 neo-card bg-gray-50 animate-scale-in">
              <h3 className="font-bold mb-4">Filter by tag:</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={`neo-tag cursor-pointer transition-all duration-300 ${
                      selectedTags.includes(tag) 
                        ? "bg-neo-blue text-white border-neo-blue" 
                        : ""
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="neo-card animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-4 w-1/3"></div>
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4 w-2/3"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="neo-card p-8 text-center">
            <h3 className="text-xl font-bold mb-4">No projects found</h3>
            <p className="text-gray-600 mb-6">
              {projects.length > 0 
                ? "Try adjusting your search or filters to find what you're looking for."
                : "No projects have been added yet. Add some in the admin panel!"}
            </p>
            {selectedTags.length > 0 || searchTerm ? (
              <button onClick={clearFilters} className="neo-button">
                Clear Filters
              </button>
            ) : null}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Projects;
