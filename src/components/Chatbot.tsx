import React, { useState } from 'react';
import { MessageCircle, X, Download, Phone, Mail, MapPin, ArrowLeft } from 'lucide-react';

interface ChatbotProps {
  onCourseSelect: (domain: string) => void;
}

type ChatState = 'welcome' | 'browse-courses' | 'download' | 'contact' | 'course-selected';

export const Chatbot: React.FC<ChatbotProps> = ({ onCourseSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatState, setChatState] = useState<ChatState>('welcome');
  const [selectedCourse, setSelectedCourse] = useState<string>('');

  const courses = [
    { id: 'aiml', name: 'AI/ML' },
    { id: 'cybersecurity', name: 'Cybersecurity' },
    { id: 'cloud', name: 'Cloud Computing' },
    { id: 'fullstack', name: 'Full Stack Development' }
  ];

  const handleCourseSelection = (courseId: string, courseName: string) => {
    setSelectedCourse(courseName);
    onCourseSelect(courseId);
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
          <div className="space-y-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-gray-700">
                Hello! Welcome to Emberquest. How can I assist you today?
              </p>
            </div>
            <div className="space-y-2">
              <button
                onClick={() => setChatState('browse-courses')}
                className="w-full text-left p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                Browse Courses & Details
              </button>
              <button
                onClick={() => setChatState('browse-courses')}
                className="w-full text-left p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                Registration
              </button>
              <button
                onClick={() => setChatState('download')}
                className="w-full text-left p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                Download Course Content
              </button>
              <button
                onClick={() => setChatState('contact')}
                className="w-full text-left p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                Contact
              </button>
            </div>
          </div>
        );

      case 'browse-courses':
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-gray-700">
                Please select the course you're interested in:
              </p>
            </div>
            <div className="space-y-2">
              {courses.map((course) => (
                <button
                  key={course.id}
                  onClick={() => handleCourseSelection(course.id, course.name)}
                  className="w-full text-left p-3 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium"
                >
                  {course.name}
                </button>
              ))}
            </div>
            <button
              onClick={() => setChatState('welcome')}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          </div>
        );

      case 'download':
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-gray-700">
                Select the domain for which you want to download the course PDF:
              </p>
            </div>
            <div className="space-y-2">
              {courses.map((course) => (
                <button
                  key={course.id}
                  onClick={() => handleDownloadPDF(course.name)}
                  className="w-full text-left p-3 bg-white border border-gray-200 rounded-lg hover:bg-green-50 transition-colors text-sm font-medium flex items-center gap-2"
                >
                  <Download className="w-4 h-4 text-green-600" />
                  {course.name} (Download PDF)
                </button>
              ))}
            </div>
            <button
              onClick={() => setChatState('welcome')}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-gray-700 mb-3">
                You can reach us through the following channels:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">WhatsApp</p>
                    <a href="https://wa.me/919731755053" className="text-sm font-medium text-green-600 hover:underline">
                      +91 97317 55053
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Website</p>
                    <a href="https://www.emberquest.in" className="text-sm font-medium text-blue-600 hover:underline">
                      www.emberquest.in
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-red-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Address</p>
                    <p className="text-sm text-gray-700">
                      05, Abba Bhavani Temple, Back Side Ms Palaya Dodda Vidyaranyapura, Bengaluru, Karnataka 560097
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => setChatState('welcome')}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
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

  return (
    <>
      {/* Chat Widget Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-hidden">
          <div className="bg-blue-600 text-white p-4 rounded-t-lg">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <h3 className="font-semibold">Emberquest Assistant</h3>
            </div>
          </div>
          <div className="p-4 max-h-80 overflow-y-auto">
            {renderChatContent()}
          </div>
        </div>
      )}
    </>
  );
};