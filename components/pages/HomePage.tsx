import React from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../../data';
import ProjectCard from '../ProjectCard';
import AnimateOnScroll from '../AnimateOnScroll';

const HIGHLIGHTED_PROJECT_IDS = ['compostable-altar', 'tania-pilot', 'miralls-del-dema'];

const HomePage: React.FC = () => {
  const featuredProjects = HIGHLIGHTED_PROJECT_IDS
    .map(id => projects.find(p => p.id === id))
    .filter((p): p is typeof projects[number] => Boolean(p));
  const otherProjects = projects.filter(p => !HIGHLIGHTED_PROJECT_IDS.includes(p.id));

  return (
    <div className="space-y-24 md:space-y-40 pb-24 md:pb-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24">
         {/* Hero Section */}
        <section className="min-h-[50vh] flex flex-col justify-center text-left">
          <AnimateOnScroll>
            <div className="max-w-4xl">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black dark:text-brand-light leading-tight font-sans">
                  Hi, I'm an Industrial Designer / Engineer /<br />
                  Maker /<br />
                  Innovator <span className="font-sans italic text-4xl md:text-5xl lg:text-6xl font-normal ml-2">(kind of)</span>
              </h1>
            </div>
          </AnimateOnScroll>
        </section>

        {/* Highlights Section */}
        <AnimateOnScroll as="section" className="pt-24">
          <div className="flex justify-between items-end mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-brand-light font-sans">Featured Work</h2>
              <Link to="/projects" className="text-black dark:text-brand-light hover:text-brand-muted dark:hover:text-gray-400 uppercase tracking-wider text-sm font-medium">See All &rarr;</Link>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <AnimateOnScroll key={project.id} stagger={index * 100}>
                <ProjectCard project={project} />
              </AnimateOnScroll>
            ))}
          </div>
        </AnimateOnScroll>

        {/* More Projects */}
        {otherProjects.length > 0 && (
          <AnimateOnScroll as="section" className="pt-16">
            <h3 className="text-xs uppercase tracking-[0.3em] text-brand-muted dark:text-gray-500 font-sans mb-6">More Projects</h3>
            <div className="border-t border-gray-200 dark:border-gray-700">
              {otherProjects.map((project, index) => (
                <AnimateOnScroll key={project.id} stagger={index * 50}>
                  <Link to={`/projects/${project.id}`} className="block group">
                    <div className="flex justify-between items-center py-5 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300 group-hover:bg-brand-olive-light dark:group-hover:bg-brand-dark-gray/50">
                      <div className="w-1/2 transition-all duration-300 group-hover:pl-4">
                        <h4 className="text-lg md:text-xl font-medium text-black dark:text-brand-light font-sans">{project.title}</h4>
                        <p className="mt-1 text-sm text-brand-muted dark:text-gray-400 font-sans">{project.subtitle}</p>
                      </div>
                      <div className="flex items-center space-x-8 text-sm text-brand-muted dark:text-gray-400 uppercase tracking-wider w-1/2 justify-end pr-4">
                        <span className="hidden md:inline w-1/3 text-right">{project.category}</span>
                        <span className="w-16 text-right">{project.year}</span>
                      </div>
                    </div>
                  </Link>
                </AnimateOnScroll>
              ))}
            </div>
          </AnimateOnScroll>
        )}

        {/* About Snapshot */}
        <AnimateOnScroll as="section" className="py-24 grid md:grid-cols-2 gap-12 items-center">
          <div className="max-w-md">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-brand-light font-sans">About Me</h2>
              <p className="mt-6 text-base text-gray-700 dark:text-gray-300">
              With a background in Industrial Design and a Master in Design for Emergent Futures, I specialize in bridging the gap between tangible making and artificial intelligence. My work focuses on creating meaningful, ethical, and community-driven applications of technology.
              </p>
              <div className="mt-8">
                  <Link to="/about" className="text-black dark:text-brand-light hover:text-brand-muted dark:hover:text-gray-400 uppercase tracking-wider text-sm font-medium">More about me &rarr;</Link>
              </div>
          </div>
          <div className="w-full bg-gray-100 dark:bg-brand-dark-gray overflow-hidden">
              <img src="https://i.imgur.com/dWIcnTi.jpeg" alt="Carmen Robres de Veciana" className="w-full h-full object-cover"/>
          </div>
        </AnimateOnScroll>
      </div>
    </div>
  );
};

export default HomePage;