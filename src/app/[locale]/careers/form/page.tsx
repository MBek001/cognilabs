"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Upload, User, Briefcase, Phone, MessageSquare, Send, CheckCircle } from 'lucide-react';
import Footer from '~/components/Footer';
import { sendCareerFormToAdmin } from '~/Contact/sendCareerForm';

interface FormData {
  fullName: string;
  position: string;
  phone: string;
  message: string;
}

interface Errors {
  fullName?: string;
  position?: string;
  phone?: string;
  file?: string;
}

export default function CareerForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    position: '',
    phone: '',
    message: ''
  });
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof Errors]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, file: 'File size should be less than 10MB' }));
        return;
      }
      setFile(selectedFile);
      setErrors(prev => ({ ...prev, file: '' }));
    }
  };

  const validateForm = (): Errors => {
    const newErrors: Errors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.position.trim()) newErrors.position = 'Position is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!file) newErrors.file = 'CV file is required';
    return newErrors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    await sendCareerFormToAdmin({ ...formData, file });

    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ fullName: '', position: '', phone: '', message: '' });
      setFile(null);
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col min-h-screen bg-linear-to-br pt-60 from-blue-900 via-blue-800 to-blue-900">
        <div className="grow flex items-center justify-center p-4">
          <div className="text-center px-4">
            <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-4 animate-bounce" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">Application Submitted!</h2>
            <p className="text-gray-300 text-sm sm:text-base">We'll review your application and get back to you soon.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="from-blue-900 via-blue-800 pt-30 to-black min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 flex justify-center">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
              Join Our <span className='text-blue-800'>Team</span>
            </h1>
            <p className="text-gray-300 text-sm sm:text-base">Fill out the form below to apply for your dream position</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6 sm:p-8 space-y-6">
            {/* Full Name */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-200 mb-2">Full Name *</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-800 transition"
                  placeholder="Enter your full name"
                />
              </div>
              {errors.fullName && <p className="mt-1 text-sm text-red-400">{errors.fullName}</p>}
            </div>

            {/* Position */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-200 mb-2">Position *</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-800 transition"
                  placeholder="e.g. Frontend Developer"
                />
              </div>
              {errors.position && <p className="mt-1 text-sm text-red-400">{errors.position}</p>}
            </div>

            {/* Phone */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-200 mb-2">Phone Number *</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-800 transition"
                  placeholder="+998 90 123 45 67"
                />
              </div>
              {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
            </div>

            {/* File Upload */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-200 mb-2">Upload CV *</label>
              <div className="relative">
                <input
                  type="file"
                  id="cv-upload"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.pptx"
                  className="hidden"
                />
                <label
                  htmlFor="cv-upload"
                  className="flex flex-col sm:flex-row items-center justify-center w-full px-4 py-6 bg-white/5 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:bg-white/10 hover:border-blue-800 transition"
                >
                  <Upload className="w-8 h-8 text-gray-400 mb-2 sm:mb-0 sm:mr-4" />
                  <div className="text-center sm:text-left">
                    <p className="text-gray-300 text-sm">{file ? file.name : 'Click to upload your CV'}</p>
                    <p className="text-gray-500 text-xs mt-1">PDF, DOC, DOCX, PPTX (Max 10MB)</p>
                  </div>
                </label>
              </div>
              {errors.file && <p className="mt-1 text-sm text-red-400">{errors.file}</p>}
            </div>

            {/* Message */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-200 mb-2">Message (Optional)</label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-800 transition resize-none"
                  placeholder="Tell us why you'd be a great fit..."
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-linear-to-r from-blue-600 to-blue-900 hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-3 px-6 rounded-lg transform transition duration-200 shadow-lg flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Submit Application
            </button>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
