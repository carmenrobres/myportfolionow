import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useTheme } from './ThemeContext';

const AnimatedLinkText: React.FC<{ text: string }> = ({ text }) => (
    <div className="relative h-[1.2em] overflow-hidden">
        <span className="block transition-transform duration-300 ease-in-out transform group-hover:-translate-y-full">{text}</span>
        <span className="block absolute inset-0 transform translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0">{text}</span>
    </div>
);

const MenuOverlay: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const location = useLocation();

  const getLinkClass = (path: string) => {
    const isProjectsActive = path === '/projects' && location.pathname.startsWith('/projects');
    const isActive = location.pathname === path || isProjectsActive;
    return isActive ? 'text-black dark:text-brand-light' : 'text-gray-400 dark:text-gray-500';
  };

  const isPathActive = (path: string) => {
    if (path === '/projects') return location.pathname.startsWith('/projects');
    return location.pathname === path;
  }

  return (
    <div className="fixed inset-0 bg-brand-light dark:bg-brand-black z-40 flex flex-col items-center justify-center p-8">
       <div className="absolute top-0 left-0 w-full p-4 sm:p-6 lg:p-8 container mx-auto flex items-center justify-between h-20">
         <Link to="/" className="text-lg font-sans font-bold tracking-wide text-black dark:text-brand-light uppercase" onClick={onClose}>
            Carmen Robres de Veciana
          </Link>
          <button onClick={onClose} className="text-4xl font-thin text-black dark:text-brand-light">&times;</button>
        </div>
      <nav className="flex flex-col items-start space-y-6">
        {[
          { path: '/', label: 'HOME', number: '01' },
          { path: '/projects', label: 'PROJECTS', number: '02' },
          { path: '/about', label: 'ABOUT', number: '03' },
        ].map(item => (
          <NavLink key={item.path} to={item.path} className="font-sans group" onClick={onClose}>
            <div className={`flex items-center transition-colors duration-300 ${getLinkClass(item.path)}`}>
                <div className="text-xl mr-4"><AnimatedLinkText text={item.number} /></div>
                <div className="text-5xl md:text-7xl font-medium"><AnimatedLinkText text={item.label} /></div>
                {isPathActive(item.path) && <span className="text-black dark:text-brand-light ml-2 text-3xl">&rarr;</span>}
            </div>
          </NavLink>
        ))}
      </nav>
      <div className="absolute bottom-8 right-8 text-right text-sm">
        <p className="font-semibold text-black dark:text-brand-light">GET IN TOUCH</p>
        <a href="mailto:carmen.robres.dev@gmail.com" className="hover:underline text-black dark:text-brand-light">carmen.robres.dev@gmail.com</a>
      </div>
    </div>
  );
};


const ThemeToggleButton = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="group flex justify-center items-center h-8 w-8 z-50 text-black dark:text-brand-light"
            aria-label="Toggle theme"
        >
            {theme === 'light' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            )}
        </button>
    )
}

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <header className="sticky top-0 z-30 bg-brand-light dark:bg-brand-black transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:p-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <Link to="/" className="text-lg font-sans font-bold tracking-wide text-black dark:text-brand-light uppercase hover:opacity-70 transition-opacity">
                Carmen Robres de Veciana
              </Link>
            </div>
            <div className="flex items-center space-x-4 md:space-x-8">
                 <a href="mailto:carmen.robres.dev@gmail.com" className="hidden md:inline text-sm font-medium tracking-wider uppercase transition-transform duration-300 hover:-translate-y-0.5 text-black dark:text-brand-light">Get in touch</a>
                 <ThemeToggleButton />
                 <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="group flex flex-col justify-center items-center h-8 w-8 space-y-1.5 z-50"
                    aria-label="Open menu"
                >
                    <span className="block h-0.5 w-6 bg-black dark:bg-brand-light transition-transform duration-300 group-hover:-translate-y-0.5"></span>
                    <span className="block h-0.5 w-6 bg-black dark:bg-brand-light transition-transform duration-300 group-hover:translate-y-0.5"></span>
                </button>
            </div>
          </div>
        </div>
      </header>
      {isOpen && <MenuOverlay onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default Header;