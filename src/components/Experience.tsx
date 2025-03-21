
import { Briefcase, Calendar } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      company: "RR Digital",
      position: "Operator",
      period: "",
      responsibilities: [
        "Melayani konsumen dengan memberikan informasi terkait layanan percetakan.",
        "Menjalankan dan merawat peralatan percetakan agar tetap berfungsi dengan baik.",
        "Mengorganisir dan mengarsipkan file digital untuk keperluan cetak."
      ],
      icon: <Briefcase size={24} className="text-neo-blue" />
    },
    {
      company: "PT. Amman Mineral Nusa Tenggara",
      position: "Content Development | Internship",
      period: "",
      responsibilities: [
        "Membuat konten untuk pelatihan karyawan dan pengembangan sumber daya manusia.",
        "Mendesain materi serta kebutuhan visual untuk Training Department.",
        "Melakukan fotografi untuk mendukung dokumentasi pelatihan dan kegiatan internal perusahaan."
      ],
      icon: <Briefcase size={24} className="text-neo-purple" />
    },
    {
      company: "PT. Telkom Indonesia Datel Sumbawa",
      position: "Teknisi | Internship",
      period: "",
      responsibilities: [
        "Melakukan instalasi dan konfigurasi jaringan telekomunikasi.",
        "Melakukan troubleshooting jaringan untuk memastikan konektivitas yang optimal.",
        "Mendukung pemeliharaan dan perbaikan infrastruktur jaringan."
      ],
      icon: <Briefcase size={24} className="text-neo-orange" />
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-heading text-center mb-12 reveal">Work Experience</h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <div 
                key={index} 
                className="neo-card p-8 reveal"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {experience.icon}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-2 mb-2">
                      <h3 className="text-xl font-bold">{experience.company}</h3>
                      <span className="text-neo-blue font-medium">{experience.position}</span>
                    </div>
                    {experience.period && (
                      <div className="flex items-center text-gray-500 mb-4">
                        <Calendar size={16} className="mr-2" />
                        <span>{experience.period}</span>
                      </div>
                    )}
                    <ul className="space-y-2 mt-4">
                      {experience.responsibilities.map((responsibility, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="inline-block w-2 h-2 rounded-full bg-neo-blue mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-600">{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
