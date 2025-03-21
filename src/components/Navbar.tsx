
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const links = [
    { title: "Home", path: "/" },
    { title: "Projects", path: "/projects" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 glassmorphism shadow-md"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity duration-300 flex items-center"
          >
            <span className="bg-neo-black text-white px-2 py-1 mr-1 rounded-md">F</span>
            <span className="text-neo-blue">Portfolio.</span>
          </Link>

          {/* Desktop menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.title}
                to={link.path}
                className={`relative text-base font-medium transition-colors duration-300 
                hover:text-neo-blue after:content-[''] after:absolute after:w-full after:scale-x-0 
                after:h-0.5 after:bottom-0 after:left-0 after:bg-neo-blue after:origin-bottom-right 
                after:transition-transform after:duration-300 hover:after:scale-x-100 
                hover:after:origin-bottom-left ${
                  location.pathname === link.path ? "text-neo-blue after:scale-x-100" : ""
                }`}
              >
                {link.title}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-neo-black focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden absolute w-full bg-white shadow-lg transition-all duration-300 ease-in-out 
        ${isMenuOpen ? "max-h-screen py-5 opacity-100" : "max-h-0 py-0 opacity-0 overflow-hidden"}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col space-y-4">
            {links.map((link) => (
              <Link
                key={link.title}
                to={link.path}
                className={`px-2 py-2 text-base font-medium transition-colors duration-200 
                hover:text-neo-blue ${
                  location.pathname === link.path ? "text-neo-blue" : ""
                }`}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
