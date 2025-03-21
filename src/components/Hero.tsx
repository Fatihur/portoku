
import { ArrowDownCircle, Code, Laptop, PenTool, Database } from "lucide-react";

const Hero = () => {
  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background elements with more variety and animations */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-40 left-1/4 w-64 h-64 rounded-full bg-neo-yellow/30 animate-float blur-3xl"></div>
        <div className="absolute top-0 right-1/3 w-72 h-72 rounded-full bg-neo-blue/20 animate-float blur-3xl" style={{ animationDelay: "1s" }}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 rounded-full bg-neo-pink/20 animate-float blur-3xl" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-neo-green/20 animate-float blur-3xl" style={{ animationDelay: "3s" }}></div>
        <div className="absolute bottom-1/3 left-1/4 w-56 h-56 rounded-full bg-neo-orange/20 animate-float blur-3xl" style={{ animationDelay: "4s" }}></div>
        
        {/* Geometric shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-neo-blue/10 rotate-45 animate-rotate-slow"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-neo-pink/10 rounded-lg animate-pulse"></div>
        <div className="absolute top-1/2 left-10 w-12 h-12 bg-neo-yellow/10 rounded-full animate-bounce" style={{ animationDuration: "4s" }}></div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          <div className="inline-block animate-scale-in">
            <span className="neo-tag bg-neo-blue/10 text-neo-blue border-neo-blue mb-4">Technology Enthusiast</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neo-purple to-neo-blue inline-block animate-pulse" style={{ animationDuration: "3s" }}>
              Fatihurroyyan
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neo-blue to-neo-purple mt-2 inline-block">
              Portfolio
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            I'm passionate about technology, graphic design, coding, networking, and data analysis. 
            Creating innovative solutions that combine aesthetics and functionality.
          </p>
          
          {/* Tech icons */}
          <div className="flex justify-center gap-6 mb-8 animate-slide-up" style={{ animationDelay: "0.5s" }}>
            <div className="flex flex-col items-center group">
              <div className="p-3 bg-neo-blue/10 rounded-full group-hover:bg-neo-blue/20 transition-colors duration-300">
                <PenTool className="w-6 h-6 text-neo-blue animate-slide-up" style={{ animationDelay: "0.6s" }} />
              </div>
              <span className="mt-2 text-sm">Design</span>
            </div>
            <div className="flex flex-col items-center group">
              <div className="p-3 bg-neo-purple/10 rounded-full group-hover:bg-neo-purple/20 transition-colors duration-300">
                <Code className="w-6 h-6 text-neo-purple animate-slide-up" style={{ animationDelay: "0.7s" }} />
              </div>
              <span className="mt-2 text-sm">Coding</span>
            </div>
            <div className="flex flex-col items-center group">
              <div className="p-3 bg-neo-orange/10 rounded-full group-hover:bg-neo-orange/20 transition-colors duration-300">
                <Laptop className="w-6 h-6 text-neo-orange animate-slide-up" style={{ animationDelay: "0.8s" }} />
              </div>
              <span className="mt-2 text-sm">Networking</span>
            </div>
            <div className="flex flex-col items-center group">
              <div className="p-3 bg-neo-green/10 rounded-full group-hover:bg-neo-green/20 transition-colors duration-300">
                <Database className="w-6 h-6 text-neo-green animate-slide-up" style={{ animationDelay: "0.9s" }} />
              </div>
              <span className="mt-2 text-sm">Data</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: "0.6s" }}>
            <a
              href="#about"
              className="neo-button bg-neo-blue text-white border-neo-blue group relative overflow-hidden"
            >
              <span className="relative z-10">About Me</span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            </a>
            <a
              href="/projects"
              className="neo-button group relative overflow-hidden"
            >
              <span className="relative z-10">See My Work</span>
              <span className="absolute inset-0 bg-neo-blue opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
            </a>
          </div>
        </div>
      </div>

      <button
        onClick={handleScrollDown}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-neo-black hover:text-neo-blue transition-colors duration-300"
        aria-label="Scroll down"
      >
        <ArrowDownCircle size={32} />
      </button>
      
      {/* Floating elements */}
      <div className="absolute top-1/4 right-[15%] w-8 h-8 bg-neo-yellow rounded-lg animate-float" style={{ animationDelay: "1.5s" }}></div>
      <div className="absolute bottom-1/4 left-[15%] w-6 h-6 bg-neo-pink rounded-full animate-float" style={{ animationDelay: "2.5s" }}></div>
      <div className="absolute top-1/3 left-[10%] w-10 h-10 bg-neo-blue/30 rotate-45 animate-float" style={{ animationDelay: "3.5s" }}></div>
    </section>
  );
};

export default Hero;
