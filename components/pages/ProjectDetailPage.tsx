import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { projects } from '../../data';
import AnimateOnScroll from '../AnimateOnScroll';
import { Project } from '../../types';
import { useLightbox } from '../LightboxContext';

const SectionWithGallery: React.FC<{ title: string; children: React.ReactNode; images: string[]; imagePosition?: 'left' | 'right' }> = ({ title, children, images, imagePosition = 'right' }) => {
  const [activeImage, setActiveImage] = useState(images[0]);
  const { showLightbox } = useLightbox();
  const imageColOrder = imagePosition === 'right' ? 'md:order-2' : 'md:order-1';
  const contentColOrder = imagePosition === 'right' ? 'md:order-1' : 'md:order-2';

  return (
    <AnimateOnScroll className="grid md:grid-cols-12 gap-12 my-16 md:my-24 items-start">
      <div className={`md:col-span-7 ${imageColOrder}`}>
        <button onClick={() => showLightbox(activeImage)} className="w-full block cursor-zoom-in">
          <img src={activeImage} alt={`${title} active view`} className="w-full h-auto object-contain"/>
        </button>
      </div>
      <div className={`md:col-span-5 ${contentColOrder}`}>
        <h2 className="text-xl font-bold uppercase tracking-wider mb-4 text-black dark:text-brand-light font-sans">{title}</h2>
        <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4 mb-8">
          {children}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {images.map((img, index) => (
            <button key={index} onClick={() => setActiveImage(img)} className={`w-full transition-opacity duration-300 ${activeImage === img ? 'opacity-100 border-2 border-brand-yellow' : 'opacity-50 hover:opacity-100'}`}>
               <img src={img} alt={`${title} thumbnail ${index + 1}`} className="w-full h-auto object-contain" />
            </button>
          ))}
        </div>
      </div>
    </AnimateOnScroll>
  )
};

const SectionWithCenteredTextAndImage: React.FC<{ title: string; children: React.ReactNode; image: string; }> = ({ title, children, image }) => {
    const { showLightbox } = useLightbox();
    return (
        <AnimateOnScroll className="my-16 md:my-24">
            <div className="max-w-3xl mx-auto text-center mb-12">
                <h2 className="text-xl font-bold uppercase tracking-wider mb-4 text-black dark:text-brand-light font-sans">{title}</h2>
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">{children}</div>
            </div>
            <button onClick={() => showLightbox(image)} className="w-full block cursor-zoom-in">
                <img src={image} alt={`${title} full view`} className="w-full h-auto object-contain"/>
            </button>
        </AnimateOnScroll>
    );
};

