import React, { useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { projects } from '../../data';
import AnimateOnScroll from '../AnimateOnScroll';
import { Project } from '../../types';
import { useLightbox } from '../LightboxContext';

// ─── Shared utilities ──────────────────────────────────────────────────────────

const parseTextWithLinks = (text: string): React.ReactNode[] => {
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.substring(lastIndex, match.index));
    const [fullMatch, linkText, url] = match;
    parts.push(
      <a key={url} href={url} target="_blank" rel="noopener noreferrer"
        className="underline underline-offset-2 hover:opacity-60 transition-opacity">
        {linkText}
      </a>
    );
    lastIndex = match.index + fullMatch.length;
  }
  if (lastIndex < text.length) parts.push(text.substring(lastIndex));
  return parts;
};

const renderContent = (content: string | string[] | undefined, isProcess = false) => {
  if (!content) return null;
  if (isProcess && Array.isArray(content)) {
    return (
      <ol className="space-y-5">
        {content.map((step, i) => {
          const colonIdx = step.indexOf(': ');
          const hasLabel = colonIdx > 0 && colonIdx < 60;
          return (
            <li key={i} className="flex gap-4">
              <span className="shrink-0 text-xs text-brand-muted dark:text-gray-500 mt-1 w-5 font-sans">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                {hasLabel ? (
                  <><strong className="font-semibold text-black dark:text-brand-light">{step.substring(0, colonIdx)}: </strong>{parseTextWithLinks(step.substring(colonIdx + 2))}</>
                ) : parseTextWithLinks(step)}
              </p>
            </li>
          );
        })}
      </ol>
    );
  }
  if (typeof content === 'string') {
    return (
      <div className="space-y-4">
        {content.split('\n').filter(l => l.trim()).map((line, i) => {
          const subheadings = ['AdProfiler', 'Read the Room', 'Aggressive Machine'];
          if (subheadings.includes(line.trim()))
            return <p key={i} className="font-semibold text-black dark:text-brand-light mt-6 font-sans">{line}</p>;
          return <p key={i} className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">{parseTextWithLinks(line)}</p>;
        })}
      </div>
    );
  }
  if (Array.isArray(content)) {
    return (
      <div className="space-y-3">
        {content.map((item, i) => (
          <p key={i} className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">{parseTextWithLinks(item)}</p>
        ))}
      </div>
    );
  }
  return null;
};

// Clickable image
const Img: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className = '' }) => {
  const { showLightbox } = useLightbox();
  return (
    <button onClick={() => showLightbox(src)} className={`block cursor-zoom-in overflow-hidden group ${className}`}>
      <img src={src} alt={alt} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
    </button>
  );
};

// Section heading — original style preserved
const SectionHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-xl font-bold uppercase tracking-wider mb-4 text-black dark:text-brand-light font-sans">{children}</h2>
);

// Meta row used in all headers
const MetaRow: React.FC<{ project: Project; linkText: string; isPdf: boolean }> = ({ project, linkText, isPdf }) => (
  <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs uppercase tracking-wider text-brand-muted dark:text-gray-400 font-sans">
    <span><strong className="text-black dark:text-brand-light">Year</strong> {project.year}</span>
    <span><strong className="text-black dark:text-brand-light">Type</strong> {project.category}</span>
    {project.industry.map(t => <span key={t}>{t}</span>)}
    {project.externalLink && (
      <a href={project.externalLink} target={isPdf ? '_self' : '_blank'} rel="noopener noreferrer"
        download={isPdf}
        className="text-black dark:text-brand-light underline hover:text-brand-muted dark:hover:text-gray-400 transition-colors">
        {linkText} →
      </a>
    )}
  </div>
);

// Shared nav footer
const ProjectNav: React.FC<{ prev: Project | null; next: Project | null }> = ({ prev, next }) => (
  <div className="mt-24 flex justify-between border-t border-gray-200 dark:border-gray-700 pt-8 text-sm uppercase tracking-wider font-sans">
    <div>{prev && <Link to={`/projects/${prev.id}`} className="text-brand-muted dark:text-gray-400 hover:text-black dark:hover:text-brand-light transition-colors">← Previous</Link>}</div>
    <div>{next && <Link to={`/projects/${next.id}`} className="text-brand-muted dark:text-gray-400 hover:text-black dark:hover:text-brand-light transition-colors">Next →</Link>}</div>
  </div>
);

