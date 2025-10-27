import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-black text-white flex items-center justify-between px-6 py-2">
      <div className="flex items-center space-x-6">
        <span className="font-bold">Cognilabs</span>
        <a href="#" className="text-white hover:text-gray-300 mx-2">Home</a>
        <a href="#" className="text-white hover:text-gray-300 mx-2">Careers</a>
        <a href="#" className="text-white hover:text-gray-300 mx-2">Services</a>
        <a href="#" className="text-white hover:text-gray-300 mx-2">Portfolio</a>
        <a href="#" className="text-white hover:text-gray-300 mx-2">Contact us</a>
      </div>
      <div className="flex items-center space-x-4">
        <select className="bg-gray-800 text-white border-none px-2 py-1 rounded-sm">
          <option>Eng</option>
        </select>
        <span className="mr-4">513-384-8324</span>
        <a href="#" className="text-white hover:text-gray-300 mr-2"><i className="fab fa-facebook-f"></i></a>
        <a href="#" className="text-white hover:text-gray-300 mr-2"><i className="fab fa-twitter"></i></a>
        <a href="#" className="text-white hover:text-gray-300"><i className="fab fa-instagram"></i></a>
      </div>
    </nav>
  );
};

export default Navbar;