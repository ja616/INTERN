import React, { useState } from 'react';
import { ArrowRight, Code, Shield, Cloud, Brain, User, Mail, Phone, GraduationCap, Calendar, Users, MessageSquare } from 'lucide-react';
import { RegistrationForm } from './components/RegistrationForm';
import { Chatbot } from './components/Chatbot';

interface Domain {
  id: string;
  title: string;
  icon: React.ReactNode;
  shortDescription: string;
  detailedDescription: string;
  skills: string[];
  opportunities: string[];
  image: string;
}

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'domain' | 'register' | 'domain-selection'>('home');
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);

  const handleCourseSelect = (domainId: string) => {
    const domain = domains.find(d => d.id === domainId);
    if (domain) {
      setSelectedDomain(domain);
      setCurrentView('domain');
    }
  };

  const handleRegisterWithDomain = (domainId: string) => {
    const domain = domains.find(d => d.id === domainId);
    if (domain) {
      setSelectedDomain(domain);
      setCurrentView('register');
    }
  };

  const domains: Domain[] = [
    {
      id: 'aiml',
      title: 'AI/ML',
      icon: <Brain className="w-8 h-8" />,
      shortDescription: 'Dive into Artificial Intelligence and Machine Learning technologies',
      detailedDescription: 'Explore the fascinating world of Artificial Intelligence and Machine Learning. Work on cutting-edge projects involving neural networks, deep learning, data analysis, and intelligent systems. Gain hands-on experience with popular frameworks and tools used in the industry.',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'Data Analysis', 'Neural Networks', 'Computer Vision'],
      opportunities: ['AI Research Assistant', 'ML Engineer Intern', 'Data Scientist Trainee', 'AI Product Development'],
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity',
      icon: <Shield className="w-8 h-8" />,
      shortDescription: 'Protect digital assets and learn advanced security techniques',
      detailedDescription: 'Enter the critical field of cybersecurity where you\'ll learn to protect organizations from digital threats. Gain expertise in ethical hacking, network security, incident response, and security analysis. Work with industry-standard tools and learn best practices in information security.',
      skills: ['Network Security', 'Ethical Hacking', 'Incident Response', 'Security Analysis', 'Penetration Testing', 'Risk Assessment'],
      opportunities: ['Security Analyst Intern', 'Cybersecurity Consultant', 'SOC Analyst Trainee', 'Security Researcher'],
      image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      id: 'cloud',
      title: 'Cloud Computing',
      icon: <Cloud className="w-8 h-8" />,
      shortDescription: 'Master cloud technologies and scalable infrastructure solutions',
      detailedDescription: 'Discover the power of cloud computing with hands-on experience in AWS, Azure, and Google Cloud. Learn about cloud architecture, containerization, serverless computing, and DevOps practices. Build scalable applications and understand modern infrastructure management.',
      skills: ['AWS/Azure/GCP', 'Docker & Kubernetes', 'DevOps', 'Serverless Computing', 'Cloud Architecture', 'Infrastructure as Code'],
      opportunities: ['Cloud Engineer Intern', 'DevOps Trainee', 'Cloud Solutions Architect', 'Site Reliability Engineer'],
      image: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      id: 'fullstack',
      title: 'Full Stack Development',
      icon: <Code className="w-8 h-8" />,
      shortDescription: 'Build complete web applications from frontend to backend',
      detailedDescription: 'Become a versatile full-stack developer by mastering both frontend and backend technologies. Work with modern frameworks like React, Node.js, and databases to create complete web applications. Learn about API development, database design, and user experience principles.',
      skills: ['React/Angular/Vue', 'Node.js/Python/Java', 'Database Design', 'RESTful APIs', 'Version Control', 'Responsive Design'],
      opportunities: ['Full Stack Developer Intern', 'Web Developer Trainee', 'Software Engineer Intern', 'Frontend/Backend Developer'],
      image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=500'
    }
  ];

  // Domain Selection Page for Registration
  if (currentView === 'domain-selection') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <button 
                onClick={() => setCurrentView('home')}
                className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                PolyIntern
              </button>
            </div>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Select Your Domain</h1>
            <p className="text-xl text-gray-600">Choose the internship domain you want to register for</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {domains.map((domain) => (
              <div key={domain.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-600 relative overflow-hidden">
                  <img 
                    src={domain.image} 
                    alt={domain.title}
                    className="w-full h-full object-cover opacity-20"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center">
                      {domain.icon}
                      <h3 className="text-2xl font-bold mt-2">{domain.title}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4 leading-relaxed">{domain.shortDescription}</p>
                  <button
                    onClick={() => {
                      setSelectedDomain(domain);
                      setCurrentView('register');
                    }}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    REGISTER NOW
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const DomainCard = ({ domain }: { domain: Domain }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
      <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-600 relative overflow-hidden">
        <img 
          src={domain.image} 
          alt={domain.title}
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center">
            {domain.icon}
            <h3 className="text-2xl font-bold mt-2">{domain.title}</h3>
          </div>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-600 mb-4 leading-relaxed">{domain.shortDescription}</p>
        <button
          onClick={() => {
            setSelectedDomain(domain);
            setCurrentView('domain');
          }}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group"
        >
          JOIN NOW
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );

  if (currentView === 'register') {
    return (
      <RegistrationForm
        selectedDomain={selectedDomain}
        onBack={() => setCurrentView('domain')}
        onHome={() => {
          setCurrentView('home');
          setSelectedDomain(null);
        }}
      />
    );
  }

  if (currentView === 'domain' && selectedDomain) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <button 
                onClick={() => setCurrentView('home')}
                className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                PolyIntern
              </button>
            </div>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-4 py-12">
          <button
            onClick={() => setCurrentView('home')}
            className="mb-8 flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Domains
          </button>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative h-80 bg-gradient-to-r from-blue-600 to-blue-700">
              <img 
                src={selectedDomain.image} 
                alt={selectedDomain.title}
                className="w-full h-full object-cover opacity-20"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="mb-4">{selectedDomain.icon}</div>
                  <h1 className="text-5xl font-bold mb-4">{selectedDomain.title}</h1>
                  <p className="text-xl opacity-90 max-w-2xl">{selectedDomain.shortDescription}</p>
                </div>
              </div>
            </div>

            <div className="p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">About This Domain</h2>
                  <p className="text-gray-600 leading-relaxed mb-8 text-lg">{selectedDomain.detailedDescription}</p>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Skills You'll Learn</h3>
                  <div className="flex flex-wrap gap-3 mb-8">
                    {selectedDomain.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Career Opportunities</h3>
                  <ul className="space-y-3 mb-8">
                    {selectedDomain.opportunities.map((opportunity, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600">{opportunity}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Program Highlights</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        3-6 months internship duration
                      </li>
                      <li className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-600" />
                        Mentorship from industry experts
                      </li>
                      <li className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-blue-600" />
                        Certificate of completion
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-12 text-center">
                <button
                  onClick={() => setCurrentView('register')}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-12 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {domains.map((domain) => (
              <DomainCard key={domain.id} domain={domain} />
            ))}
          </div>
        </div>
      </div>
      <Chatbot onCourseSelect={handleCourseSelect} onRegisterWithDomain={handleRegisterWithDomain} />
    </>
  );
}

export default App;