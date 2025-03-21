
import { CheckCircle2 } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      title: "Office & Documentation",
      skills: ["Microsoft Word", "Microsoft Excel", "Microsoft PowerPoint"]
    },
    {
      title: "System & Network",
      skills: ["Network Fundamentals", "Network Troubleshooting"]
    },
    {
      title: "Hardware & Software",
      skills: ["Assembly", "Installation", "Maintenance"]
    },
    {
      title: "IT Support",
      skills: ["Troubleshooting", "Technical Support", "Helpdesk"]
    },
    {
      title: "System Administration",
      skills: ["Data Management", "Data Entry", "Office Software Administration"]
    },
    {
      title: "Graphic Design",
      skills: ["Design Software", "Documentation", "Presentation"]
    },
    {
      title: "Programming",
      skills: ["Python", "PHP", "C++", "Web Development"]
    }
  ];

  const languages = [
    { language: "Indonesia", level: "Fasih", percentage: 100 },
    { language: "Inggris", level: "Dasar", percentage: 50 }
  ];

  const trainings = [
    "Dicoding Academy | Front End dan Backend Web Developer | Data Analyst | AI",
    "Olat Maras Training Center | Junior Web Programmer"
  ];

  const organizations = [
    "Himpunan Mahasiswa Informatika (Anggota departemen media, Ketua departemen media, Ketua divisi media pada ospek jurusan informatika 2021, Mentor program kerja kelas pemrograman, Teknisi program kerja Bengkel IT)",
    "Kepala Departemen Media UKM Tapak Suci",
    "Asisten Dosen Mata Kuliah Pemrograman Dasar",
    "Penanggung Jawab Desain Hibah Indonesiana 2023-2024",
    "Tim Pendamping App Competition MXGP"
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-heading text-center mb-12 reveal">Skills & Qualifications</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <div 
              key={index} 
              className="neo-card p-6 reveal"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-xl font-bold mb-4 text-neo-blue">{category.title}</h3>
              <ul className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <li key={skillIndex} className="flex items-center">
                    <CheckCircle2 size={18} className="text-neo-green mr-2 flex-shrink-0" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="neo-card p-6 reveal">
            <h3 className="text-xl font-bold mb-6 text-neo-blue">Languages</h3>
            {languages.map((lang, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{lang.language}</span>
                  <span className="text-gray-600 text-sm">{lang.level}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-neo-blue h-2.5 rounded-full" 
                    style={{ width: `${lang.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="neo-card p-6 reveal">
            <h3 className="text-xl font-bold mb-4 text-neo-blue">Bootcamp & Training</h3>
            <ul className="space-y-3">
              {trainings.map((training, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-neo-blue mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-600">{training}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="neo-card p-6 reveal">
          <h3 className="text-xl font-bold mb-4 text-neo-blue">Organizations & Volunteer</h3>
          <ul className="space-y-4">
            {organizations.map((org, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-neo-blue mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-gray-600">{org}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Skills;
