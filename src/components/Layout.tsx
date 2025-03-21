
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
    
    // Reveal animation on scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    const checkReveal = () => {
      for (let i = 0; i < revealElements.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = revealElements[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          revealElements[i].classList.add('active');
        }
      }
    };
    
    window.addEventListener('scroll', checkReveal);
    // Initial check
    checkReveal();
    
    return () => {
      window.removeEventListener('scroll', checkReveal);
    };
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        {children}
      </main>
      <footer className="bg-neo-black text-white py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-xl font-bold">Portfolio.</p>
              <p className="mt-1 text-sm text-gray-400">© {new Date().getFullYear()} All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-neo-blue transition-colors duration-300">LinkedIn</a>
              <a href="#" className="hover:text-neo-blue transition-colors duration-300">GitHub</a>
              <a href="#" className="hover:text-neo-blue transition-colors duration-300">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
