
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash } from "lucide-react";
import { db } from "../firebase/config";
import { doc, getDoc, setDoc, collection, deleteDoc } from "firebase/firestore";
import Layout from "../components/Layout";

interface ProjectFormData {
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  demoUrl: string;
  date: string;
}

const AdminAddProject = () => {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    description: "",
    imageUrl: "",
    tags: [],
    demoUrl: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [newTag, setNewTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (id) {
      fetchProjectData(id);
    } else {
      // Reset form for new project
      setFormData({
        title: "",
        description: "",
        imageUrl: "",
        tags: [],
        demoUrl: "",
        date: new Date().toISOString().split("T")[0],
      });
    }
  }, [id]);

  const fetchProjectData = async (id: string) => {
    try {
      setLoading(true);
      const docRef = doc(db, "projects", id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const projectData = docSnap.data();
        setFormData({
          title: projectData.title || "",
          description: projectData.description || "",
          imageUrl: projectData.imageUrl || "",
          tags: Array.isArray(projectData.tags) ? projectData.tags : [], // Ensure tags is always an array
          demoUrl: projectData.demoUrl || "",
          date: projectData.date || new Date().toISOString().split("T")[0]
        });
      }
    } catch (error) {
      console.error("Error fetching project:", error);
      toast({
        title: "Error",
        description: "Failed to fetch project data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      
      // Validate required fields
      if (!formData.title.trim() || !formData.description.trim()) {
        toast({
          title: "Missing fields",
          description: "Please fill in all required fields",
          variant: "destructive"
        });
        return;
      }
      
      // Prepare project data
      let projectData = {
        ...formData,
        tags: Array.isArray(formData.tags) ? formData.tags : [], // Ensure tags is always an array
        updatedAt: new Date().toISOString()
      };
      
      // Save project data to Firestore
      saveProjectToFirestore(projectData);
      
    } catch (error) {
      console.error("Error saving project:", error);
      toast({
        title: "Error",
        description: "Failed to save project",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const saveProjectToFirestore = async (projectData: any) => {
    try {
      if (id) {
        // Update existing project
        await setDoc(doc(db, "projects", id), projectData);
        toast({
          title: "Success",
          description: "Project updated successfully!",
        });
      } else {
        // Add new project with a generated ID
        const newDocRef = doc(collection(db, "projects"));
        await setDoc(newDocRef, projectData);
        toast({
          title: "Success",
          description: "Project added successfully!",
        });
      }
      
      // Invalidate projects query to refresh data
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      navigate("/admin/projects");
    } catch (error) {
      console.error("Firestore save error:", error);
      toast({
        title: "Firestore Error",
        description: "Failed to save project data to Firestore.",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async () => {
    if (!id) return;
  
    try {
      setSubmitting(true);
      const projectRef = doc(db, "projects", id);
  
      // Delete document from Firestore
      await deleteDoc(projectRef);
  
      toast({
        title: "Success",
        description: "Project deleted successfully!",
      });
  
      // Invalidate projects query to refresh data
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      navigate("/admin/projects");
    } catch (error) {
      console.error("Error deleting project:", error);
      toast({
        title: "Error",
        description: "Failed to delete project.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-4">{id ? "Edit Project" : "Add New Project"}</h1>
        <Separator className="mb-6" />

        {loading ? (
          <p>Loading project data...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="neo-input"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="neo-input"
              />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="neo-input"
              />
            </div>
            <div>
              <Label htmlFor="demoUrl">Demo URL</Label>
              <Input
                type="url"
                id="demoUrl"
                name="demoUrl"
                value={formData.demoUrl}
                onChange={handleChange}
                className="neo-input"
              />
            </div>
            <div>
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="neo-input"
              />
              {formData.imageUrl && (
                <div className="mt-2">
                  <img
                    src={formData.imageUrl}
                    alt="Project Preview"
                    className="max-h-48 rounded-md"
                  />
                </div>
              )}
            </div>
            <div>
              <Label>Tags</Label>
              <div className="flex items-center space-x-2 mb-2">
                <Input
                  type="text"
                  placeholder="Add a tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="neo-input"
                />
                <Button type="button" onClick={handleAddTag} variant="secondary">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Tag
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <div key={tag} className="neo-tag flex items-center">
                    {tag}
                    <Button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      variant="ghost"
                      className="h-6 w-6 p-0 ml-2"
                    >
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Remove tag</span>
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <Button
                type="submit"
                disabled={submitting}
                className="bg-neo-blue text-white border-neo-blue neo-button"
              >
                {submitting ? "Submitting..." : "Submit"}
              </Button>
              {id && (
                <Button
                  type="button"
                  onClick={handleDelete}
                  disabled={submitting}
                  variant="destructive"
                >
                  {submitting ? "Deleting..." : "Delete"}
                </Button>
              )}
            </div>
          </form>
        )}
      </div>
    </Layout>
  );
};

export default AdminAddProject;
