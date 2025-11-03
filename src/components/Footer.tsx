import { useTranslations } from 'next-intl'
import React from 'react'
import { Phone, Globe, MapPin, Facebook, Send, Instagram } from 'lucide-react'
import Image from 'next/image';

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className='bg-[#001533] text-white py-16 mt-20'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-12 mb-16'>
          {/* Services Section */}
          <div>
            <h4 className='text-xl font-semibold mb-6'>Services</h4>
            <ul className='space-y-6  text-gray-400'>
              <li>AI Integration To The Software</li>
              <li>Telegram Bot Development</li>
              <li>Website Development</li>
              <li>Web Application Development</li>
              <li>Mobile App Development</li>
              <li>CRM, APO Systems Custom Software</li>
              <li>Chat-bots, Bots for any platform</li>
            </ul>
          </div>

          {/* Expertise Section */}
          <div>
            <h4 className='text-xl font-semibold mb-6'>Expertise</h4>
            <ul className='space-y-6 text-gray-400'>
              <li>System integration and modernization</li>
              <li>ERP/CRM implementation</li>
              <li>IT support and maintenance</li>
              <li>Web design and development</li>
              <li>API design and integration</li>
            </ul>
          </div>

          {/* Contacts Section */}
          <div>
            <h4 className='text-xl font-semibold mb-6'>Contacts</h4>
            <div className='space-y-4 text-gray-400 mb-8'>
              <div className='flex items-center gap-3'>
                <Phone size={18} />
                <span>513-808-88-13</span>
              </div>
              <div className='flex items-center gap-3'>
                <MapPin size={18} />
                <span>USA / Uzbekistan</span>
              </div>
              <div className='flex items-center gap-3'>
                <Globe size={18} />
                <span>www.cognilabs.or</span>
              </div>
            </div>

            <h4 className='text-xl font-semibold mb-4'>Offices</h4>
            <div className='flex items-center gap-3 text-gray-300 mb-8'>
              <MapPin size={18} />
              <span>USA / Uzbekistan</span>
            </div>

            {/* Newsletter */}
            <div>
               <Image
                          src="/logomini.png"
                          alt="Cognilabs"
                          width={130}
                          height={40}
                          className="cursor-pointer mb-2"
                        />
              <p className='text-gray-300 mb-4'>Newsletter Sign Up</p>
              <div className='flex gap-2 mt-2'>
                <input 
                  type='email' 
                  placeholder='Email'
                  className='flex-1 bg-transparent border rounded-l-3xl  border-gray-500 rounded px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500'
                />
                <button className='bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-4 py-2  rounded-r-3xl font-medium transition-colors'>
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='border-t border-gray-700 pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <div className='flex items-center gap-2'>
                <Image
                          src="/logomini.png"
                          alt="Cognilabs"
                          width={130}
                          height={40}
                          className="cursor-pointer"
                        />
              <span className='text-gray-400'>© 2025 Cognilabs. All right reserved.</span>
            </div>
            
            <div className='flex items-center gap-6'>
              <a href='#' className='text-gray-300 hover:text-white transition-colors'>
                <Facebook size={20} />
              </a>
              <a href='#' className='text-gray-300 hover:text-white transition-colors'>
                <Send size={20} />
              </a>
              <a href='#' className='text-gray-300 hover:text-white transition-colors'>
                <Instagram size={20} />
              </a>
              <a href='#' className='text-gray-400 hover:text-white transition-colors ml-8'>
                Terms and conditions
              </a>
              <a href='#' className='text-gray-400 hover:text-white transition-colors'>
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}