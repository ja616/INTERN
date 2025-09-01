import React, { useState } from 'react';
import { MessageCircle, X, Download, Phone, Mail, MapPin, ArrowLeft } from 'lucide-react';

interface ChatbotProps {
  onCourseSelect: (domain: string) => void;
  onRegisterDirect: () => void;
}

type ChatState = 'welcome' | 'browse-courses' | 'download' | 'contact';

export const Chatbot: React.FC<ChatbotProps> = ({ onCourseSelect, onRegisterDirect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatState, setChatState] = useState<ChatState>('welcome');

  const courses = [
    { id: 'aiml', name: 'AI/ML' },
    { id: 'cybersecurity', name: 'Cybersecurity' },
    { id: 'cloud', name: 'Cloud Computing' },
    { id: 'fullstack', name: 'Full Stack Development' }
  ];

  const handleCourseSelection = (courseId: string, courseName: string) => {
    onCourseSelect(courseId);
    setIsOpen(false);
    setChatState('welcome');
  };

  const handleRegistrationRedirect = () => {
    onRegisterDirect();
    setIsOpen(false);
    setChatState('welcome');
  };

  const handleDownloadPDF = (courseName: string) => {
    // Simulate PDF download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${courseName.replace(/\s+/g, '_')}_Course_Content.pdf`;
    link.click();
    
    // Show success message
    alert(`${courseName} course PDF download started!`);
  };

  const renderChatContent = () => {
    switch (chatState) {
      case 'welcome':
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-700 leading-relaxed">
                Hello! Welcome to Emberquest. How can I assist you today?
              </p>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => setChatState('browse-courses')}
                className="w-full text-left p-4 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 font-medium"
              >
                Browse Courses & Details
              </button>
              <button
                onClick={handleRegistrationRedirect}
                className="w-full text-left p-4 bg-white border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-300 transition-all duration-200 font-medium"
              >
                Registration
              </button>
              <button
                onClick={() => setChatState('download')}
                className="w-full text-left p-4 bg-white border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 font-medium"
              >
                Download Course Content
              </button>
              <button
                onClick={() => setChatState('contact')}
                className="w-full text-left p-4 bg-white border border-gray-200 rounded-lg hover:bg-orange-50 hover:border-orange-300 transition-all duration-200 font-medium"
              >
                Contact
              </button>
            </div>
          </div>
        );

      case 'browse-courses':
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-700">
                Please select the course you're interested in:
              </p>
            </div>
            <div className="space-y-3">
              {courses.map((course) => (
                <button
                  key={course.id}
                  onClick={() => handleCourseSelection(course.id, course.name)}
                  className="w-full text-left p-4 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 font-medium"
                >
                  {course.name}
                </button>
              ))}
            </div>
            <button
              onClick={() => setChatState('welcome')}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          </div>
        );

      case 'download':
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-700">
                Select the domain for which you want to download the course PDF:
              </p>
            </div>
            <div className="space-y-3">
              {courses.map((course) => (
                <button
                  key={course.id}
                  onClick={() => handleDownloadPDF(course.name)}
                  className="w-full text-left p-4 bg-white border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-300 transition-all duration-200 font-medium flex items-center gap-3"
                >
                  <Download className="w-5 h-5 text-green-600" />
                  {course.name} (Download PDF)
                </button>
              ))}
            </div>
            <button
              onClick={() => setChatState('welcome')}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-700 mb-4">
                You can reach us through the following channels:
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">WhatsApp</p>
                    <a href="https://wa.me/919731755053" className="font-medium text-green-600 hover:underline">
                      +91 97317 55053
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Website</p>
                    <a href="https://www.emberquest.in" className="font-medium text-blue-600 hover:underline">
                      www.emberquest.in
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Address</p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      05, Abba Bhavani Temple, Back Side Ms Palaya<br />
                      Dodda Vidyaranyapura, Bengaluru, Karnataka 560097
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => setChatState('welcome')}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center">
        <div className="mb-2 bg-white px-3 py-1 rounded-full shadow-lg border">
          <span className="text-sm font-medium text-gray-700">Need Help?</span>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">Emberquest Assistant</h1>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Chat Content */}
        <div className="max-w-2xl mx-auto px-6 py-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {renderChatContent()}
          </div>
        </div>
      </div>
    </div>
  );
};