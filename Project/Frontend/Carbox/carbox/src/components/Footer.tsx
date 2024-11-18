import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-16 bg-gray-100 border-t border-gray-300 py-4">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-4 text-sm text-gray-500">
          <a href="#" className="hover:text-gray-700 underline">Help Center</a>
          <a href="#" className="hover:text-gray-700 underline">Terms of Service</a>
          <a href="#" className="hover:text-gray-700 underline">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;