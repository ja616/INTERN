import React, { useState } from 'react';
import { User, ArrowRight } from 'lucide-react';

interface Domain {
  id: string;
  title: string;
}

interface FormData {
  name: string;
  age: string;
  gender: string;
  college: string;
  city: string;
  state: string;
  email: string;
  phone: string;
}

interface RegistrationFormProps {
  selectedDomain: Domain | null;
  onBack: () => void;
  onHome: () => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ 
  selectedDomain, 
  onBack, 
  onHome 
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: '',
    gender: '',
    college: '',
    city: '',
    state: '',
    email: '',
    phone: ''
  });
  
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const errors: Partial<FormData> = {};
    
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.age.trim()) errors.age = 'Age is required';
    else if (parseInt(formData.age) < 16 || parseInt(formData.age) > 35) errors.age = 'Age must be between 16-35';
    if (!formData.gender) errors.gender = 'Gender is required';
    if (!formData.college.trim()) errors.college = 'College name is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.state.trim()) errors.state = 'State is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email format is invalid';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) errors.phone = 'Phone number must be 10 digits';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
      setTimeout(() => {
        onHome();
        setFormData({
          name: '',
          age: '',
          gender: '',
          college: '',
          city: '',
          state: '',
          email: '',
          phone: ''
        });
        setIsSubmitted(false);
      }, 2500);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof FormData]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 
    'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 
    'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 
    'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Puducherry'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <button 
              onClick={onHome}
              className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              PolyIntern
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Registration Form</h1>
            {selectedDomain && (
              <p className="text-gray-600">Applying for: <span className="font-semibold text-blue-600">{selectedDomain.title}</span></p>
            )}
          </div>

          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-green-600 mb-2">Registration Successful!</h2>
              <p className="text-gray-600">Thank you for applying. We'll contact you soon with next steps.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      formErrors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age *
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      formErrors.age ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your age"
                  />
                  {formErrors.age && <p className="text-red-500 text-sm mt-1">{formErrors.age}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender *
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      formErrors.gender ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {formErrors.gender && <p className="text-red-500 text-sm mt-1">{formErrors.gender}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    College *
                  </label>
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      formErrors.college ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your college name"
                  />
                  {formErrors.college && <p className="text-red-500 text-sm mt-1">{formErrors.college}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      formErrors.city ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your city"
                  />
                  {formErrors.city && <p className="text-red-500 text-sm mt-1">{formErrors.city}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      formErrors.state ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select State</option>
                    {indianStates.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  {formErrors.state && <p className="text-red-500 text-sm mt-1">{formErrors.state}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    formErrors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email address"
                />
                {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    formErrors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your 10-digit phone number"
                />
                {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={onBack}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Register Now
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};