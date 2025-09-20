import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 mt-10 shadow-inner">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        
        {/* Left Section */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h1 className="text-xl font-bold text-white">MyApp</h1>
          <p className="text-sm">© {new Date().getFullYear()} All Rights Reserved.</p>
        </div>

        {/* Middle Links */}
        <div className="flex space-x-6 text-sm">
          <a href="/about" className="hover:text-white transition">About</a>
          <a href="/contact" className="hover:text-white transition">Contact</a>
          <a href="/terms" className="hover:text-white transition">Terms</a>
        </div>

        {/* Right Section */}
        <div className="text-sm">
          Made with ❤️ by Prashant
        </div>
      </div>
    </footer>
  );
}

export default Footer;
