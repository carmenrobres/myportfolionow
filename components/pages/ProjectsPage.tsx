import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../../data';
import { Project, ProjectCategory } from '../../types';
import ProjectCard from '../ProjectCard';
import AnimateOnScroll from '../AnimateOnScroll';

const ProjectsPage: React.FC = () => {
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'All'>('All');
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const filteredProjects = activeCategory === 'All'
    ? projects
    // @ts-ignore
    : projects.filter(p => p.category === activeCategory);

  const categories: (ProjectCategory | 'All')[] = ['All', ...Object.values(ProjectCategory)];

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX + 20, y: e.clientY });
  };

  const ViewSwitcher = () => (
    <div className="text-sm text-brand-muted dark:text-gray-400">
      <button onClick={() => setView('list')} className={`hover:text-black dark:hover:text-brand-light transition-colors ${view === 'list' ? 'text-black dark:text-brand-light' : ''}`}>
        (List View)
      </button>
      <span className="mx-1">/</span>
      <button onClick={() => setView('grid')} className={`hover:text-black dark:hover:text-brand-light transition-colors ${view === 'grid' ? 'text-black dark:text-brand-light' : ''}`}>
        (Grid View)
      </button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:p-8 py-16 md:py-24" onMouseMove={view === 'list' ? handleMouseMove : undefined}>
      <AnimateOnScroll className="flex justify-between items-start mb-12">
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter text-left uppercase font-sans text-black dark:text-brand-light">All Projects</h1>
        <ViewSwitcher />
      </AnimateOnScroll>
      
      <AnimateOnScroll as="section">
        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`uppercase text-sm tracking-wider font-medium transition-colors duration-300 ${
                activeCategory === category
                  ? 'text-black dark:text-brand-light'
                  : 'text-brand-muted dark:text-gray-400 hover:text-black dark:hover:text-brand-light'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {view === 'list' ? (
          <div className="border-b border-gray-200 dark:border-gray-700">
            {filteredProjects.map((project, index) => (
              <AnimateOnScroll key={project.id} stagger={index * 50}>
                <Link
                  to={`/projects/${project.id}`}
                  className="block group"
                  onMouseEnter={() => setHoveredImage(project.image)}
                  onMouseLeave={() => setHoveredImage(null)}
                >
                  <div className="flex justify-between items-center py-6 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300 group-hover:bg-brand-olive-light dark:group-hover:bg-brand-dark-gray/50">
                    <h3 className="text-xl md:text-3xl font-medium text-black dark:text-brand-light transition-all duration-300 group-hover:pl-4 w-1/2 font-sans">{project.title}</h3>
                    <div className="flex items-center space-x-8 text-sm text-brand-muted dark:text-gray-400 uppercase tracking-wider w-1/2 justify-end pr-4">
                      <span className="hidden md:inline w-1/3 text-right">{project.category}</span>
                      <span className="w-24 text-right">{project.year}</span>
                      <span className="text-lg w-4 text-center">{project.externalLink ? '↗' : '+'}</span>
                    </div>
                  </div>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <AnimateOnScroll key={project.id} stagger={index * 100}>
                <ProjectCard project={project} />
              </AnimateOnScroll>
            ))}
          </div>
        )}
      </AnimateOnScroll>

      {hoveredImage && view === 'list' && (
        <div
          className="pointer-events-none fixed z-50 transition-opacity duration-300"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            transform: 'translateY(-50%)',
          }}
        >
          <img
            src={hoveredImage}
            alt="Project preview"
            className="w-72 h-auto object-cover rounded-lg shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;