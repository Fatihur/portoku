
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import About from "../components/About";
import Education from "../components/Education";
import Experience from "../components/Experience";
import Skills from "../components/Skills";
import { useEffect, useState } from "react";
import { collection, getDocs, limit, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";
import ProjectCard, { Project } from "../components/ProjectCard";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        const q = query(
          collection(db, "projects"),
          orderBy("date", "desc"),
          limit(3)
        );
        const querySnapshot = await getDocs(q);
        const projects: Project[] = [];
        
        querySnapshot.forEach((doc) => {
          projects.push({ id: doc.id, ...doc.data() } as Project);
        });
        
        setFeaturedProjects(projects);
      } catch (error) {
        console.error("Error fetching featured projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProjects();
  }, []);

  return (
    <Layout>
      <Hero />
      <About />
      <Education />
      <Experience />
      <Skills />
      
      {/* Featured Projects Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <h2 className="section-heading reveal">Featured Projects</h2>
            <Link 
              to="/projects" 
              className="group inline-flex items-center gap-2 text-neo-blue hover:underline mt-4 md:mt-0 reveal"
            >
              View All Projects 
              <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
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
          ) : featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          ) : (
            <div className="neo-card p-8 text-center">
              <p className="text-lg text-gray-600">No projects found. Add some projects in the admin panel!</p>
              <Link to="/admin" className="neo-button mt-4 inline-block">
                Go to Admin
              </Link>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Index;