// ─── PROJECT 1: Future of Designing and Making (MDEF Thesis Year 2) ──────────
const FutureOfDesigning: React.FC<{ project: Project; prev: Project | null; next: Project | null }> = ({ project, prev, next }) => {
  const [activePhase, setActivePhase] = useState(0);
  const [mapCard, setMapCard] = useState(0);
  const [expCard, setExpCard] = useState(0);
  const images = project.images || [];

  const phases = [
    { id: 'overview',    label: 'Overview' },
    { id: 'mapping',     label: '01 Mapping' },
    { id: 'making',      label: '02 Making' },
    { id: 'teaching',    label: '03 Teaching' },
    { id: 'conclusion',  label: 'Conclusion' },
  ];

  const maps = [
    {
      num: '01', title: 'AI Tools vs. Maker Level',
      img: images[0],
      text: 'This graph plots AI tools across two axes: maker experience level (low → high) and output type (digital vs. physical fabrication). The key finding: most AI tools are built for expert users — but makerspaces host all skill levels, mostly beginners. This mismatch became the core problem to solve.',
    },
    {
      num: '02', title: 'Three Ways of Designing with AI',
      img: images[1],
      text: 'Maps the full design process from discovery to testing, showing three approaches: Traditional (no AI), Acceleration (same output, less time), and Amplification (more exploration, same time). Amplification is the most valuable use for creative communities — AI as a tool for depth, not just speed.',
    },
    {
      num: '03', title: 'From Sketch to AI Image',
      img: images[3],
      text: 'A single hand-drawn sketch fed into an image generator immediately produces render-quality output — with no digital design skills needed. This demonstrated the lowest possible entry point for makers to start using AI in their process.',
    },
    {
      num: '04', title: 'Barcelona Makerspaces Network',
      img: images[4],
      text: 'Map of fab labs and makerspaces in Barcelona showing the three collaborating spaces: Fablab Barcelona (institutional), Ateneu de Gràcia (community-run), and Fab Casa del Mig (neighbourhood). Each had a different making culture — which shaped how AI tools were received.',
    },
  ];

  const experiments = [
    {
      label: 'Experiment A', title: 'Text-to-3D → Physical Print',
      images: ['https://i.imgur.com/3MYerGR.jpeg'],
      captions: ['Raw AI-generated mesh — 4 angles, 128k–167k faces'],
      text: 'Using text-to-3D tools, I generated meshes from prompts and sent them directly to the printer. The challenge: AI models often contain non-manifold geometry that printers reject. I learned to repair meshes, adapt prompts, and understand what makes geometry printable. The pink chairs, vases, and candlestick holders were all AI-prompted and physically printed.',
    },
    {
      label: 'Experiment B', title: 'AI Vector → CNC Laser Cutter',
      images: ['https://i.imgur.com/xfj1sHn.jpeg'],
      captions: ['DALL·E prompt → CNC-cut plywood Tic Tac Toe set'],
      text: 'I prompted DALL·E with fabrication constraints built into the text — closed paths, red for cut lines, black for engraving. The resulting file was sent straight to the laser cutter. This proved that with the right prompt structure, AI can bridge ideation and fabrication even for users with no CAD knowledge.',
    },
    {
      label: 'Deep Dive', title: 'Prompt Engineering for Fabrication',
      images: ['https://i.imgur.com/dCM4NXt.jpeg', 'https://i.imgur.com/iHJK1UI.jpeg'],
      captions: ['Fabrication-oriented prompt example 1', 'Fabrication-oriented prompt example 2'],
      text: 'Prompt quality has a direct impact on fabricability. A generic prompt produces geometry full of errors and wrong scale. A prompt that includes material context, fabrication method, and constraints produces something far closer to printable. I developed prompt templates specifically for makers — giving them language to communicate fabrication intent, not just aesthetic intent.',
    },
    {
      label: 'Self-Built Tool', title: 'AI 3D Prompt Generator',
      images: ['https://i.imgur.com/6lcJSA0.jpeg', 'https://i.imgur.com/3Wp1GO2.jpeg'],
      captions: ['The tool interface — guides mesh vs CAD choice', 'Mesh quality: good context prompt vs. generic prompt'],
      text: 'I built my own tool from scratch to make prompt engineering accessible to non-technical makers. It guides users through choosing between mesh-based modeling (organic forms) and CAD-style modeling (precise geometry) — then generates a fabrication-aware prompt tailored to that choice.',
    },
  ];

  const PhaseNav = () => (
    <div className="flex gap-1 mb-12 flex-wrap">
      {phases.map((p, i) => (
        <button
          key={p.id}
          onClick={() => {
            setActivePhase(i);
            document.getElementById(p.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          className={`text-[11px] uppercase tracking-[0.2em] px-4 py-2 transition-all duration-200 font-sans border ${
            activePhase === i
              ? 'bg-black dark:bg-brand-light text-white dark:text-black border-black dark:border-brand-light'
              : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-black dark:hover:border-brand-light hover:text-black dark:hover:text-brand-light'
          }`}
        >
          {p.label}
        </button>
      ))}
    </div>
  );

  const CardGrid: React.FC<{
    cards: { num?: string; label?: string; title: string; img?: string; images?: string[]; captions?: string[]; text: string }[];
    active: number;
    setActive: (i: number) => void;
    stackImages?: boolean;
  }> = ({ cards, active, setActive, stackImages = false }) => {
    const card = cards[active];
    const imgs = card.images ?? (card.img ? [card.img] : []);
    const captions = card.captions ?? [];
    return (
      <div>
        {/* Clickable card buttons — all visible */}
        <div className="flex flex-wrap gap-2 mb-6">
          {cards.map((c, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`text-[11px] uppercase tracking-[0.15em] font-sans px-4 py-2.5 border transition-all duration-200 text-left ${
                active === i
                  ? 'bg-black dark:bg-brand-light text-white dark:text-black border-black dark:border-brand-light'
                  : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:text-black dark:hover:text-brand-light'
              }`}
            >
              <span className="opacity-50 mr-1.5">{c.num ?? c.label}</span>
              {c.title}
            </button>
          ))}
        </div>

        {/* Active card content */}
        <div className="border border-gray-200 dark:border-gray-800 grid md:grid-cols-2">
          {/* Images side */}
          <div className="bg-gray-50 dark:bg-gray-950 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800">
            {imgs.length === 0 ? null : stackImages ? (
              <div className="divide-y divide-gray-200 dark:divide-gray-800">
                {imgs.map((img, i) => (
                  <div key={i}>
                    <Img src={img} alt={captions[i] ?? `Image ${i + 1}`} className="w-full" />
                    {captions[i] && (
                      <p className="px-5 py-2.5 text-xs text-gray-500 dark:text-gray-400 italic">{captions[i]}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <Img src={imgs[0]} alt={captions[0] ?? card.title} className="w-full" />
                {captions[0] && (
                  <p className="px-5 py-2.5 text-xs text-gray-500 dark:text-gray-400 italic border-t border-gray-200 dark:border-gray-800">{captions[0]}</p>
                )}
              </div>
            )}
          </div>
          {/* Text side */}
          <div className="p-8 flex flex-col justify-center">
            <span className="text-[10px] uppercase tracking-[0.25em] text-brand-muted dark:text-gray-500 font-sans mb-2">{card.num ?? card.label}</span>
            <h3 className="text-lg font-bold text-black dark:text-brand-light font-sans mb-4">{card.title}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{card.text}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="pb-24">
      {/* Hero */}
      <div className="relative h-[70vh] overflow-hidden">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <AnimateOnScroll>
            <p className="text-xs uppercase tracking-widest text-white/60 mb-3 font-sans">MDEF Thesis Year 2 · {project.year}</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter uppercase text-white font-sans leading-none max-w-4xl">{project.title}</h1>
            <p className="mt-3 text-lg text-white/70 max-w-2xl font-sans">{project.subtitle}</p>
          </AnimateOnScroll>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Back + meta */}
        <AnimateOnScroll>
          <Link to="/projects" className="mb-8 inline-block text-brand-muted dark:text-gray-400 hover:text-black dark:hover:text-brand-light transition-colors uppercase text-sm tracking-wider font-sans">← All Projects</Link>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs uppercase tracking-wider text-brand-muted dark:text-gray-400 font-sans mb-12">
            <span><strong className="text-black dark:text-brand-light">Year</strong> {project.year}</span>
            <span><strong className="text-black dark:text-brand-light">Context</strong> MDEF · Elisava & IAAC</span>
            <span><strong className="text-black dark:text-brand-light">Partners</strong> Fablab Barcelona · Ateneu de Gràcia · Fab Casa del Mig</span>
            <a href={project.externalLink} target="_blank" rel="noopener noreferrer"
              className="text-black dark:text-brand-light underline hover:text-brand-muted dark:hover:text-gray-400 transition-colors">
              Download Thesis →
            </a>
          </div>
          <PhaseNav />
        </AnimateOnScroll>

        {/* ── OVERVIEW ── */}
        <section id="overview">
          <AnimateOnScroll>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-10 mb-10">
              <span className="text-[10px] uppercase tracking-[0.3em] text-brand-muted dark:text-gray-500 font-sans">Overview</span>
              <h2 className="mt-2 text-2xl font-bold text-black dark:text-brand-light font-sans">The Central Question</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-12 mb-16">
              <div className="md:col-span-2">
                <p className="text-xl md:text-2xl font-bold leading-snug text-black dark:text-brand-light font-sans mb-6">
                  "Can AI tools — usually built for big industries — instead support local communities and give people more control over how things are designed and made?"
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{project.overview}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{project.needs}</p>
              </div>
              <div className="space-y-6 text-sm border-l border-gray-200 dark:border-gray-700 pl-8">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-brand-muted dark:text-gray-500 font-sans mb-2">Collaborators</p>
                  <p className="text-gray-700 dark:text-gray-300">{project.collaborators}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-brand-muted dark:text-gray-500 font-sans mb-2">Services</p>
                  <p className="text-gray-700 dark:text-gray-300">{project.service.join(' · ')}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-brand-muted dark:text-gray-500 font-sans mb-2">Key Skills</p>
                  <p className="text-gray-700 dark:text-gray-300 italic">{project.learnings}</p>
                </div>
              </div>
            </div>
            {project.contextImage && (
              <Img src={project.contextImage} alt="AI tools ecosystem map" className="w-full" />
            )}
          </AnimateOnScroll>
        </section>

        {/* Aesthetic visual break */}
        <div className="mt-20 -mx-4 sm:-mx-6 lg:-mx-8 h-[40vh] overflow-hidden">
          <img
            src="https://i.imgur.com/lGoEceV.jpeg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
        </div>

        {/* ── PHASE 01: MAPPING ── */}
        <section id="mapping" className="mt-20">
          <AnimateOnScroll>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-10 mb-10">
              <span className="text-[10px] uppercase tracking-[0.3em] text-brand-muted dark:text-gray-500 font-sans">Phase 01</span>
              <h2 className="mt-2 text-2xl font-bold text-black dark:text-brand-light font-sans">Mapping the Landscape</h2>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 max-w-2xl">
                Before testing anything, I built research maps to understand where AI tools sit in the design process — and where the real gaps are for non-expert makers.
              </p>
            </div>
            <CardGrid cards={maps} active={mapCard} setActive={setMapCard} />
          </AnimateOnScroll>
        </section>

        {/* ── PHASE 02: MAKING ── */}
        <section id="making" className="mt-20">
          <AnimateOnScroll>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-10 mb-10">
              <span className="text-[10px] uppercase tracking-[0.3em] text-brand-muted dark:text-gray-500 font-sans">Phase 02</span>
              <h2 className="mt-2 text-2xl font-bold text-black dark:text-brand-light font-sans">Making & Prototyping</h2>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 max-w-2xl">
                Every AI tool was evaluated not just on screen — but on whether it could actually produce something fabricable with makerspace machines.
              </p>
            </div>
            <CardGrid cards={experiments} active={expCard} setActive={setExpCard} stackImages />
          </AnimateOnScroll>
        </section>

        {/* ── PHASE 03: TEACHING ── */}
        <section id="teaching" className="mt-20">
          <AnimateOnScroll>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-10 mb-10">
              <span className="text-[10px] uppercase tracking-[0.3em] text-brand-muted dark:text-gray-500 font-sans">Phase 03</span>
              <h2 className="mt-2 text-2xl font-bold text-black dark:text-brand-light font-sans">Teaching & Community Workshops</h2>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 max-w-2xl">
                Testing tools alone wasn't enough. I brought everything to people — designed workshops from scratch, facilitated sessions at three makerspaces, and ran a public roundtable.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-3 mb-8">
              {[
                { src: 'https://i.imgur.com/VvZ8iOl.jpeg', caption: 'Hands-on workshop session — AI tools on screen, mapping worksheets on the table' },
                { src: 'https://i.imgur.com/amK3quc.jpeg', caption: 'Workshop exercises — participants\' sketch-to-image and prompt activities' },
                { src: 'https://i.imgur.com/EA2yKhp.jpeg', caption: 'Public roundtable & AI-Making Manifesto presentation, Les Tres Xemeneies' },
              ].map((img, i) => (
                <div key={i}>
                  <Img src={img.src} alt={img.caption} className="w-full" />
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 italic">{img.caption}</p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="border border-gray-200 dark:border-gray-800 p-6">
                <p className="text-[10px] uppercase tracking-[0.25em] text-brand-muted dark:text-gray-500 font-sans mb-3">Workshop Design</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  I designed the full curriculum from scratch — activities, printed worksheets, tool selection, pacing, and facilitation flow. Each session introduced AI tools through hands-on challenges: sketch to image, text to 3D, and bringing the result to a fabrication machine.
                </p>
              </div>
              <div className="border border-gray-200 dark:border-gray-800 p-6">
                <p className="text-[10px] uppercase tracking-[0.25em] text-brand-muted dark:text-gray-500 font-sans mb-3">Roundtable & Manifesto</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  The thesis concluded with a public roundtable at Les Tres Xemeneies. I presented the AI-Making Manifesto — principles for ethical and accessible AI in community design — to makers, educators, and researchers. On the table: CNC-cut objects and 3D-printed prototypes from the workshops.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-950 p-6">
              <p className="text-[10px] uppercase tracking-[0.25em] text-brand-muted dark:text-gray-500 font-sans mb-4">Workshop Presentation Decks</p>
              <div className="w-full aspect-video">
                <iframe
                  style={{ border: '1px solid rgba(0,0,0,0.1)' }}
                  width="100%" height="100%"
                  src="https://embed.figma.com/design/EDWO3KsGYVlGeHWHMjIgnX/AI-PRESENTATIONS?node-id=0-1&embed-host=share"
                  allowFullScreen title="AI Workshop Presentations"
                />
              </div>
              <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">All slides and materials designed for the three community makerspace sessions.</p>
            </div>
          </AnimateOnScroll>
        </section>

        {/* ── CONCLUSION ── */}
        <section id="conclusion" className="mt-20">
          <AnimateOnScroll>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-10 mb-10">
              <span className="text-[10px] uppercase tracking-[0.3em] text-brand-muted dark:text-gray-500 font-sans">Conclusion</span>
              <h2 className="mt-2 text-2xl font-bold text-black dark:text-brand-light font-sans">The Concept & Reflection</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-brand-muted dark:text-gray-500 font-sans mb-4">AI as a Design Diffuser</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-6">{project.concept}</p>
                <div className="space-y-4">
                  {[
                    'AI can lower the barrier to design — but only when introduced with the right framing and support.',
                    'Amplification (more exploration in the same time) is more valuable to communities than acceleration (finishing faster).',
                    'The physical step — from AI output to fabrication — is where most tools break down. That is the gap that needs design attention.',
                  ].map((c, i) => (
                    <div key={i} className="flex items-start gap-4 border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                      <span className="shrink-0 text-xs text-brand-muted dark:text-gray-600 font-sans mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{c}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="border-l-4 border-black dark:border-brand-light pl-6">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-brand-muted dark:text-gray-500 font-sans mb-3">Core argument</p>
                  <p className="text-xl font-bold text-black dark:text-brand-light font-sans leading-snug">
                    "AI's potential in design is not about speed or automation — it's about access and understanding."
                  </p>
                </div>
                <div className="border-l-4 border-gray-200 dark:border-gray-700 pl-6">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-brand-muted dark:text-gray-500 font-sans mb-3">My reflection</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{project.reflection}</p>
                </div>
              </div>
            </div>

            {/* Exhibition summary */}
            <div className="border border-gray-200 dark:border-gray-800 p-8">
              <p className="text-[10px] uppercase tracking-[0.25em] text-brand-muted dark:text-gray-500 font-sans mb-4">Exhibition & Final Presentation</p>
              <div className="grid md:grid-cols-2 gap-8">
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{project.outcome}</p>
                <div className="space-y-2">
                  {['AI-generated objects fabricated with makerspace tools', 'Four research maps — printed and displayed', 'Workshop documentation from all three makerspaces', 'The AI-Making Manifesto', 'Roundtable with practitioners, educators, and makers'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                      <span className="w-1 h-1 rounded-full bg-gray-400 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </section>

        <ProjectNav prev={prev} next={next} />
      </div>
    </div>
  );
};

// ─── PROJECT 2: Miralls del Demà (Dark / Atmospheric) ────────────────────────
const MirallsDelDema: React.FC<{ project: Project; prev: Project | null; next: Project | null }> = ({ project, prev, next }) => {
  const images = project.images || [];
  const processImages = project.processImages || [];
  const outcomeImages = project.outcomeImages || [];

  const systemLayers = [
    {
      num: '01',
      title: 'Input',
      subtitle: 'The Voice',
      text: 'Visitors stood before a microphone and spoke — about climate change, the future, their fears or hopes. Their words were the raw material.',
      icon: '🎙',
    },
    {
      num: '02',
      title: 'Processing',
      subtitle: 'The AI',
      text: 'An AI system processed the voice in real time: sentiment analysis, emotional tone, and thematic classification. Calm speech and urgent speech produced entirely different outputs.',
      icon: '⚡',
    },
    {
      num: '03',
      title: 'Output',
      subtitle: 'The Light',
      text: 'A monumental curved LED panel translated the AI\'s reading into dynamic light projections. Gentle tones produced slow, fluid waves. Urgent messages fractured into fast, intense bursts.',
      icon: '✦',
    },
  ];

  return (
    <div className="pb-24">

      {/* ── HERO — full bleed, night atmosphere ── */}
      <div className="relative h-[80vh] overflow-hidden">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <AnimateOnScroll>
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/50 mb-4 font-sans">
              Llum BCN Festival · Poblenou, Barcelona · Feb 2025
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter uppercase text-white font-sans leading-none">
              Miralls<br />del Demà
            </h1>
            <p className="mt-4 text-base md:text-lg text-white/65 max-w-xl font-sans">
              Mirrors of Tomorrow — an interactive light installation where your voice shapes the future
            </p>
          </AnimateOnScroll>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <AnimateOnScroll>
          <Link to="/projects" className="mb-10 inline-block text-brand-muted dark:text-gray-400 hover:text-black dark:hover:text-brand-light transition-colors uppercase text-sm tracking-wider font-sans">← All Projects</Link>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs uppercase tracking-wider text-brand-muted dark:text-gray-400 font-sans">
            <span><strong className="text-black dark:text-brand-light">Year</strong> {project.year}</span>
            <span><strong className="text-black dark:text-brand-light">Context</strong> MDEF · MAA · MRAC — IAAC Barcelona</span>
            <span><strong className="text-black dark:text-brand-light">Audience</strong> 220,000+ visitors</span>
            <a href={project.externalLink} target="_blank" rel="noopener noreferrer"
              className="text-black dark:text-brand-light underline hover:text-brand-muted dark:hover:text-gray-400 transition-colors">
              Read IAAC Article →
            </a>
          </div>
        </AnimateOnScroll>

        {/* ── OPENING STATEMENT ── */}
        <AnimateOnScroll className="mt-20 border-t border-gray-200 dark:border-gray-700 pt-16">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-2xl md:text-3xl font-bold leading-snug text-black dark:text-brand-light font-sans mb-6">
                "Is climate change a natural challenge — or a direct consequence of human action?"
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {project.overview}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Over three nights in Barcelona's Parc Central del Poblenou, the installation ran continuously — processing voice after voice, turning collective expression into collective light. More than 220,000 people visited Llum BCN 2025.
              </p>
            </div>
            <div>
              {project.contextImage && (
                <Img src={project.contextImage} alt="Installation diagram" className="w-full" />
              )}
            </div>
          </div>
        </AnimateOnScroll>

        {/* ── THREE SYSTEM LAYERS ── */}
        <AnimateOnScroll className="mt-20">
          <div className="border-t border-gray-200 dark:border-gray-700 pt-10 mb-10">
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-muted dark:text-gray-500 font-sans">How It Works</span>
            <h2 className="mt-2 text-2xl font-bold text-black dark:text-brand-light font-sans">Voice → AI → Light</h2>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 max-w-2xl">
              The installation merged three systems in real time — sound capture, AI sentiment analysis, and generative light output — creating a live feedback loop between what people said and what they saw.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-gray-200 dark:bg-gray-800">
            {systemLayers.map((layer, i) => (
              <div key={i} className="bg-white dark:bg-black p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{layer.icon}</span>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-brand-muted dark:text-gray-500 font-sans">{layer.num} — {layer.title}</span>
                </div>
                <h3 className="font-bold text-black dark:text-brand-light font-sans mb-3">{layer.subtitle}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{layer.text}</p>
              </div>
            ))}
          </div>
        </AnimateOnScroll>

        {/* ── CONCEPT IMAGES — each with context ── */}
        {images.length > 0 && (
          <AnimateOnScroll className="mt-20">
            {/* Aesthetic hero image — full width, no caption */}
            <Img
              src={images[0]}
              alt="Miralls del Demà — installation atmosphere"
              className="w-full aspect-[21/9] mb-3"
            />
            {/* Three contextual renders in a row with labels */}
            <div className="grid md:grid-cols-3 gap-3">
              {[
                { img: images[1], label: 'Aerial view', caption: 'Top-down render showing the structure layout and materials' },
                { img: images[2], label: 'Elevation view', caption: 'Side-view render showing the curved LED panel and structure' },
                { img: images[3], label: 'Site location', caption: 'Location within Parc Central del Poblenou, Barcelona' },
              ].map((item, i) => (
                <div key={i}>
                  <Img src={item.img} alt={item.caption} className="w-full aspect-video" />
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-brand-muted dark:text-gray-500 font-sans shrink-0">{item.label}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 italic">{item.caption}</span>
                  </div>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        )}

        {/* ── CONTEXT & CHALLENGE ── */}
        <AnimateOnScroll className="mt-20">
          <div className="border-t border-gray-200 dark:border-gray-700 pt-10 mb-10">
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-muted dark:text-gray-500 font-sans">Context</span>
            <h2 className="mt-2 text-2xl font-bold text-black dark:text-brand-light font-sans">Why This, Why Now</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{project.needs}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Developed during the Interaction and Prototyping Seminar at IAAC, this was a cross-programme collaboration between students from the Master in Advanced Architecture (MAA), Master in Robotics and Advanced Construction (MRAC), and Master in Design for Emergent Futures (MDEF). The challenge: merge sound capture, NLP, visual generation, and large-scale LED projection into a single responsive system — robust enough to run continuously for three festival nights outdoors.
              </p>
            </div>
            <div className="space-y-4 text-sm border-l border-gray-200 dark:border-gray-700 pl-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-brand-muted dark:text-gray-500 font-sans mb-2">Themes addressed</p>
                <div className="space-y-1">
                  {['Rising CO₂ emissions', 'Plastic pollution', 'Rapid urbanisation', 'Collective climate anxiety', 'Human responsibility vs. natural cycles'].map((t, i) => (
                    <div key={i} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <span className="w-1 h-1 rounded-full bg-gray-400 shrink-0" />{t}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-brand-muted dark:text-gray-500 font-sans mb-2">My role</p>
                <p className="text-gray-700 dark:text-gray-300">{project.service.join(' · ')}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-brand-muted dark:text-gray-500 font-sans mb-2">Collaborators</p>
                <p className="text-gray-700 dark:text-gray-300">{project.collaborators}</p>
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        {/* ── PROCESS — text first, compact image strip below ── */}
        {processImages.length > 0 && (
          <AnimateOnScroll className="mt-20">
            <div className="border-t border-gray-200 dark:border-gray-700 pt-10 mb-10">
              <span className="text-[10px] uppercase tracking-[0.3em] text-brand-muted dark:text-gray-500 font-sans">Process</span>
              <h2 className="mt-2 text-2xl font-bold text-black dark:text-brand-light font-sans">Building the System</h2>
            </div>
            {/* Steps + learnings — full width, readable */}
            <div className="grid md:grid-cols-2 gap-12 mb-10">
              <div>{renderContent(project.process, true)}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed self-start">{project.learnings}</p>
            </div>
            {/* Process images as a compact horizontal strip */}
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
              {processImages.map((img, i) => (
                <Img key={i} src={img} alt={`Process ${i + 1}`} className="w-full aspect-square" />
              ))}
            </div>
          </AnimateOnScroll>
        )}

        {/* ── OUTCOME — text first, then images ── */}
        {outcomeImages.length > 0 && (
          <AnimateOnScroll className="mt-20">
            <div className="border-t border-gray-200 dark:border-gray-700 pt-10 mb-10">
              <span className="text-[10px] uppercase tracking-[0.3em] text-brand-muted dark:text-gray-500 font-sans">The Night</span>
              <h2 className="mt-2 text-2xl font-bold text-black dark:text-brand-light font-sans">Three Nights in Poblenou</h2>
            </div>
            {/* Text + quote before images */}
            <div className="grid md:grid-cols-2 gap-12 items-start mb-10">
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{project.outcome}</p>
              <div className="border-l-4 border-black dark:border-brand-light pl-6">
                <p className="text-[10px] uppercase tracking-[0.25em] text-brand-muted dark:text-gray-500 font-sans mb-3">What it felt like</p>
                <p className="text-base font-semibold text-black dark:text-brand-light font-sans leading-snug">
                  "Calm tones produced gentle, slow waves — urgent messages generated fast, fractured movements."
                </p>
              </div>
            </div>
            {/* Images after — compact grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {outcomeImages.map((img, i) => (
                <Img key={i} src={img} alt={`Night view ${i + 1}`} className="w-full aspect-[4/3]" />
              ))}
            </div>
          </AnimateOnScroll>
        )}

        {/* ── REFLECTION ── */}
        {project.reflection && (
          <AnimateOnScroll className="mt-20 border-t border-gray-200 dark:border-gray-700 pt-12">
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-brand-muted dark:text-gray-500 font-sans">Reflection</span>
                <h2 className="mt-2 text-2xl font-bold text-black dark:text-brand-light font-sans mb-6">What I Learned</h2>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{project.reflection}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-950 p-8 self-start">
                <p className="text-[10px] uppercase tracking-[0.25em] text-brand-muted dark:text-gray-500 font-sans mb-4">Skills developed</p>
                <div className="space-y-2">
                  {['Co-developing large-scale public installations', 'Integrating AI into interactive real-time systems', 'Designing electronics for outdoor public space', 'Collaborating across architecture, robotics and design', 'Working with LED panels and projection at festival scale'].map((s, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 shrink-0" />{s}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        )}

        {/* ── VIDEO ── */}
        <AnimateOnScroll className="mt-20 border-t border-gray-200 dark:border-gray-700 pt-10">
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-muted dark:text-gray-500 font-sans block mb-4">Video</span>
          <div className="w-full aspect-video">
            <iframe
              width="100%" height="100%"
              src="https://www.youtube.com/embed/sL4F9EtnTpo"
              title="Miralls del Demà — Llum BCN 2025"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </AnimateOnScroll>

        <ProjectNav prev={prev} next={next} />
      </div>
    </div>
  );
};

// ─── PROJECT 3: Unseen Exposures (Surveillance / Critical Design) ─────────────
const UnseenExposures: React.FC<{ project: Project; prev: Project | null; next: Project | null }> = ({ project, prev, next }) => {
  const images = project.images || [];
  const processImages = project.processImages || [];
  const outcomeImages = project.outcomeImages || [];

  // Fixed machine images — hardcoded to correct URLs
  const machines = [
    {
      title: 'AdProfiler',
      subtitle: 'Discover How Advertisers Profile You',
      description: 'Participants answered a 10-question personality test while a hidden camera captured their image. Within minutes the machine inferred age, gender, dominant emotion and personality traits — then generated a personalized ad using AI. The result is both amusing and unsettling: a demonstration of how quickly and confidently advertising algorithms build psychological profiles from almost nothing.',
      img: 'https://i.imgur.com/CEm7ovS.png',
    },
    {
      title: 'Read the Room',
      subtitle: 'Your Room, Quantified',
      description: '"Read the Room" aggregated live data from all participants — displaying collective mood, gender ratio, extroversion level and more on a screen. It shows how platforms simplify complex human identities into measurable categories, often reinforcing bias in the process. The room becomes a dataset.',
      img: 'https://i.imgur.com/UVMq0oE.png',
    },
    {
      title: 'Aggressive Machine',
      subtitle: 'When Algorithms Judge You',
      description: 'A camera-based system analyzed body language and proximity to detect "aggressive behavior." When someone moved too close or gestured strongly, the machine triggered sound and light alerts. The piece makes visible the danger of context-free AI surveillance — where normal human expression becomes a threat signal.',
      img: 'https://i.imgur.com/xTtSSjd.png',
    },
  ];

  return (
    <div className="pb-24">
      {/* Hero — single full-bleed image */}
      <div className="relative h-[70vh] overflow-hidden">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 md:p-14">
          <AnimateOnScroll>
            <p className="text-xs uppercase tracking-widest text-white/50 mb-3 font-sans">MDEF Thesis Year 1 · {project.year}</p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase text-white font-sans leading-none">{project.title}</h1>
            <p className="mt-3 text-base text-white/70 font-sans max-w-lg">{project.subtitle}</p>
          </AnimateOnScroll>
        </div>
        <div className="absolute top-6 left-6 border border-white/20 w-24 h-16 pointer-events-none">
          <span className="absolute -top-3 left-1 text-[9px] text-white/40 font-mono uppercase tracking-widest">REC</span>
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <AnimateOnScroll>
          <Link to="/projects" className="mb-10 inline-block text-brand-muted dark:text-gray-400 hover:text-black dark:hover:text-brand-light transition-colors uppercase text-sm tracking-wider font-sans">← All Projects</Link>
          <MetaRow project={project} linkText="Visit Website" isPdf={false} />
        </AnimateOnScroll>

        {/* Opening question — editorial pull quote */}
        <AnimateOnScroll className="mt-20 border-t border-gray-200 dark:border-gray-700 pt-16">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-3xl md:text-4xl font-bold leading-tight text-black dark:text-brand-light font-sans">
              "If you have nothing to hide,<br />you have nothing to fear."
            </p>
            <p className="mt-6 text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Most participants in the exhibition disagreed with this statement — yet most also believed they were not important enough to be surveilled. <em>Unseen Exposures</em> was built to challenge both assumptions at once.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Overview + meta */}
        <AnimateOnScroll className="mt-20 grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <SectionHeading>The Project</SectionHeading>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {project.overview}
            </p>
            <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
              Developed as my first thesis project at MDEF & Fab Lab Barcelona, it was a year-long exploration into data ethics and surveillance capitalism. Rather than presenting privacy as an abstract concept, it put visitors directly into the feedback loop — turning them from passive users into active subjects of observation.
            </p>
          </div>
          <div className="text-sm space-y-5">
            <div>
              <p className="font-bold uppercase tracking-wider text-brand-muted dark:text-gray-400 text-xs mb-2 font-sans">Context</p>
              <p className="text-gray-700 dark:text-gray-300">MDEF Thesis Year 1 · Fab Lab Barcelona · 2024</p>
            </div>            <div>
              <p className="font-bold uppercase tracking-wider text-brand-muted dark:text-gray-400 text-xs mb-2 font-sans">Services</p>
              <p className="text-gray-700 dark:text-gray-300">{project.service.join(' · ')}</p>
            </div>
            <div>
              <p className="font-bold uppercase tracking-wider text-brand-muted dark:text-gray-400 text-xs mb-2 font-sans">Skills Gained</p>
              <p className="text-gray-700 dark:text-gray-300 italic">{project.learnings}</p>
            </div>
            <div>
              <p className="font-bold uppercase tracking-wider text-brand-muted dark:text-gray-400 text-xs mb-2 font-sans">Exhibited At</p>
              <p className="text-gray-700 dark:text-gray-300">MDEFest · La Cristaleria · June 2024 & June 2025</p>
            </div>
          </div>
        </AnimateOnScroll>

        {/* The problem */}
        <AnimateOnScroll className="mt-24">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <SectionHeading>The Problem: Surveillance Capitalism</SectionHeading>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                Many people know their data is being collected — but few understand how it is used, or what biases shape its interpretation. Surveillance capitalism turns human behavior into data that predicts and influences consumer behavior, often without meaningful consent or awareness.
              </p>
              <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                The project began with a simple question: what if instead of reading about surveillance, you could feel it acting on you?
              </p>
            </div>
            <div>
              <SectionHeading>The Approach</SectionHeading>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                The installation was structured around three distinct but connected machines, each addressing a different aspect of data analysis and its ethical implications. Visitors moved through them in sequence — becoming both subjects and observers of the same systems they use every day online.
              </p>
              <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                Each machine was built with accessible components — Arduino, Raspberry Pi, cameras, and sensors — combined with lightweight machine learning models to produce real-time feedback.
              </p>
            </div>
          </div>
        </AnimateOnScroll>

        {/* The Three Machines — full editorial treatment */}
        <AnimateOnScroll className="mt-24">
          <SectionHeading>The Three Machines</SectionHeading>
          <div className="space-y-0 mt-8">
            {machines.map((m, i) => (
              <div key={i} className={`grid md:grid-cols-2 gap-0 border-t border-gray-200 dark:border-gray-700 ${i % 2 === 0 ? '' : ''}`}>
                <div className={`p-10 md:p-14 flex flex-col justify-center ${i % 2 !== 0 ? 'md:order-2' : ''}`}>
                  <span className="text-xs uppercase tracking-widest text-brand-muted dark:text-gray-500 font-sans mb-3">Machine {String(i + 1).padStart(2, '0')}</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-brand-light font-sans mb-1">{m.title}</h3>
                  <p className="text-sm text-brand-muted dark:text-gray-400 mb-5 font-sans italic">{m.subtitle}</p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">{m.description}</p>
                </div>
                <div className={`aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-900 ${i % 2 !== 0 ? 'md:order-1' : ''}`}>
                  {m.img && <Img src={m.img} alt={m.title} className="w-full h-full" />}
                </div>
              </div>
            ))}
          </div>
        </AnimateOnScroll>

        {/* Process */}
        {project.process && (
          <AnimateOnScroll className="mt-24 border-t border-gray-200 dark:border-gray-700 pt-12">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div>
                <SectionHeading>How It Was Built</SectionHeading>
                {renderContent(project.process, true)}
              </div>
              {processImages.length > 0 && (
                <div className="grid grid-cols-2 gap-3">
                  {processImages.map((img, i) => (
                    <Img key={i} src={img} alt={`Process ${i + 1}`} className="w-full aspect-square" />
                  ))}
                </div>
              )}
            </div>
          </AnimateOnScroll>
        )}

        {/* Ethical questions section */}
        <AnimateOnScroll className="mt-24 bg-gray-50 dark:bg-gray-950 p-10 md:p-16">
          <SectionHeading>Ethical Questions at the Exhibition</SectionHeading>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed max-w-2xl mb-10">
            As part of the experience, visitors were asked to vote on four statements about technology, privacy and surveillance. The results were displayed in real time — adding another layer to the installation itself.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { statement: '"Privacy is dead. Get over it."', response: 'Majority disagreed — privacy still matters even when people feel powerless.' },
              { statement: '"Privacy is not an option, and shouldn\'t be the price we pay for getting on the internet."', response: 'Strong agreement — digital access shouldn\'t require surrendering privacy.' },
              { statement: '"If you have nothing to hide, you have nothing to fear."', response: 'Overwhelmingly rejected — people value privacy regardless of perceived significance.' },
              { statement: '"Guns don\'t kill people, people kill people."', response: 'Mixed responses — used to spark debate about agency vs. systems of harm.' },
            ].map((q, i) => (
              <div key={i} className="border-l-2 border-gray-300 dark:border-gray-600 pl-5">
                <p className="text-sm font-semibold text-black dark:text-brand-light font-sans mb-2">{q.statement}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{q.response}</p>
              </div>
            ))}
          </div>
        </AnimateOnScroll>

        {/* Exhibition outcome */}
        {outcomeImages.length > 0 && (
          <AnimateOnScroll className="mt-24">
            <SectionHeading>The Exhibition: MDEFest 2024 & 2025</SectionHeading>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed max-w-2xl mb-10">
              The installation was first exhibited on June 11, 2024 as part of MDEFest. Visitors could interact with all three machines, view posters about the extent of data collection, and engage in conversations about digital privacy. It was later shown again in June 2025 as part of the MDEF showcase at Fab Lab Barcelona. By blending humor and discomfort, the exhibit transformed abstract concepts into embodied experiences.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {outcomeImages.map((img, i) => (
                <Img key={i} src={img} alt={`Exhibition ${i + 1}`} className={`w-full ${i === 0 ? 'col-span-2 aspect-[16/7]' : 'aspect-square'}`} />
              ))}
            </div>
          </AnimateOnScroll>
        )}

        {/* Reflection */}
        <AnimateOnScroll className="mt-24 grid md:grid-cols-2 gap-16 border-t border-gray-200 dark:border-gray-700 pt-12">
          <div>
            <SectionHeading>What I Learned</SectionHeading>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
              {project.reflection}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-950 p-8 self-start">
            <p className="text-xs uppercase tracking-widest text-brand-muted dark:text-gray-500 font-sans mb-4">Key Takeaway</p>
            <p className="text-lg font-semibold text-black dark:text-brand-light font-sans leading-snug">
              "Technology critique works best when it's experiential — when people can feel surveillance acting on them, rather than only reading about it."
            </p>
          </div>
        </AnimateOnScroll>

        {/* ── VIDEO ── */}
        <AnimateOnScroll className="mt-20 border-t border-gray-200 dark:border-gray-700 pt-10">
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-muted dark:text-gray-500 font-sans block mb-4">Video</span>
          <div className="w-full aspect-video">
            <iframe
              width="100%" height="100%"
              src="https://www.youtube.com/embed/iLEhcb6H73Q"
              title="Unseen Exposures — {Un}Data Me"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </AnimateOnScroll>

        <ProjectNav prev={prev} next={next} />
      </div>
    </div>
  );
};

// ─── PROJECT 4: TÀNIA Pilot (Urban / Civic AI) ────────────────────────────────
const TaniaPilot: React.FC<{ project: Project; prev: Project | null; next: Project | null }> = ({ project, prev, next }) => {
  const images = project.images || [];
  const outcomeImages = project.outcomeImages || [];

  const pillars = [
    {
      num: '01',
      title: 'Citizen Science',
      text: 'Residents collected real noise data using IoT Smart Citizen Kit sensors placed around Plaça de la Virreina. The data was raw, local, and owned by the community.',
    },
    {
      num: '02',
      title: 'Participatory Research',
      text: 'Workshops captured personal stories about nighttime noise, coexistence and emotion. The goal was to translate lived experience — not just decibels — into something the system could understand.',
    },
    {
      num: '03',
      title: 'RUT: The AI Persona',
      text: 'An AI chatbot trained on community testimonies became "the voice of the square." RUT communicated in a tone reflecting empathy and local character — not a generic assistant, but a neighbor.',
    },
    {
      num: '04',
      title: 'Public Communication',
      text: 'Digital screens in the plaza displayed RUT\'s evolving messages, reacting to live noise data. Passersby could read her comments and interact via Telegram (@Virreina_bot).',
    },
  ];

  return (
    <div className="pb-24">
      {/* Hero */}
      <header className="relative h-[70vh] overflow-hidden">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <AnimateOnScroll>
            <p className="text-xs uppercase tracking-widest text-white/50 mb-3 font-sans">Community AI · Gràcia, Barcelona · {project.year}</p>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase text-white font-sans leading-none">{project.title}</h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl font-sans">{project.subtitle}</p>
          </AnimateOnScroll>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <AnimateOnScroll>
          <Link to="/projects" className="mb-10 inline-block text-brand-muted dark:text-gray-400 hover:text-black dark:hover:text-brand-light transition-colors uppercase text-sm tracking-wider font-sans">← All Projects</Link>
          <MetaRow project={project} linkText="Visit Website" isPdf={false} />
        </AnimateOnScroll>

        {/* Opening manifesto quote */}
        <AnimateOnScroll className="mt-20 border-t border-gray-200 dark:border-gray-700 pt-16">
          <div className="max-w-4xl">
            <p className="text-2xl md:text-3xl font-bold leading-tight text-black dark:text-brand-light font-sans">
              "Enough of Artificial Intelligence that flattens human complexity."
            </p>
            <p className="mt-6 text-base text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed">
              We are flooded with technology that prioritizes cold efficiency and forgets the people it's supposed to serve. TÀNIA was built to challenge this — advocating for a community AI with cultural depth, context awareness, and a focus on social cohesion over quick metrics.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Overview + meta + context image */}
        <AnimateOnScroll className="mt-20 grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-6">
            <div>
              <SectionHeading>The Project</SectionHeading>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {project.overview}
              </p>
              <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                Through a participatory process, residents of the Gràcia neighborhood contributed their testimonies and, together with other volunteers, brought a character to life — an AI persona named RUT that humanizes the environment and fosters respect and empathy among visitors to the plaza.
              </p>
            </div>
          </div>
          <div className="text-sm space-y-5">
            <div>
              <p className="font-bold uppercase tracking-wider text-brand-muted dark:text-gray-400 text-xs mb-2 font-sans">Location</p>
              <p className="text-gray-700 dark:text-gray-300">Plaça de la Virreina · Gràcia · Barcelona</p>
            </div>
            <div>
              <p className="font-bold uppercase tracking-wider text-brand-muted dark:text-gray-400 text-xs mb-2 font-sans">Services</p>
              <p className="text-gray-700 dark:text-gray-300">{project.service.join(' · ')}</p>
            </div>
            <div>
              <p className="font-bold uppercase tracking-wider text-brand-muted dark:text-gray-400 text-xs mb-2 font-sans">Skills Gained</p>
              <p className="text-gray-700 dark:text-gray-300 italic">{project.learnings}</p>
            </div>
            <div>
              <p className="font-bold uppercase tracking-wider text-brand-muted dark:text-gray-400 text-xs mb-2 font-sans">Talk to RUT</p>
              <a href="https://t.me/Virreina_bot" target="_blank" rel="noopener noreferrer"
                className="text-black dark:text-brand-light underline hover:text-brand-muted dark:hover:text-gray-400 transition-colors">
                @Virreina_bot on Telegram →
              </a>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Context image full-width */}
        {project.contextImage && (
          <AnimateOnScroll className="mt-16">
            <Img src={project.contextImage} alt="Plaça de la Virreina context" className="w-full aspect-[21/9]" />
          </AnimateOnScroll>
        )}

        {/* The problem */}
        <AnimateOnScroll className="mt-24">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <SectionHeading>The Challenge</SectionHeading>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                Barcelona's public squares often see clashes between nightlife, tourism, and residents. The city needed a way to mediate between sound and emotion — not just collect data, but translate it into constructive dialogue.
              </p>
              <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                The core challenge: how do you use technology as a social bridge? How can sensors and AI help residents, policymakers, and businesses hear each other — without reducing human complexity to a bar chart?
              </p>
            </div>
            <div>
              <SectionHeading>What Made It Different</SectionHeading>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                Most noise monitoring projects stop at data. TÀNIA went further: the data was used to train a personality, not just generate alerts. RUT wasn't designed to replace human judgment — she was designed to carry community voices into places where those voices weren't being heard.
              </p>
              <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                This is what <em>situated AI</em> means in practice: a system that understands where it operates, avoids generic algorithms, and respects the nuances and identities of the people it represents.
              </p>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Four pillars */}
        <AnimateOnScroll className="mt-24">
          <SectionHeading>How It Works: The Four Pillars</SectionHeading>
          <div className="grid md:grid-cols-2 gap-px bg-gray-200 dark:bg-gray-800 mt-8">
            {pillars.map((p, i) => (
              <div key={i} className="bg-white dark:bg-black p-8 md:p-10">
                <span className="text-xs uppercase tracking-widest text-brand-muted dark:text-gray-500 font-sans">{p.num}</span>
                <h3 className="mt-2 text-lg font-bold text-black dark:text-brand-light font-sans mb-3">{p.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </AnimateOnScroll>

        {/* Concept images + process */}
        {images.length > 0 && (
          <AnimateOnScroll className="mt-24 grid md:grid-cols-2 gap-12 items-start">
            <div>
              <SectionHeading>Process</SectionHeading>
              {renderContent(project.process, true)}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {images.map((img, i) => (
                <Img key={i} src={img} alt={`Process ${i + 1}`} className="w-full aspect-square" />
              ))}
            </div>
          </AnimateOnScroll>
        )}

        {/* Meet RUT */}
        <AnimateOnScroll className="mt-24 bg-gray-50 dark:bg-gray-950 p-10 md:p-16">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <SectionHeading>Meet RUT</SectionHeading>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                RUT is the AI voice of Plaça de la Virreina. She was built on a GPT assistant trained with a local database of interviews and testimonies collected from neighbors — real stories, frustrations, and memories from the Gràcia neighborhood.
              </p>
              <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                When noise levels rise, RUT doesn't generate a generic alert. She tells a story. She speaks with the warmth and complexity of the people whose voices she carries. Her messages were displayed on a screen in the plaza that continuously cycled her responses — making the data visible, human, and present in the space.
              </p>
              <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                RUT ran on a local server (no longer active) and was accessible via Telegram for its easy access and low barrier to entry for residents of all ages.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://github.com/carmenrobres/TelegramChatbot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm uppercase tracking-wider font-sans text-black dark:text-brand-light border border-black dark:border-brand-light px-6 py-3 hover:bg-black hover:text-white dark:hover:bg-brand-light dark:hover:text-black transition-colors"
                >
                  View Repository →
                </a>
                <a
                  href="https://www.projectetania.cat/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm uppercase tracking-wider font-sans text-brand-muted dark:text-gray-400 border border-gray-300 dark:border-gray-700 px-6 py-3 hover:text-black dark:hover:text-brand-light hover:border-black dark:hover:border-brand-light transition-colors"
                >
                  Project Website →
                </a>
              </div>
            </div>
            {outcomeImages.length > 0 && (
              <div className="space-y-3">
                {outcomeImages.slice(0, 2).map((img, i) => (
                  <Img key={i} src={img} alt={`RUT in the plaza ${i + 1}`} className="w-full aspect-video" />
                ))}
              </div>
            )}
          </div>
        </AnimateOnScroll>

        {/* Technical Deep Dive */}
        <AnimateOnScroll className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-12">
          <SectionHeading>How RUT Was Built</SectionHeading>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            {[
              {
                icon: '🤖',
                title: 'AI & Language',
                items: [
                  'OpenAI GPT API for natural language generation',
                  'Custom system prompt trained on neighborhood interview database',
                  'WhisperAI for audio/voice message transcription',
                  'DALL-E integration for image analysis responses',
                ],
              },
              {
                icon: '📱',
                title: 'Interface & Access',
                items: [
                  'Telegram Bot API — chosen for low barrier to entry',
                  'Flask web server running locally',
                  'Continuous display screen in the plaza cycling RUT\'s messages',
                  'Poster communication campaign in the neighborhood',
                ],
              },
              {
                icon: '🗄️',
                title: 'Data & Logging',
                items: [
                  'Google Drive & Google Sheets API for interaction logging',
                  'All conversations (text, image, audio) stored for analysis',
                  'Local server deployment — community-owned infrastructure',
                  'Langchain integration for database querying (optional layer)',
                ],
              },
            ].map((col, i) => (
              <div key={i} className="border border-gray-200 dark:border-gray-800 p-6">
                <span className="text-2xl mb-3 block">{col.icon}</span>
                <h3 className="font-bold text-black dark:text-brand-light font-sans mb-4 text-sm uppercase tracking-wider">{col.title}</h3>
                <ul className="space-y-2">
                  {col.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 dark:bg-gray-600 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-8 text-xs text-gray-400 dark:text-gray-600 font-sans italic">
            Built with Python 3.8 · Telegram BotFather · OpenAI API · Google Sheets API · Flask · Local server (no longer active)
          </p>
        </AnimateOnScroll>

        {/* Remaining outcome images */}
        {outcomeImages.length > 2 && (
          <AnimateOnScroll className="mt-8">
            <div className="grid grid-cols-3 gap-3">
              {outcomeImages.slice(2).map((img, i) => (
                <Img key={i} src={img} alt={`Outcome ${i + 3}`} className="w-full aspect-[4/3]" />
              ))}
            </div>
          </AnimateOnScroll>
        )}

        {/* Reflection */}
        <AnimateOnScroll className="mt-24 grid md:grid-cols-2 gap-16 border-t border-gray-200 dark:border-gray-700 pt-12">
          <div>
            <SectionHeading>What I Learned</SectionHeading>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
              {project.reflection}
            </p>
          </div>
          <div className="self-start">
            <div className="border-l-4 border-black dark:border-brand-light pl-6 space-y-4">
              <p className="text-xs uppercase tracking-widest text-brand-muted dark:text-gray-500 font-sans">Core Insight</p>
              <p className="text-lg font-semibold text-black dark:text-brand-light font-sans leading-snug">
                "We don't need technology that replaces us or processes us as mere data. We need an AI that strengthens our collective intelligence and respects our diversity."
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-sans">— TÀNIA Project Manifesto</p>
            </div>
          </div>
        </AnimateOnScroll>

        <ProjectNav prev={prev} next={next} />
      </div>
    </div>
  );
};

// ─── PROJECT 5: Compostable Altar (Organic / Bio) ─────────────────────────────
const CompostableAltar: React.FC<{ project: Project; prev: Project | null; next: Project | null }> = ({ project, prev, next }) => {
  const images = project.images || [];
  const processImages = project.processImages || [];
  const outcomeImages = project.outcomeImages || [];

  const soilMetrics = [
    { label: 'Temperature', detail: 'Tracked continuously outdoors under real weather conditions' },
    { label: 'Humidity', detail: 'Improved moisture retention observed as biomaterial decomposed' },
    { label: 'pH', detail: 'Gradual shift toward more fertile soil chemistry over 3 months' },
    { label: 'Nutrients', detail: 'Measurable increase in nutrient availability from decomposing biomass' },
  ];

  return (
    <div className="pb-24">
      {/* Hero — full bleed, no sidebar */}
      <div className="relative h-[70vh] overflow-hidden">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 md:p-12">
          <AnimateOnScroll>
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/60 mb-3 font-sans">Bio Design · {project.year}</p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase text-white font-sans leading-none">
              Compostable<br />Altar
            </h1>
            <p className="mt-3 text-base text-white/70 font-sans max-w-lg">{project.subtitle}</p>
          </AnimateOnScroll>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <AnimateOnScroll>
          <Link to="/projects" className="mb-10 inline-block text-brand-muted dark:text-gray-400 hover:text-black dark:hover:text-brand-light transition-colors uppercase text-sm tracking-wider font-sans">← All Projects</Link>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs uppercase tracking-wider text-brand-muted dark:text-gray-400 font-sans">
            <span><strong className="text-black dark:text-brand-light">Year</strong> {project.year}</span>
            <span><strong className="text-black dark:text-brand-light">Programme</strong> Hungry EcoCities · EU Starts Programme</span>
            <a href={project.externalLink} target="_blank" rel="noopener noreferrer"
              className="text-black dark:text-brand-light underline hover:text-brand-muted dark:hover:text-gray-400 transition-colors">
              View on GitHub →
            </a>
            <a href="https://carmenrobresdev.grafana.net/public-dashboards/2f0d_b1b6d794fd3bea7a44c23bf50f4" target="_blank" rel="noopener noreferrer"
              className="text-black dark:text-brand-light underline hover:text-brand-muted dark:hover:text-gray-400 transition-colors">
              Live Data Dashboard →
            </a>
          </div>
        </AnimateOnScroll>

        {/* Overview + meta */}
        <AnimateOnScroll className="mt-20 border-t border-gray-200 dark:border-gray-700 pt-12">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-brand-muted dark:text-gray-500 font-sans">Overview</span>
              <h2 className="mt-2 text-2xl font-bold text-black dark:text-brand-light font-sans mb-6">Biomaterials, Ritual & Soil Regeneration</h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{project.overview}</p>
            </div>
            <div className="text-sm space-y-5 border-l border-gray-200 dark:border-gray-700 pl-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-brand-muted dark:text-gray-500 font-sans mb-2">Lead</p>
                <p className="text-gray-700 dark:text-gray-300">{project.collaborators}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-brand-muted dark:text-gray-500 font-sans mb-2">My Role</p>
                <p className="text-gray-700 dark:text-gray-300">Electronics & AI Researcher</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-brand-muted dark:text-gray-500 font-sans mb-2">Services</p>
                <p className="text-gray-700 dark:text-gray-300">{project.service.join(' · ')}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-brand-muted dark:text-gray-500 font-sans mb-2">Mentors</p>
                <p className="text-gray-700 dark:text-gray-300">Mendelu · In4Art · Studio Other Spaces</p>
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Context + concept — horizontal images shown full width */}
        <AnimateOnScroll className="mt-20 border-t border-gray-200 dark:border-gray-700 pt-12">
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-muted dark:text-gray-500 font-sans">The Question</span>
          <h2 className="mt-2 text-2xl font-bold text-black dark:text-brand-light font-sans mb-6">What if design's value lay in its disappearance?</h2>
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{project.needs}</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{project.concept}</p>
            </div>
            {/* 2-column image grid — context + 2 concept side by side */}
            <div className="grid grid-cols-2 gap-3">
              {images.map((img, i) => (
                <Img key={i} src={img} alt={`Concept ${i + 1}`} className="w-full aspect-[3/4]" />
              ))}
            </div>
          </div>
        </AnimateOnScroll>

        {/* Process — big first image + 2 stacked small on right */}
        {processImages.length > 0 && (
          <AnimateOnScroll className="mt-20 border-t border-gray-200 dark:border-gray-700 pt-12">
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-muted dark:text-gray-500 font-sans">Process</span>
            <h2 className="mt-2 text-2xl font-bold text-black dark:text-brand-light font-sans mb-10">How It Was Made</h2>
            <div className="grid md:grid-cols-2 gap-12 mb-10">
              <div>{renderContent(project.process, true)}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed self-start">{project.learnings}</p>
            </div>
            {/* Main image + 2 smaller stacked */}
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <Img src={processImages[0]} alt="Process main" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col gap-3">
                {processImages.slice(1, 3).map((img, i) => (
                  <Img key={i} src={img} alt={`Process ${i + 2}`} className="w-full flex-1" />
                ))}
              </div>
            </div>
            {/* Any remaining process images full width */}
            {processImages.length > 3 && processImages.slice(3).map((img, i) => (
              <Img key={i} src={img} alt={`Process ${i + 4}`} className="w-full mt-3" />
            ))}
          </AnimateOnScroll>
        )}

        {/* Data & Soil Science */}
        <AnimateOnScroll className="mt-20 border-t border-gray-200 dark:border-gray-700 pt-12">
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-muted dark:text-gray-500 font-sans">Data & Soil Life</span>
          <h2 className="mt-2 text-2xl font-bold text-black dark:text-brand-light font-sans mb-6">Three Months of Soil Monitoring</h2>
          <div className="grid md:grid-cols-2 gap-16 items-start mb-12">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                For three months, soil sensors measured temperature, humidity, pH and nutrients in a pilot experiment exposed to outdoor conditions and automatic irrigation — simulating a small farm environment. The results revealed how the decomposing biomaterials enrich the soil, increase nutrient availability and improve moisture retention.
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-6 italic">
                "The offering was not symbolic — it was measurable and regenerative."
              </p>
              <div className="grid grid-cols-2 gap-px bg-gray-200 dark:bg-gray-800">
                {soilMetrics.map((m, i) => (
                  <div key={i} className="bg-white dark:bg-black p-5">
                    <p className="font-bold text-black dark:text-brand-light font-sans text-sm mb-1">{m.label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{m.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-brand-muted dark:text-gray-500 font-sans mb-4">Predictive Modeling</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Based on the sensor data, two predictive models were built to estimate how soil nutrients might change over time as biomaterial decomposes and is absorbed. Together, these tools convert experimental soil data into interactive, data-driven insights into how biomaterials affect soil regeneration.
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-6 italic">
                "AI does not seek to control, but to listen — translating the rhythms of the soil into possible futures."
              </p>
              <a
                href="https://carmenrobresdev.grafana.net/public-dashboards/2f0d_b1b6d794fd3bea7a44c23bf50f4"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-sans text-black dark:text-brand-light border border-black dark:border-brand-light px-5 py-3 hover:bg-black hover:text-white dark:hover:bg-brand-light dark:hover:text-black transition-colors"
              >
                View Live Data Dashboard →
              </a>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Outcome images */}
        {outcomeImages.length > 0 && (
          <AnimateOnScroll className="mt-20 border-t border-gray-200 dark:border-gray-700 pt-12">
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-muted dark:text-gray-500 font-sans">Outcome</span>
            <h2 className="mt-2 text-2xl font-bold text-black dark:text-brand-light font-sans mb-4">The Living Experiment</h2>
            <div className="max-w-2xl mb-4">{renderContent(project.outcome)}</div>
            <a
              href="https://carmenrobresdev.grafana.net/public-dashboards/2f0d_b1b6d794fd3bea7a44c23bf50f4"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-sans text-black dark:text-brand-light border border-black dark:border-brand-light px-5 py-3 mb-8 hover:bg-black hover:text-white dark:hover:bg-brand-light dark:hover:text-black transition-colors"
            >
              See Data Results →
            </a>
            <div className="grid grid-cols-3 gap-3">
              {outcomeImages.map((img, i) => (
                <Img key={i} src={img} alt={`Outcome ${i + 1}`} className={`w-full ${i === 0 ? 'col-span-3 aspect-[21/9]' : 'aspect-square'}`} />
              ))}
            </div>
          </AnimateOnScroll>
        )}

        {/* Exhibition feature */}
        <AnimateOnScroll className="mt-20 border-t border-gray-200 dark:border-gray-700 pt-12">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-brand-muted dark:text-gray-500 font-sans">Featured In</span>
              <h2 className="mt-2 text-2xl font-bold text-black dark:text-brand-light font-sans mb-4">La Materia Construida</h2>
              <p className="text-xs uppercase tracking-wider text-brand-muted dark:text-gray-500 font-sans mb-4">04.12.25 – 15.02.26 · Exhibition</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Compostable Altar was selected for <em>La Materia Construida</em>, an exhibition exploring the intersection of materials, ecology, and fabrication.
              </p>
              <a
                href="https://www.fad.cat/es/agenda/13920/la-materia-construida"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-sans text-black dark:text-brand-light border border-black dark:border-brand-light px-5 py-3 hover:bg-black hover:text-white dark:hover:bg-brand-light dark:hover:text-black transition-colors"
              >
                View Exhibition →
              </a>
            </div>
            <Img
              src="https://i.imgur.com/5rX8iDm.jpeg"
              alt="La Materia Construida exhibition — Compostable Altar on display"
              className="w-full"
            />
          </div>
        </AnimateOnScroll>

        {/* Reflection + video */}
        {project.reflection && (
          <AnimateOnScroll className="mt-20 border-t border-gray-200 dark:border-gray-700 pt-12">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-brand-muted dark:text-gray-500 font-sans">Reflection</span>
                <h2 className="mt-2 text-2xl font-bold text-black dark:text-brand-light font-sans mb-6">What I Learned</h2>
                {renderContent(project.reflection)}
              </div>
              <div className="space-y-4">
                <p className="text-[10px] uppercase tracking-[0.25em] text-brand-muted dark:text-gray-500 font-sans">Project Video</p>
                <div className="w-full aspect-video">
                  <iframe
                    width="100%" height="100%"
                    src="https://www.youtube.com/embed/hX_ZQRprAUM"
                    title="Compostable Altar"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <a
                  href="https://www.youtube.com/watch?v=hX_ZQRprAUM"
                  target="_blank" rel="noopener noreferrer"
                  className="text-xs text-brand-muted dark:text-gray-400 hover:text-black dark:hover:text-brand-light transition-colors font-sans underline"
                >
                  Watch on YouTube →
                </a>
              </div>
            </div>
          </AnimateOnScroll>
        )}

        <ProjectNav prev={prev} next={next} />
      </div>
    </div>
  );
};

// ─── PROJECT 6: Incapto Coffee (Product / Brand) ──────────────────────────────
const IncaptoCoffee: React.FC<{ project: Project; prev: Project | null; next: Project | null }> = ({ project, prev, next }) => {
  const images = project.images || [];
  const outcomeImages = project.outcomeImages || [];

  const deliverables = [
    { label: 'Packaging', items: ['Coffee bags — full range', 'Retail boxes & gift sets', 'Shipping & e-commerce materials'] },
    { label: 'Brand Assets', items: ['Campaign flyers & print', 'T-shirts & event materials', 'Retail display design'] },
    { label: 'Digital', items: ['Newsletter templates', 'Social media (IG, YouTube)', 'Promotional banners & ads'] },
    { label: 'Product', items: ['New coffee machine design support', 'Supplier coordination', 'Cross-team brand consistency'] },
  ];

  // Aesthetic-only images — used as visual context, not content
  const aestheticHero = 'https://i.imgur.com/XiPjkwQ.jpeg';
  const aestheticContext = 'https://i.imgur.com/XRpZwgF.jpeg';

  // All content images — shown fully as case study slides
  const allContentImages = [...images, ...outcomeImages];

  return (
    <div className="pb-24">

      {/* ── HERO ── */}
      <div className="relative h-[70vh] overflow-hidden">
        <img src={aestheticHero} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <AnimateOnScroll>
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/50 mb-3 font-sans">
              Product Design · Branding · Packaging · {project.year}
            </p>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase text-white font-sans leading-none">
              Incapto<br />Coffee
            </h1>
            <p className="mt-4 text-base text-white/65 max-w-xl font-sans">{project.subtitle}</p>
          </AnimateOnScroll>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <AnimateOnScroll>
          <Link to="/projects" className="mb-10 inline-block text-brand-muted dark:text-gray-400 hover:text-black dark:hover:text-brand-light transition-colors uppercase text-sm tracking-wider font-sans">← All Projects</Link>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs uppercase tracking-wider text-brand-muted dark:text-gray-400 font-sans">
            <span><strong className="text-black dark:text-brand-light">Year</strong> {project.year}</span>
            <span><strong className="text-black dark:text-brand-light">Role</strong> Junior Designer</span>
            <span><strong className="text-black dark:text-brand-light">Company</strong> Incapto Coffee, Barcelona</span>
            <a href={project.externalLink} target="_blank" rel="noopener noreferrer"
              className="text-black dark:text-brand-light underline hover:text-brand-muted dark:hover:text-gray-400 transition-colors">
              Visit Incapto →
            </a>
            <a href="https://www.behance.net/gallery/164645449/Design-Portfolio-Incapto-Coffee" target="_blank" rel="noopener noreferrer"
              className="text-black dark:text-brand-light underline hover:text-brand-muted dark:hover:text-gray-400 transition-colors">
              Full Portfolio on Behance →
            </a>
          </div>
        </AnimateOnScroll>

        {/* ── OVERVIEW ── */}
        <AnimateOnScroll className="mt-20 border-t border-gray-200 dark:border-gray-700 pt-12">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-brand-muted dark:text-gray-500 font-sans">Overview</span>
              <h2 className="mt-2 text-2xl font-bold text-black dark:text-brand-light font-sans mb-6">A Year Inside a Growing Brand</h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{project.overview}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{project.needs}</p>
            </div>
            <div className="space-y-5 text-sm border-l border-gray-200 dark:border-gray-700 pl-8">
              <Img src={aestheticContext} alt="Incapto brand context" className="w-full mb-4" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-brand-muted dark:text-gray-500 font-sans mb-2">Collaborators</p>
                <p className="text-gray-700 dark:text-gray-300">{project.collaborators}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-brand-muted dark:text-gray-500 font-sans mb-2">Services</p>
                <p className="text-gray-700 dark:text-gray-300">{project.service.join(' · ')}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-brand-muted dark:text-gray-500 font-sans mb-2">Learnings</p>
                <p className="text-gray-700 dark:text-gray-300 italic">{project.learnings}</p>
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        {/* ── WHAT I DELIVERED ── */}
        <AnimateOnScroll className="mt-20 border-t border-gray-200 dark:border-gray-700 pt-12">
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-muted dark:text-gray-500 font-sans">Scope of Work</span>
          <h2 className="mt-2 text-2xl font-bold text-black dark:text-brand-light font-sans mb-10">What I Delivered</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 dark:bg-gray-800">
            {deliverables.map((col, i) => (
              <div key={i} className="bg-white dark:bg-black p-6">
                <p className="text-[10px] uppercase tracking-[0.25em] text-brand-muted dark:text-gray-500 font-sans mb-4">{col.label}</p>
                <ul className="space-y-2">
                  {col.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 shrink-0" />{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </AnimateOnScroll>

        {/* ── DESIGN SYSTEM + PROCESS ── */}
        <AnimateOnScroll className="mt-20 border-t border-gray-200 dark:border-gray-700 pt-12">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-brand-muted dark:text-gray-500 font-sans">Design System</span>
              <h2 className="mt-2 text-2xl font-bold text-black dark:text-brand-light font-sans mb-6">The Visual Language</h2>
              {renderContent(project.concept)}
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-brand-muted dark:text-gray-500 font-sans">How I Worked</span>
              <h2 className="mt-2 text-2xl font-bold text-black dark:text-brand-light font-sans mb-6">Process</h2>
              {renderContent(project.process, true)}
            </div>
          </div>
        </AnimateOnScroll>

        {/* ── CASE STUDY — all images fully visible, Behance style ── */}
        <AnimateOnScroll className="mt-20 border-t border-gray-200 dark:border-gray-700 pt-12">
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-muted dark:text-gray-500 font-sans">Work</span>
          <h2 className="mt-2 text-2xl font-bold text-black dark:text-brand-light font-sans mb-4">The Work</h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl mb-10">{project.outcome}</p>

          {/* Each image full width — vertical scroll through the case study */}
          <div className="space-y-3">
            {allContentImages.map((img, i) => (
              <AnimateOnScroll key={i}>
                <Img src={img} alt={`Incapto work ${i + 1}`} className="w-full" />
              </AnimateOnScroll>
            ))}
          </div>
        </AnimateOnScroll>

        {/* ── REFLECTION ── */}
        {project.reflection && (
          <AnimateOnScroll className="mt-20 border-t border-gray-200 dark:border-gray-700 pt-12">
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-brand-muted dark:text-gray-500 font-sans">Reflection</span>
                <h2 className="mt-2 text-2xl font-bold text-black dark:text-brand-light font-sans mb-6">What This Taught Me</h2>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{project.reflection}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-950 p-8 self-start">
                <p className="text-[10px] uppercase tracking-[0.25em] text-brand-muted dark:text-gray-500 font-sans mb-4">Skills developed</p>
                <div className="space-y-2">
                  {[
                    'Designing within a fast-paced e-commerce startup',
                    'Full production management — digital to physical',
                    'Cross-team collaboration: marketing, manufacturing, logistics',
                    'Supplier coordination: printing, packaging, finishes',
                    'Consistent brand identity across all media',
                    'Adapting design decisions to real business constraints',
                  ].map((s, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 shrink-0" />{s}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        )}

        <ProjectNav prev={prev} next={next} />
      </div>
    </div>
  );
};

// ─── Router component ──────────────────────────────────────────────────────────

const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams();
  const projectIndex = projects.findIndex(p => p.id === projectId);
  const project = useMemo(() => (projectIndex !== -1 ? projects[projectIndex] : null), [projectIndex]);

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  if (!project) {
    return (
      <div className="text-center py-20 font-sans">
        Project not found.{' '}
        <Link to="/projects" className="text-black dark:text-brand-light underline">Go back to projects</Link>
      </div>
    );
  }

  switch (project.id) {
    case 'future-of-designing':
      return <FutureOfDesigning project={project} prev={prevProject} next={nextProject} />;
    case 'miralls-del-dema':
      return <MirallsDelDema project={project} prev={prevProject} next={nextProject} />;
    case 'unseen-exposures':
      return <UnseenExposures project={project} prev={prevProject} next={nextProject} />;
    case 'tania-pilot':
      return <TaniaPilot project={project} prev={prevProject} next={nextProject} />;
    case 'compostable-altar':
      return <CompostableAltar project={project} prev={prevProject} next={nextProject} />;
    case 'incapto-coffee':
      return <IncaptoCoffee project={project} prev={prevProject} next={nextProject} />;
    default:
      // Fallback for any future projects
      return <FutureOfDesigning project={project} prev={prevProject} next={nextProject} />;
  }
};

export default ProjectDetailPage;
