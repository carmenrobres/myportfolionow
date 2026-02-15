import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-light dark:bg-brand-black transition-colors duration-300">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:p-8">
        <div className="flex justify-between items-center text-xs uppercase tracking-wider">
          <div className="text-brand-muted dark:text-gray-400">
            &copy; {new Date().getFullYear()} Carmen Robres de Veciana
          </div>
          <div className="flex space-x-6">
            <a href="https://www.linkedin.com/in/carmen-robres-de-veciana-9b2b481b2" target="_blank" rel="noopener noreferrer" className="text-black dark:text-brand-light hover:text-brand-muted dark:hover:text-gray-400 transition-all duration-300 inline-block hover:-translate-y-0.5">LinkedIn</a>
            <a href="https://www.instagram.com/carminplateado" target="_blank" rel="noopener noreferrer" className="text-black dark:text-brand-light hover:text-brand-muted dark:hover:text-gray-400 transition-all duration-300 inline-block hover:-translate-y-0.5">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;