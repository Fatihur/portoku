
import { Code, Cpu, Database, Palette, Server } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="w-full md:w-1/2">
            <div className="neo-card p-8 h-full">
              <h2 className="section-heading">About Me</h2>
              <p className="text-lg mb-6 leading-relaxed">
                I am a technology enthusiast with a passion for various aspects of the digital world. 
                My interests span across graphic design, coding, networking, and data analysis.
              </p>
              <p className="text-lg mb-6 leading-relaxed">
                I believe in the power of technology to transform and improve our lives, 
                and I am dedicated to honing my skills in these areas to contribute to meaningful projects.
              </p>
              <p className="text-lg leading-relaxed">
                Currently pursuing a degree in Informatics, I am constantly seeking to expand my knowledge and 
                apply what I learn to solve real-world problems.
              </p>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="neo-card p-6 flex flex-col items-center text-center hover:bg-neo-blue/5 transition-colors duration-300">
                <div className="w-16 h-16 flex items-center justify-center bg-neo-blue/10 rounded-full mb-4">
                  <Palette className="w-8 h-8 text-neo-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Graphic Design</h3>
                <p className="text-gray-600">Creating visual content that communicates messages effectively.</p>
              </div>
              
              <div className="neo-card p-6 flex flex-col items-center text-center hover:bg-neo-purple/5 transition-colors duration-300">
                <div className="w-16 h-16 flex items-center justify-center bg-neo-purple/10 rounded-full mb-4">
                  <Code className="w-8 h-8 text-neo-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Coding</h3>
                <p className="text-gray-600">Turning ideas into reality through programming languages.</p>
              </div>
              
              <div className="neo-card p-6 flex flex-col items-center text-center hover:bg-neo-orange/5 transition-colors duration-300">
                <div className="w-16 h-16 flex items-center justify-center bg-neo-orange/10 rounded-full mb-4">
                  <Server className="w-8 h-8 text-neo-orange" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Networking</h3>
                <p className="text-gray-600">Building and maintaining robust network infrastructures.</p>
              </div>
              
              <div className="neo-card p-6 flex flex-col items-center text-center hover:bg-neo-green/5 transition-colors duration-300">
                <div className="w-16 h-16 flex items-center justify-center bg-neo-green/10 rounded-full mb-4">
                  <Database className="w-8 h-8 text-neo-green" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Data Analysis</h3>
                <p className="text-gray-600">Extracting insights from data to drive informed decisions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
