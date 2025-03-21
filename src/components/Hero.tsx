import { ArrowDownCircle, Code, Laptop, PenTool, Database } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <motion.section 
      ref={containerRef}
      style={{ opacity, scale, y }}
      className="relative h-screen flex items-center overflow-hidden"
    >
      {/* Background elements with more variety and animations */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute top-40 left-1/4 w-64 h-64 rounded-full bg-neo-yellow/30 animate-float blur-3xl"
        ></motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute top-0 right-1/3 w-72 h-72 rounded-full bg-neo-blue/20 animate-float blur-3xl" 
          style={{ animationDelay: "1s" }}
        ></motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute bottom-20 left-1/3 w-80 h-80 rounded-full bg-neo-pink/20 animate-float blur-3xl" 
          style={{ animationDelay: "2s" }}
        ></motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-neo-green/20 animate-float blur-3xl" 
          style={{ animationDelay: "3s" }}
        ></motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute bottom-1/3 left-1/4 w-56 h-56 rounded-full bg-neo-orange/20 animate-float blur-3xl" 
          style={{ animationDelay: "4s" }}
        ></motion.div>
        
        {/* Geometric shapes */}
        <motion.div 
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 1, rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 w-20 h-20 bg-neo-blue/10 rotate-45"
        ></motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-20 right-10 w-16 h-16 bg-neo-pink/10 rounded-lg"
        ></motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-10 w-12 h-12 bg-neo-yellow/10 rounded-full"
        ></motion.div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            <span className="neo-tag bg-neo-blue/10 text-neo-blue border-neo-blue mb-4">Technology Enthusiast</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            <motion.span 
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="bg-clip-text text-transparent bg-gradient-to-r from-neo-purple to-neo-blue inline-block bg-[length:200%_auto]"
            >
              Fatihurroyyan
            </motion.span>
            <br />
            <motion.span 
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              className="bg-clip-text text-transparent bg-gradient-to-r from-neo-blue to-neo-purple mt-2 inline-block bg-[length:200%_auto]"
            >
              Portfolio
            </motion.span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8"
          >
            I'm passionate about technology, graphic design, coding, networking, and data analysis. 
            Creating innovative solutions that combine aesthetics and functionality.
          </motion.p>
          
          {/* Tech icons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-center gap-6 mb-8"
          >
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center group"
            >
              <div className="p-3 bg-neo-blue/10 rounded-full group-hover:bg-neo-blue/20 transition-colors duration-300">
                <PenTool className="w-6 h-6 text-neo-blue" />
              </div>
              <span className="mt-2 text-sm">Design</span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center group"
            >
              <div className="p-3 bg-neo-purple/10 rounded-full group-hover:bg-neo-purple/20 transition-colors duration-300">
                <Code className="w-6 h-6 text-neo-purple" />
              </div>
              <span className="mt-2 text-sm">Coding</span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center group"
            >
              <div className="p-3 bg-neo-orange/10 rounded-full group-hover:bg-neo-orange/20 transition-colors duration-300">
                <Laptop className="w-6 h-6 text-neo-orange" />
              </div>
              <span className="mt-2 text-sm">Networking</span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center group"
            >
              <div className="p-3 bg-neo-green/10 rounded-full group-hover:bg-neo-green/20 transition-colors duration-300">
                <Database className="w-6 h-6 text-neo-green" />
              </div>
              <span className="mt-2 text-sm">Data</span>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#about"
              className="neo-button bg-neo-blue text-white border-neo-blue group relative overflow-hidden"
            >
              <span className="relative z-10">About Me</span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/cv.pdf"
              download="Fatihurroyyan_CV.pdf"
              className="neo-button group relative overflow-hidden"
            >
              <span className="relative z-10">Download CV</span>
              <span className="absolute inset-0 bg-neo-blue opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
            </motion.a>
          </motion.div>
        </div>
      </div>

      <motion.button
        onClick={handleScrollDown}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-neo-black hover:text-neo-blue transition-colors duration-300"
        aria-label="Scroll down"
        animate={{ 
          y: [0, 10, 0],
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <ArrowDownCircle size={32} />
      </motion.button>
      
      {/* Floating elements */}
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        className="absolute top-1/4 right-[15%] w-8 h-8 bg-neo-yellow rounded-lg"
        animate={{ 
          y: [0, -20, 0],
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      ></motion.div>
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 2.5 }}
        className="absolute bottom-1/4 left-[15%] w-6 h-6 bg-neo-pink rounded-full"
        animate={{ 
          y: [0, -20, 0],
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      ></motion.div>
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 3.5 }}
        className="absolute top-1/3 left-[10%] w-10 h-10 bg-neo-blue/30 rotate-45"
        animate={{ 
          y: [0, -20, 0],
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      ></motion.div>
    </motion.section>
  );
};

export default Hero;
