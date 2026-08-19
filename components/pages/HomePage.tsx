import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../../data';
import ProjectCard from '../ProjectCard';
import AnimateOnScroll from '../AnimateOnScroll';
import Floating, { FloatingElement } from '../ui/parallax-floating';

const HIGHLIGHTED_PROJECT_IDS = ['compostable-altar', 'tania-pilot', 'miralls-del-dema'];

const HERO_FLOATERS: { image: { src: string; alt: string }; className: string; depth: number; size: string }[] = projects.map((p, i) => {
  // Kept to the right half of the hero so nothing crosses the headline on the left.
  const positions = [
    'top-[6%] left-[58%]',
    'top-[4%] left-[80%]',
    'top-[26%] left-[93%]',
    'top-[42%] left-[62%]',
    'top-[58%] left-[82%]',
    'top-[74%] left-[60%]',
    'top-[86%] left-[84%]',
  ];
  const depths = [0.5, 1.5, 2.5, 1.2, 1, 2, 0.8];
  const sizes = [
    'w-16 h-16 md:w-24 md:h-24',
    'w-20 h-20 md:w-28 md:h-28',
    'w-24 h-32 md:w-32 md:h-40',
    'w-24 h-24 md:w-32 md:h-32',
    'w-24 h-24 md:w-32 md:h-32',
    'w-24 h-32 md:w-32 md:h-44',
    'w-20 h-20 md:w-28 md:h-28',
  ];
  const idx = i % positions.length;
  return {
    image: { src: p.image, alt: p.title },
    className: positions[idx],
    depth: depths[idx],
    size: sizes[idx],
  };
});

const HomePage: React.FC = () => {
  const featuredProjects = HIGHLIGHTED_PROJECT_IDS
    .map(id => projects.find(p => p.id === id))
    .filter((p): p is typeof projects[number] => Boolean(p));
  const otherProjects = projects.filter(p => !HIGHLIGHTED_PROJECT_IDS.includes(p.id));

  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX + 20, y: e.clientY });
  };

  return (
    <div className="space-y-24 md:space-y-40 pb-24 md:pb-40">
      {/* Hero Section - parallax floating project images */}
      <section className="relative min-h-[70vh] md:min-h-[85vh] w-full overflow-hidden">
        <Floating sensitivity={-1}>
          {HERO_FLOATERS.map((f, i) => (
            <FloatingElement key={i} depth={f.depth} className={f.className}>
              <img
                src={f.image.src}
                alt={f.image.alt}
                loading="eager"
                decoding="async"
                className={`${f.size} object-cover hover:scale-105 duration-200 cursor-pointer transition-transform`}
              />
            </FloatingElement>
          ))}
        </Floating>

        <div className="relative z-10 flex h-full min-h-[70vh] md:min-h-[85vh] flex-col justify-between py-16 md:py-20 pointer-events-none">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pointer-events-auto">
            <AnimateOnScroll>
              <h1 className="max-w-xl md:max-w-2xl lg:max-w-3xl text-5xl md:text-6xl lg:text-7xl font-bold text-black dark:text-brand-light leading-tight font-sans">
                  Hi :) I'm an Engineer,<br />
                  Industrial Designer,<br />
                  Maker, Innovator <span className="font-sans italic text-4xl md:text-5xl lg:text-6xl font-normal ml-2">(kind of)</span>
              </h1>
            </AnimateOnScroll>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pointer-events-auto">
            <Link to="/projects" className="text-black dark:text-brand-light hover:text-brand-muted dark:hover:text-gray-400 uppercase tracking-wider text-sm font-medium">See My Work &rarr;</Link>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
            <div className="border-t border-gray-200 dark:border-gray-700" onMouseMove={handleMouseMove}>
              {otherProjects.map((project, index) => (
                <AnimateOnScroll key={project.id} stagger={index * 50}>
                  <Link
                    to={`/projects/${project.id}`}
                    className="block group"
                    onMouseEnter={() => setHoveredImage(project.image)}
                    onMouseLeave={() => setHoveredImage(null)}
                  >
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

      {hoveredImage && (
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

export default HomePage;
