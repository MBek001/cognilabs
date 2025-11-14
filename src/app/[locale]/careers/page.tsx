"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import {
  ArrowUpRight,
  Upload,
  User,
  Briefcase,
  Phone,
  MessageSquare,
  Send,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import Footer from "~/components/Footer";
import { sendCareerFormToAdmin } from "~/Contact/sendCareerForm";
import Link from "next/link";
import { useTranslations } from "next-intl";

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

export default function CareersPage() {
  const positions = [
    "Frontend Developer",
    "Backend Developer",
    "Sales Manager",
    "UI/UX Designer",
  ];


  const t = useTranslations("Careers")
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    position: "",
    phone: "",
    message: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof Errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          file: "File size should be less than 10MB",
        }));
        return;
      }
      setFile(selectedFile);
      setErrors((prev) => ({ ...prev, file: "" }));
    }
  };

  const validateForm = (): Errors => {
    const newErrors: Errors = {};
    if (!formData.fullName.trim())
      newErrors.fullName = "Full name is required";
    if (!formData.position.trim()) newErrors.position = "Position is required";
    if (!formData.phone.trim())
      newErrors.phone = "Phone number is required";
    if (!file) newErrors.file = "CV file is required";
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
      setFormData({
        fullName: "",
        position: selectedPosition || "",
        phone: "",
        message: "",
      });
      setFile(null);
    }, 3000);
  };

  const handlePositionClick = (title: string) => {
    // eski error va successni tozalaymiz
    setErrors({});
    setIsSubmitted(false);
    setFile(null);

    setSelectedPosition((prev) => (prev === title ? null : title));
    setFormData((prev) => ({
      ...prev,
      position: title,
    }));
  };

  return (
    <div className="bg-black text-white pt-30">
      {/* Top Section */}
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center pt-40 pb-20 px-6 gap-50 ">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-lg"
        >
          <h4 className="text-5xl font-bold leading-snug mb-5">
            {t("open")}{" "}
            <span className="text-blue-600">Cognilabs</span>
          </h4>
          <p className="text-gray-300 mb-20 text-lg">
            {t("applytext")}
          </p>
          <div className="mt-10">
            {/* Hohlasang shu Linkni ham qoldirsa bo'ladi */}
            <button
              onClick={() =>
                document
                  .getElementById("open-positions")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-6 py-3 cursor-pointer border mt-10 border-blue-600 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              {t("viewposition")}
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/careers1.png"
            alt="Careers at Cognilabs"
            width={400}
            height={400}
            className="rounded-2xl shadow-lg"
          />
        </motion.div>
      </div>

      <motion.div
        className="mt-4"
        animate={{
          y: [0, -10, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Image
          src="/nextbottom.png"
          width={80}
          height={70}
          alt="bottom next"
          className="mx-auto"
        />
      </motion.div>

      {/* Open Positions Section */}
      <div className="bg-white text-black py-20" id="open-positions">
        <div className="container mx-auto px-6">
          <h2 className="text-center text-4xl sm:text-5xl font-bold mb-14">
            <span className="text-blue-600">{t("open")}</span> {t("positions")}
          </h2>

          <div className="flex flex-col gap-5 max-w-3xl mx-auto">
            {positions.map((title) => {
              const isOpen = selectedPosition === title;

              return (
                <div
                  key={title}
                  className="border border-gray-200 rounded-2xl bg-white overflow-hidden"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="flex justify-between group items-center px-8 py-6 hover:bg-blue-800 hover:text-white shadow-sm hover:shadow-md cursor-pointer transition-all"
                    onClick={() => handlePositionClick(title)}
                  >
                    <span className="text-lg sm:text-xl font-semibold">
                      {title}
                    </span>
                    <ArrowUpRight
                      size={26}
                      className="text-gray-700 group-hover:text-white transition-colors "
                    />
                  </motion.div>

                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="px-4 pb-6 pt-4 bg-linear-to-b from-blue-900 via-blue-800 to-black overflow-hidden"
                    >
                      {/* title ustiga mos headline */}
                      <h3 className="text-xl font-semibold text-white mb-3">
                       {t("applyfor")} <span className="text-blue-400">{title}</span>
                      </h3>

                      {isSubmitted ? (
                        <div className="bg-white/10 border border-white/20 rounded-2xl p-6 text-center">
                          <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                          <h2 className="text-xl font-bold text-white mb-1">
                            Application Submitted!
                          </h2>
                          <p className="text-gray-300 text-sm">
                            We&apos;ll review your application and get back to you soon.
                          </p>
                        </div>
                      ) : (
                        <form
                          onSubmit={handleSubmit}
                          className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6 sm:p-8 space-y-6"
                        >
                          {/* Full Name */}
                          <div className="group">
                            <label className="block text-sm font-medium text-gray-200 mb-2">
                              {t("fullname")} *
                            </label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                              <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-800 transition"
                                placeholder={t("enterfullname")}
                              />
                            </div>
                            {errors.fullName && (
                              <p className="mt-1 text-sm text-red-400">
                                {errors.fullName}
                              </p>
                            )}
                          </div>

                          {/* Position */}
                          <div className="group">
                            <label className="block text-sm font-medium text-gray-200 mb-2">
                              {t("position")} *
                            </label>
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
                            {errors.position && (
                              <p className="mt-1 text-sm text-red-400">
                                {errors.position}
                              </p>
                            )}
                          </div>

                          {/* Phone */}
                          <div className="group">
                            <label className="block text-sm font-medium text-gray-200 mb-2">
                              {t("phonenumber")} *
                            </label>
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
                            {errors.phone && (
                              <p className="mt-1 text-sm text-red-400">
                                {errors.phone}
                              </p>
                            )}
                          </div>

                          {/* File Upload */}
                          <div className="group">
                            <label className="block text-sm font-medium text-gray-200 mb-2">
                              {t("uploadcv")} *
                            </label>
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
                                  <p className="text-gray-300 text-sm">
                                    <span className="text-gray-500">
  {file ? file.name : t("uploadcv")}
</span>
<p className="text-gray-500 text-xs mt-1">
  {t("pdftext")}
</p>

                                  </p>
                                </div>
                              </label>
                            </div>
                            {errors.file && (
                              <p className="mt-1 text-sm text-red-400">
                                {errors.file}
                              </p>
                            )}
                          </div>

                          {/* Message */}
                          <div className="group">
                            <label className="block text-sm font-medium text-gray-200 mb-2">
                              {t("message")}
                            </label>
                            <div className="relative">
                              <MessageSquare className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                              <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={4}
                                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-800 transition resize-none"
                                placeholder={t("tellus")}
                              />
                            </div>
                          </div>

                          {/* Submit */}
                          <button
                            type="submit"
                            className="w-full bg-linear-to-r from-blue-600 to-blue-900 hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-3 px-6 rounded-lg transform transition duration-200 shadow-lg flex items-center justify-center gap-2"
                          >
                            <Send className="w-5 h-5" />
                            {t("submit")}
                          </button>
                        </form>
                      )}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}