
import { GraduationCap, Calendar } from "lucide-react";

const Education = () => {
  const education = [
    {
      institution: "Universitas Teknologi Sumbawa",
      degree: "Informatika",
      period: "2021 - 2025",
      gpa: "3.78 / 4.00",
      icon: <GraduationCap size={24} className="text-neo-blue" />
    },
    {
      institution: "SMK Negeri 1 Sumbawa",
      degree: "Teknik Komputer Jaringan",
      period: "2017 - 2020",
      gpa: "",
      icon: <GraduationCap size={24} className="text-neo-purple" />
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-heading text-center mb-12 reveal">Education</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {education.map((item, index) => (
            <div 
              key={index} 
              className="neo-card p-8 reveal"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{item.institution}</h3>
                  <p className="text-gray-600 mb-3">{item.degree}</p>
                  <div className="flex items-center text-gray-500 mb-2">
                    <Calendar size={16} className="mr-2" />
                    <span>{item.period}</span>
                  </div>
                  {item.gpa && (
                    <p className="text-neo-blue font-medium">IPK: {item.gpa}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
