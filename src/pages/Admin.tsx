
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { Loader2 } from "lucide-react";

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/admin/projects");
      } else {
        navigate("/admin/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Loader2 size={40} className="animate-spin text-neo-blue mb-4" />
      <p className="text-lg">Checking authentication...</p>
    </div>
  );
};

export default Admin;
