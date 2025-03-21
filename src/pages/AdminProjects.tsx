
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, doc, deleteDoc, orderBy, query } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { Project } from "../components/ProjectCard";
import { Edit, Plus, Trash2, LogOut, AlertCircle, Search } from "lucide-react";
import { toast } from "sonner";

const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/admin/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(collection(db, "projects"), orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);
        const projectList: Project[] = [];
        
        querySnapshot.forEach((doc) => {
          projectList.push({ id: doc.id, ...doc.data() } as Project);
        });
        
        setProjects(projectList);
        setFilteredProjects(projectList);
      } catch (error) {
        console.error("Error fetching projects:", error);
        toast.error("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered = projects.filter(
        project => 
          project.title.toLowerCase().includes(lowercasedTerm) || 
          project.description.toLowerCase().includes(lowercasedTerm) ||
          project.tags.some(tag => tag.toLowerCase().includes(lowercasedTerm))
      );
      setFilteredProjects(filtered);
    } else {
      setFilteredProjects(projects);
    }
  }, [searchTerm, projects]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success("Logged out successfully");
      navigate("/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out");
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      await deleteDoc(doc(db, "projects", id));
      setProjects(projects.filter(project => project.id !== id));
      toast.success("Project deleted successfully");
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="w-full md:w-auto mb-4 md:mb-0">
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your portfolio projects</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Link 
                to="/admin/projects/new" 
                className="neo-button bg-neo-green text-white border-neo-green inline-flex items-center justify-center gap-2"
              >
                <Plus size={18} />
                Add New Project
              </Link>
              <button 
                onClick={handleLogout}
                className="neo-button inline-flex items-center justify-center gap-2"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-8">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <Link to="/" className="text-neo-blue hover:underline">
              &larr; Back to website
            </Link>
            
            <div className="relative w-full md:w-auto md:min-w-[300px]">
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
          </div>
        </div>
        
        {loading ? (
          <div className="neo-card p-6 animate-pulse">
            <div className="h-6 bg-gray-200 rounded mb-4 w-1/4"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="neo-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Project
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tags
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProjects.map((project) => (
                    <tr key={project.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img 
                              className="h-10 w-10 rounded-full object-cover" 
                              src={project.imageUrl} 
                              alt="" 
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{project.title}</div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">{project.description.substring(0, 50)}...</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{project.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {project.tags.map((tag, idx) => (
                            <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {showDeleteConfirm === project.id ? (
                          <div className="flex items-center justify-end space-x-2">
                            <span className="text-red-600 mr-2">Confirm?</span>
                            <button 
                              onClick={() => handleDeleteProject(project.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Yes
                            </button>
                            <button 
                              onClick={() => setShowDeleteConfirm(null)}
                              className="text-gray-600 hover:text-gray-900"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end space-x-3">
                            <Link
                              to={`/admin/projects/edit/${project.id}`}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              <Edit size={18} />
                            </Link>
                            <button
                              onClick={() => setShowDeleteConfirm(project.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="neo-card p-8 text-center">
            <div className="flex justify-center mb-4">
              <AlertCircle size={48} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">No projects found</h3>
            <p className="text-gray-600 mb-6">
              {projects.length > 0 
                ? "No projects match your search criteria."
                : "You haven't added any projects yet. Start by adding a new project."}
            </p>
            {projects.length > 0 && searchTerm ? (
              <button 
                onClick={() => setSearchTerm("")} 
                className="neo-button mr-4"
              >
                Clear Search
              </button>
            ) : null}
            <Link 
              to="/admin/projects/new" 
              className="neo-button bg-neo-green text-white border-neo-green inline-flex items-center gap-2"
            >
              <Plus size={18} />
              Add New Project
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminProjects;
