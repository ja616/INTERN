import React, { useState } from 'react';
import { MessageCircle, X, Download, Phone, Mail, MapPin, ArrowLeft } from 'lucide-react';

interface ChatbotProps {
  onCourseSelect: (domain: string) => void;
  onRegisterWithDomain: (domain: string) => void;
}

type ChatState = 'welcome' | 'browse-courses' | 'registration-domains' | 'download' | 'contact';

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const Chatbot: React.FC<ChatbotProps> = ({ onCourseSelect, onRegisterWithDomain }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatState, setChatState] = useState<ChatState>('welcome');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hello! Welcome to Emberquest. How can I assist you today?',
      isUser: false,
      timestamp: new Date()
    }
  ]);

  const courses = [
    { id: 'aiml', name: 'AI/ML' },
    { id: 'cybersecurity', name: 'Cybersecurity' },
    { id: 'cloud', name: 'Cloud Computing' },
    { id: 'fullstack', name: 'Full Stack Development' }
  ];

  const addMessage = (text: string, isUser: boolean) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      isUser,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleOptionClick = (option: string, nextState?: ChatState) => {
    addMessage(option, true);
    
    setTimeout(() => {
      switch (nextState) {
        case 'browse-courses':
          addMessage('Please select the course you\'re interested in:', false);
          break;
        case 'registration-domains':
          addMessage('Please select the domain you want to register for:', false);
          break;
        case 'download':
          addMessage('Select the domain for which you want to download the course PDF:', false);
          break;
        case 'contact':
          addMessage('You can reach us through the following channels:', false);
          break;
      }
      if (nextState) setChatState(nextState);
    }, 500);
  };

  const handleCourseSelection = (courseId: string, courseName: string) => {
    addMessage(courseName, true);
    setTimeout(() => {
      addMessage(`Great choice! Redirecting you to the ${courseName} course details...`, false);
      setTimeout(() => {
        onCourseSelect(courseId);
        setIsOpen(false);
        setChatState('welcome');
        setMessages([{
          id: '1',
          text: 'Hello! Welcome to Emberquest. How can I assist you today?',
          isUser: false,
          timestamp: new Date()
        }]);
      }, 1000);
    }, 500);
  };

  const handleRegistrationSelection = (courseId: string, courseName: string) => {
    addMessage(courseName, true);
    setTimeout(() => {
      addMessage(`Perfect! Opening registration form for ${courseName}...`, false);
      setTimeout(() => {
        onRegisterWithDomain(courseId);
        setIsOpen(false);
        setChatState('welcome');
        setMessages([{
          id: '1',
          text: 'Hello! Welcome to Emberquest. How can I assist you today?',
          isUser: false,
          timestamp: new Date()
        }]);
      }, 1000);
    }, 500);
  };

  const handleDownloadPDF = (courseName: string) => {
    addMessage(`${courseName} (Download PDF)`, true);
    setTimeout(() => {
      addMessage(`Downloading ${courseName} course PDF...`, false);
      // Simulate PDF download
      const link = document.createElement('a');
      link.href = '#';
      link.download = `${courseName.replace(/\s+/g, '_')}_Course_Content.pdf`;
      link.click();
    }, 500);
  };

  const handleBackToMain = () => {
    setChatState('welcome');
    addMessage('Back to main menu', true);
    setTimeout(() => {
      addMessage('Hello! Welcome to Emberquest. How can I assist you today?', false);
    }, 500);
  };

  const renderOptions = () => {
    switch (chatState) {
      case 'welcome':
        return (
          <div className="space-y-2">
            <button
              onClick={() => handleOptionClick('Browse Courses & Details', 'browse-courses')}
              className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-all duration-200 font-medium text-blue-800"
            >
              Browse Courses & Details
            </button>
            <button
              onClick={() => handleOptionClick('Registration', 'registration-domains')}
              className="w-full text-left p-3 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg transition-all duration-200 font-medium text-green-800"
            >
              Registration
            </button>
            <button
              onClick={() => handleOptionClick('Download Course Content', 'download')}
              className="w-full text-left p-3 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg transition-all duration-200 font-medium text-purple-800"
            >
              Download Course Content
            </button>
            <button
              onClick={() => handleOptionClick('Contact', 'contact')}
              className="w-full text-left p-3 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg transition-all duration-200 font-medium text-orange-800"
            >
              Contact
            </button>
          </div>
        );

      case 'browse-courses':
        return (
          <div className="space-y-2">
            {courses.map((course) => (
              <button
                key={course.id}
                onClick={() => handleCourseSelection(course.id, course.name)}
                className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-all duration-200 font-medium text-blue-800"
              >
                {course.name}
              </button>
            ))}
            <button
              onClick={handleBackToMain}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mt-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to main menu
            </button>
          </div>
        );

      case 'registration-domains':
        return (
          <div className="space-y-2">
            {courses.map((course) => (
              <button
                key={course.id}
                onClick={() => handleRegistrationSelection(course.id, course.name)}
                className="w-full text-left p-3 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg transition-all duration-200 font-medium text-green-800"
              >
                {course.name}
              </button>
            ))}
            <button
              onClick={handleBackToMain}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mt-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to main menu
            </button>
          </div>
        );

      case 'download':
        return (
          <div className="space-y-2">
            {courses.map((course) => (
              <button
                key={course.id}
                onClick={() => handleDownloadPDF(course.name)}
                className="w-full text-left p-3 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg transition-all duration-200 font-medium text-purple-800 flex items-center gap-3"
              >
                <Download className="w-5 h-5" />
                {course.name} (Download PDF)
              </button>
            ))}
            <button
              onClick={handleBackToMain}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mt-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to main menu
            </button>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <Phone className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <p className="text-sm text-gray-600 mb-1">WhatsApp</p>
                  <a href="https://wa.me/919731755053" className="font-medium text-green-600 hover:underline">
                    +91 97317 55053
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <Mail className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <p className="text-sm text-gray-600 mb-1">Website</p>
                  <a href="https://www.emberquest.in" className="font-medium text-blue-600 hover:underline">
                    www.emberquest.in
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
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
            <button
              onClick={handleBackToMain}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to main menu
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

        {/* Chat Messages */}
        <div className="max-w-2xl mx-auto px-6 py-8">
          <div className="space-y-4 mb-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    message.isUser
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-800 shadow-sm border'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Options */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            {renderOptions()}
          </div>
        </div>
      </div>
    </div>
  );
};