// Custom component for the "Unseen Exposures" concept section layout
const UnseenExposuresConceptSection: React.FC<{ project: Project; images: string[] }> = ({ project, images }) => {
    const [activeImage, setActiveImage] = useState(images[0]);
    const { showLightbox } = useLightbox();

    const content = project.concept || '';
    const parts = content.split(/\n(?=AdProfiler|Read the Room|Aggressive Machine)/);
    const intro = parts[0];
    const columns = parts.slice(1).map(part => {
        const [title, ...rest] = part.split('\n');
        return { title, text: rest.join('\n') };
    });

    return (
        <AnimateOnScroll className="my-16 md:my-24">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-xl font-bold uppercase tracking-wider mb-8 text-black dark:text-brand-light font-sans text-center">Concept Development</h2>
                
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4 mb-12">
                    <p>{intro}</p>
                    <div className="grid md:grid-cols-3 gap-8 pt-8">
                        {columns.map(col => (
                            <div key={col.title}>
                                <strong className="font-semibold text-black dark:text-brand-light block mb-2">{col.title}</strong>
                                <p className="text-sm">{col.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
                
                {images.length > 0 && (
                    <div className="w-full">
                        <button onClick={() => showLightbox(activeImage)} className="w-full mb-4 block cursor-zoom-in">
                            <img src={activeImage} alt={`Concept active view`} className="w-full h-auto object-contain"/>
                        </button>
                        <div className="grid grid-cols-7 gap-2">
                            {images.map((img, index) => (
                                <button key={index} onClick={() => setActiveImage(img)} className={`w-full transition-opacity duration-300 ${activeImage === img ? 'opacity-100 border-2 border-brand-yellow' : 'opacity-50 hover:opacity-100'}`}>
                                    <img src={img} alt={`Concept thumbnail ${index + 1}`} className="w-full h-auto object-contain" />
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AnimateOnScroll>
    );
}

// Fix: Use React.ReactNode instead of JSX.Element to resolve namespace error.
const parseTextWithLinks = (text: string): React.ReactNode[] => {
    const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
    // Fix: Use React.ReactNode instead of JSX.Element to resolve namespace error.
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push(text.substring(lastIndex, match.index));
        }

        const [fullMatch, linkText, url] = match;
        parts.push(
            <a 
                href={url} 
                key={url + linkText} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-black dark:text-brand-light underline hover:text-brand-muted dark:hover:text-gray-400 transition-colors"
            >
                {linkText}
            </a>
        );

        lastIndex = match.index + fullMatch.length;
    }

    if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
    }

    return parts;
};

const renderContent = (content: string | string[] | undefined, isProcess: boolean) => {
    if (isProcess && Array.isArray(content)) {
        return (
            <ul className="space-y-6 border-l-2 border-brand-muted dark:border-gray-600 pl-8">
                {content.map((step, i) => {
                    const parts = step.split(': ');
                    return (
                        <li key={i} className="relative text-gray-800 dark:text-gray-200">
                            <span className="absolute -left-[38px] top-1.5 h-3 w-3 rounded-full bg-brand-muted dark:bg-gray-500 ring-4 ring-brand-light dark:ring-brand-black"></span>
                            {parts.length > 1 ? (
                                <p><strong className="font-semibold text-black dark:text-brand-light">{parts[0]}:</strong> {parseTextWithLinks(parts.slice(1).join(': '))}</p>
                            ) : (
                                <p>{parseTextWithLinks(step)}</p>
                            )}
                        </li>
                    )
                })}
            </ul>
        );
    }
    if (typeof content === 'string') {
        return content.split('\n').filter(line => line.trim() !== '').map((line, index) => {
            const subheadings = ['AdProfiler', 'Read the Room', 'Aggressive Machine'];
            if (subheadings.includes(line.trim())) {
                return <strong key={index} className="block font-semibold text-black dark:text-brand-light mt-4 mb-2">{line}</strong>;
            }
            return <p key={index}>{parseTextWithLinks(line)}</p>;
        });
    }
    if (Array.isArray(content)) {
      return (
        <div className="space-y-4">
          {content.map((item, index) => <p key={index}>{parseTextWithLinks(item)}</p>)}
        </div>
      );
    }
    return null;
}

const TextOnlySection: React.FC<{ title: string; children: string | string[] | undefined; isProcess?: boolean }> = ({ title, children, isProcess = false }) => (
    <AnimateOnScroll className="my-16 md:my-24">
        <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-bold uppercase tracking-wider mb-4 text-black dark:text-brand-light font-sans">{title}</h2>
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {renderContent(children, isProcess)}
            </div>
        </div>
    </AnimateOnScroll>
);

// Custom component for the outcome section layout for specific projects
const SectionWithTextAboveGallery: React.FC<{ title: string; text: string | string[] | undefined; images: string[] }> = ({ title, text, images }) => {
    const [activeImage, setActiveImage] = useState(images[0]);
    const { showLightbox } = useLightbox();

    return (
        <AnimateOnScroll className="my-16 md:my-24">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-xl font-bold uppercase tracking-wider mb-8 text-black dark:text-brand-light font-sans text-center">{title}</h2>
                
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4 mb-12">
                    {renderContent(text, false)}
                </div>
                
                {images.length > 0 && (
                    <div className="w-full">
                        <button onClick={() => showLightbox(activeImage)} className="w-full mb-4 block cursor-zoom-in">
                            <img src={activeImage} alt={`${title} active view`} className="w-full h-auto object-contain"/>
                        </button>
                        <div className="grid grid-cols-7 gap-2">
                            {images.map((img, index) => (
                                <button key={index} onClick={() => setActiveImage(img)} className={`w-full transition-opacity duration-300 ${activeImage === img ? 'opacity-100 border-2 border-brand-yellow' : 'opacity-50 hover:opacity-100'}`}>
                                    <img src={img} alt={`${title} thumbnail ${index + 1}`} className="w-full h-auto object-contain" />
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AnimateOnScroll>
    );
}

const SectionWithCenteredTextAndVideo: React.FC<{ title: string; children: React.ReactNode; videoSrc: string; }> = ({ title, children, videoSrc }) => {
    return (
        <AnimateOnScroll className="my-16 md:my-24">
            <div className="max-w-3xl mx-auto text-center mb-12">
                <h2 className="text-xl font-bold uppercase tracking-wider mb-4 text-black dark:text-brand-light font-sans">{title}</h2>
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">{children}</div>
            </div>
            <div className="w-full aspect-video max-w-4xl mx-auto">
                <iframe 
                    width="100%" 
                    height="100%" 
                    src={videoSrc} 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen>
                </iframe>
            </div>
        </AnimateOnScroll>
    );
};

const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { showLightbox } = useLightbox();
  const projectIndex = projects.findIndex(p => p.id === projectId);

  const project = useMemo(() => projectIndex !== -1 ? projects[projectIndex] : null, [projectIndex]);

  if (!project) {
    return <div className="text-center py-20">Project not found. <Link to="/projects" className="text-black dark:text-brand-light underline">Go back to projects</Link></div>;
  }
  
  const conceptImages = useMemo(() => project.images || [], [project.images]);
  const processImages = useMemo(() => project.processImages || [], [project.processImages]);
  const outcomeImages = useMemo(() => project.outcomeImages || [], [project.outcomeImages]);

  const orderedGalleryImages = useMemo(() => {
    const priorityImages = [
        ...(project.reflectionImage ? [project.reflectionImage] : []),
        ...outcomeImages
    ];
    const allImages = [
        project.image,
        ...(project.contextImage ? [project.contextImage] : []), 
        ...conceptImages, 
        ...processImages, 
        ...outcomeImages
    ];
    const combined = [...priorityImages, ...allImages];
    return [...new Set(combined)];
  }, [project.image, project.contextImage, project.reflectionImage, conceptImages, processImages, outcomeImages]);

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  const isPdf = project.externalLink?.endsWith('.pdf');
  const linkText = project.id === 'future-of-designing' 
    ? 'Download thesis' 
    : isPdf 
    ? 'Download PDF' 
    : 'Visit Website';
  
  return (
    <div>
      <header className="relative h-[60vh] flex items-center justify-center text-center text-brand-light overflow-hidden">
        <img src={project.image} alt={`${project.title} background`} className="absolute inset-0 w-full h-full object-cover blur-sm scale-110" />
        <div className="absolute inset-0 bg-black/50"></div>
        <button onClick={() => showLightbox(project.image)} className="absolute inset-0 w-full h-full cursor-zoom-in" aria-label="View image in lightbox"></button>
        <div className="relative z-10 p-4 max-w-4xl mx-auto">
          <AnimateOnScroll>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter my-2 uppercase font-sans">{project.title}</h1>
            <p className="text-lg md:text-xl mt-4 opacity-90">{project.subtitle}</p>
          </AnimateOnScroll>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <AnimateOnScroll>
          <button onClick={() => navigate('/projects')} className="mb-12 text-brand-muted dark:text-gray-400 hover:text-black dark:hover:text-brand-light transition-colors uppercase text-sm tracking-wider">&larr; All Projects</button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16 border-b border-gray-200 dark:border-gray-700 pb-16">
            <div className="space-y-8">
              <div>
                <h3 className="font-bold text-sm uppercase tracking-wider mb-3 text-brand-muted dark:text-gray-400">Details</h3>
                <div className="space-y-2 text-sm">
                  <div><strong className="text-brand-muted dark:text-gray-400 w-20 inline-block">Year:</strong> <span className="text-black dark:text-brand-light">{project.year}</span></div>
                  <div><strong className="text-brand-muted dark:text-gray-400 w-20 inline-block">Industry:</strong> <span className="text-black dark:text-brand-light">{project.industry.join(', ')}</span></div>
                  <div><strong className="text-brand-muted dark:text-gray-400 w-20 inline-block">Service:</strong> <span className="text-black dark:text-brand-light">{project.service.join(', ')}</span></div>
                </div>
              </div>
               {project.collaborators && (
                <div>
                  <h3 className="font-bold text-sm uppercase tracking-wider mb-3 text-brand-muted dark:text-gray-400">Collaborators</h3>
                  <p className="text-sm text-black dark:text-brand-light">{project.collaborators}</p>
                </div>
              )}
              <div>
                <h3 className="font-bold text-sm uppercase tracking-wider mb-3 text-brand-muted dark:text-gray-400">Learnings</h3>
                <p className="text-sm italic text-gray-700 dark:text-gray-300">{project.learnings}</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold uppercase tracking-wider mb-4 text-black dark:text-brand-light font-sans">Overview</h3>
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4"><p>{project.overview}</p></div>
              </div>
              {project.externalLink && (
                <div>
                    <h3 className="font-bold text-sm uppercase tracking-wider mb-3 text-brand-muted dark:text-gray-400">Project Link</h3>
                    <a 
                        href={project.externalLink}
                        target={isPdf ? '_self' : '_blank'}
                        rel="noopener noreferrer"
                        download={isPdf}
                        className="text-sm text-black dark:text-brand-light underline hover:text-brand-muted dark:hover:text-gray-400 transition-colors"
                    >
                        {linkText} &rarr;
                    </a>
                </div>
              )}
            </div>
          </div>
        </AnimateOnScroll>
      
        {project.needs && (
            project.contextImage
            ? <SectionWithCenteredTextAndImage title="Context / Needs" image={project.contextImage}>
                {renderContent(project.needs, false)}
              </SectionWithCenteredTextAndImage>
            : <TextOnlySection title="Context / Needs">{project.needs}</TextOnlySection>
        )}
        
        {project.concept && conceptImages.length > 0 && (
            project.id === 'unseen-exposures'
            ? <UnseenExposuresConceptSection project={project} images={conceptImages} />
            : project.id === 'incapto-coffee'
            ? <SectionWithTextAboveGallery title="Concept Development" text={project.concept} images={conceptImages} />
            : (
              conceptImages.length > 0
              ? <SectionWithGallery title="Concept Development" images={conceptImages} imagePosition="right">
                   {renderContent(project.concept, false)}
                </SectionWithGallery>
              : <TextOnlySection title="Concept Development">{project.concept}</TextOnlySection>
            )
        )}

        {project.process && (
            processImages.length > 0
            ? <SectionWithGallery title="Process" images={processImages} imagePosition="left">
                 {renderContent(project.process, true)}
              </SectionWithGallery>
            : <TextOnlySection title="Process" isProcess>{project.process}</TextOnlySection>
        )}

        {project.outcome && (
            ['unseen-exposures', 'incapto-coffee'].includes(project.id)
            ? <SectionWithTextAboveGallery title="Outcome / Final Exhibit" text={project.outcome} images={outcomeImages} />
            : (
                outcomeImages.length > 0
                ? <SectionWithGallery title="Outcome / Final Exhibit" images={outcomeImages} imagePosition="right">
                     {renderContent(project.outcome, false)}
                  </SectionWithGallery>
                : <TextOnlySection title="Outcome / Final Exhibit">{project.outcome}</TextOnlySection>
            )
        )}

        {project.reflection && (
            project.reflectionVideo
            ? <SectionWithCenteredTextAndVideo title="Reflection" videoSrc={project.reflectionVideo}>
                {renderContent(project.reflection, false)}
              </SectionWithCenteredTextAndVideo>
            : project.reflectionImage
            ? <SectionWithCenteredTextAndImage title="Reflection" image={project.reflectionImage}>
                {renderContent(project.reflection, false)}
              </SectionWithCenteredTextAndImage>
            : <TextOnlySection title="Reflection">{project.reflection}</TextOnlySection>
        )}
        
        {orderedGalleryImages.length > 1 && (
          <AnimateOnScroll className="my-16">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-12 text-black dark:text-brand-light font-sans">Project Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {orderedGalleryImages.map((img, index) => (
                <button 
                  key={index} 
                  className="w-full group focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2"
                  onClick={() => showLightbox(img)}
                >
                  <img src={img} alt={`${project.title} gallery view ${index + 1}`} className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105" />
                </button>
              ))}
            </div>
          </AnimateOnScroll>
        )}

        <div className="mt-24 flex justify-between border-t border-gray-200 dark:border-gray-700 pt-8 text-sm uppercase tracking-wider">
          <div>
            {prevProject && <Link to={`/projects/${prevProject.id}`} className="text-brand-muted dark:text-gray-400 hover:text-black dark:hover:text-brand-light transition-colors">&larr; Previous</Link>}
          </div>
          <div>
            {nextProject && <Link to={`/projects/${nextProject.id}`} className="text-brand-muted dark:text-gray-400 hover:text-black dark:hover:text-brand-light transition-colors">Next &rarr;</Link>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;